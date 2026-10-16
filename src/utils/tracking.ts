// src/utils/tracking.ts
//
// Origem do visitante (F1/H2, plano M-24, decisão D-30).
//
// - Sem consentimento de medição: guarda SÓ a origem da visita atual
//   (sessionStorage, some ao fechar a aba), usada apenas para registrar de
//   onde veio o contato que o próprio visitante envia.
// - Com consentimento: primeiro e último toque por 90 dias (localStorage),
//   com data de expiração e limpeza automática. Recusar ou revogar apaga.
// - Nunca guarda nome, e-mail, telefone, texto de formulário ou query
//   string completa. Ids de clique são tratados como dado pseudonimizado:
//   só seguem junto com o contato que o visitante envia.

import { EVENTO_MUDOU, medicaoPermitida, type Preferencias } from './consentimento'

export type Toque = {
  source?: string
  medium?: string
  campaign?: string
  content?: string
  term?: string
  gclid?: string
  fbclid?: string
  li_fat_id?: string
  landing?: string
  referencia?: string
  em?: string
}

export type Rastreio = { primeiro: Toque | null; ultimo: Toque | null; consentimentoMedicao: boolean }

/** Formato antigo, mantido para formulários que ainda leem só as UTMs. */
export interface UtmParams {
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
}

/**
 * Exclusão de rotas sensíveis (M-29, plano v1.1 §2.1): páginas de
 * especialidade, região ou instituição de saúde revelam interesse de saúde.
 * Nelas não há evento de medição, e a página de entrada vira só o marcador
 * `sensivel`, sem caminho. O servidor repete a regra.
 */
const ROTAS_SENSIVEIS = ['/referencias-saude']
export const MARCADOR_SENSIVEL = 'sensivel'

export function ehRotaSensivel(caminho: string): boolean {
  const limpo = caminho.split('?')[0].split('#')[0].toLowerCase()
  return ROTAS_SENSIVEIS.some((r) => limpo === r || limpo.startsWith(`${r}/`))
}

export function caminhoMedivel(caminho: string): string {
  return ehRotaSensivel(caminho) ? MARCADOR_SENSIVEL : caminho.slice(0, 200)
}

export const PRAZO_DIAS = 90
const CHAVE_SESSAO = 'lifitseg_origem_sessao'
const CHAVE_PERSISTENTE = 'lifitseg_origem_90d'
const PARAMETROS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid', 'li_fat_id'] as const

function guardar(tipo: 'session' | 'local'): Storage | null {
  try {
    if (typeof window === 'undefined') return null
    return tipo === 'session' ? window.sessionStorage : window.localStorage
  } catch {
    return null
  }
}

function ler<T>(s: Storage | null, chave: string): T | null {
  if (!s) return null
  try {
    const v = s.getItem(chave)
    return v ? (JSON.parse(v) as T) : null
  } catch {
    return null
  }
}

function gravar(s: Storage | null, chave: string, valor: unknown): void {
  if (!s) return
  try {
    s.setItem(chave, JSON.stringify(valor))
  } catch {
    // armazenamento cheio ou bloqueado: segue sem guardar
  }
}

function limpo(valor: string | null): string | undefined {
  const v = (valor ?? '').trim().slice(0, 120)
  if (!v || /[^\s@]+@[^\s@]+\.[^\s@]+/.test(v)) return undefined
  return v
}

/** Lê os parâmetros de campanha da URL atual. Retorna null se não houver nenhum. */
export function toqueDaUrl(url: URL, referrer: string, agora = new Date()): Toque | null {
  const t: Toque = {}
  for (const p of PARAMETROS) {
    const valor = limpo(url.searchParams.get(p))
    if (!valor) continue
    const chave = p.startsWith('utm_') ? (p.slice(4) as keyof Toque) : (p as keyof Toque)
    t[chave] = valor
  }
  if (Object.keys(t).length === 0) return null
  t.landing = caminhoMedivel(url.pathname)
  const ref = dominioExterno(referrer, url.hostname)
  if (ref) t.referencia = ref
  t.em = agora.toISOString()
  return t
}

/** Só o domínio de quem indicou, e só se for externo. */
export function dominioExterno(referrer: string, hostAtual: string): string | undefined {
  try {
    if (!referrer) return undefined
    const host = new URL(referrer).hostname
    const base = (h: string) => h.replace(/^www\./, '')
    return base(host) === base(hostAtual) ? undefined : host
  } catch {
    return undefined
  }
}

type Persistente = { primeiro: Toque | null; ultimo: Toque | null; expiraEm: string }

function lerPersistente(agora = Date.now()): Persistente | null {
  const s = guardar('local')
  const p = ler<Persistente>(s, CHAVE_PERSISTENTE)
  if (p && Date.parse(p.expiraEm) <= agora) {
    s?.removeItem(CHAVE_PERSISTENTE)
    return null
  }
  return p
}

export function limparOrigemPersistente(): void {
  try {
    guardar('local')?.removeItem(CHAVE_PERSISTENTE)
  } catch {
    // nada a limpar
  }
}

/**
 * Registra a origem da página atual. Chamado uma vez por carregamento,
 * em todas as páginas (RastreamentoOrigem no layout raiz).
 */
export function capturarOrigem(agora = new Date()): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  const toque = toqueDaUrl(url, document.referrer, agora)

  const sessao = guardar('session')
  const atual = ler<{ primeiro: Toque | null; ultimo: Toque | null }>(sessao, CHAVE_SESSAO)
  // Primeira página da visita sem campanha: guarda só a página de entrada
  // e o domínio de referência, para saber por onde o visitante chegou.
  const entrada: Toque | null = toque ?? (atual ? null : semCampanha(url, agora))
  if (entrada) {
    gravar(sessao, CHAVE_SESSAO, {
      primeiro: atual?.primeiro ?? entrada,
      ultimo: toque ?? atual?.ultimo ?? entrada,
    })
  }

  if (medicaoPermitida()) {
    const p = lerPersistente(agora.getTime())
    const sessaoAtual = ler<{ primeiro: Toque | null; ultimo: Toque | null }>(sessao, CHAVE_SESSAO)
    const primeiro = p?.primeiro ?? sessaoAtual?.primeiro ?? null
    const ultimo = toque ?? p?.ultimo ?? sessaoAtual?.ultimo ?? null
    if (primeiro || ultimo) {
      // Prazo de 90 dias conta a partir do último toque com campanha.
      const expiraEm = toque || !p ? new Date(agora.getTime() + PRAZO_DIAS * 86400000).toISOString() : p.expiraEm
      gravar(guardar('local'), CHAVE_PERSISTENTE, { primeiro, ultimo, expiraEm })
    }
  }
}

function semCampanha(url: URL, agora: Date): Toque {
  const t: Toque = { landing: caminhoMedivel(url.pathname), em: agora.toISOString() }
  const ref = dominioExterno(document.referrer, url.hostname)
  if (ref) t.referencia = ref
  return t
}

/** O que segue junto com o formulário (campo `rastreio` do Connect). */
export function obterRastreio(): Rastreio {
  const consentimentoMedicao = medicaoPermitida()
  const p = consentimentoMedicao ? lerPersistente() : null
  const s = ler<{ primeiro: Toque | null; ultimo: Toque | null }>(guardar('session'), CHAVE_SESSAO)
  return {
    primeiro: p?.primeiro ?? s?.primeiro ?? null,
    ultimo: s?.ultimo?.source || s?.ultimo?.gclid || s?.ultimo?.fbclid || s?.ultimo?.li_fat_id ? s.ultimo : p?.ultimo ?? s?.ultimo ?? null,
    consentimentoMedicao,
  }
}

/** Compatibilidade: formulários antigos (LeadModal, Diagnóstico) leem as UTMs do último toque. */
export function getStoredUtms(): UtmParams {
  const t = obterRastreio().ultimo
  return {
    utm_source: t?.source ?? null,
    utm_medium: t?.medium ?? null,
    utm_campaign: t?.campaign ?? null,
    utm_content: t?.content ?? null,
    utm_term: t?.term ?? null,
  }
}

/** Compatibilidade: as LPs chamavam esta função; a captura agora é global. */
export function captureAndPersistUtms(): void {
  capturarOrigem()
}

/** Revogação ou recusa: apaga a origem de 90 dias imediatamente. */
if (typeof window !== 'undefined') {
  window.addEventListener(EVENTO_MUDOU, (e) => {
    const p = (e as CustomEvent<Preferencias>).detail
    if (!p?.medicao) limparOrigemPersistente()
  })
}
