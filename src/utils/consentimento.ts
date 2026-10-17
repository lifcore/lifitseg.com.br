// src/utils/consentimento.ts
//
// Preferências de privacidade (D-30; Etapa C, versão 2). Guardar a ESCOLHA do
// visitante é necessário para respeitá-la; nada é medido antes da escolha.
// v2 separa duas finalidades, ambas opcionais e desmarcadas:
// - medicao: medição própria (Connect) + Google Analytics via GTM;
// - publicidade: tags de anúncios (LinkedIn/Meta/Google), só em páginas
//   corporativas e só junto com a medição (o GTM é quem carrega).
// Quem escolheu na v1 mantém a medição própria, mas vê o painel de novo uma
// vez, porque existe uma finalidade nova.

export type Preferencias = { medicao: boolean; publicidade: boolean; decididoEm: string; versao: 1 | 2 }

const CHAVE_V2 = 'lifitseg_preferencias_v2'
const CHAVE_V1 = 'lifitseg_preferencias_v1'
export const EVENTO_MUDOU = 'lifitseg:preferencias'
export const EVENTO_ABRIR = 'lifitseg:abrir-preferencias'

function armazenamento(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    return null
  }
}

function ler(chave: string): Record<string, unknown> | null {
  const s = armazenamento()
  if (!s) return null
  try {
    const bruto = s.getItem(chave)
    return bruto ? JSON.parse(bruto) : null
  } catch {
    return null
  }
}

export function obterPreferencias(): Preferencias | null {
  const v2 = ler(CHAVE_V2)
  if (v2 && v2.versao === 2 && typeof v2.medicao === 'boolean' && typeof v2.publicidade === 'boolean') {
    return v2 as unknown as Preferencias
  }
  const v1 = ler(CHAVE_V1)
  if (v1 && v1.versao === 1 && typeof v1.medicao === 'boolean') {
    return { medicao: v1.medicao, publicidade: false, decididoEm: String(v1.decididoEm ?? ''), versao: 1 }
  }
  return null
}

/** O painel aparece sem escolha ou com escolha da versão anterior. */
export function precisaEscolher(): boolean {
  const p = obterPreferencias()
  return !p || p.versao < 2
}

export function medicaoPermitida(): boolean {
  return obterPreferencias()?.medicao === true
}

export function publicidadePermitida(): boolean {
  const p = obterPreferencias()
  return p?.versao === 2 && p.medicao === true && p.publicidade === true
}

export function salvarPreferencias(medicao: boolean, publicidade = false): void {
  const s = armazenamento()
  const p: Preferencias = { medicao, publicidade: medicao && publicidade, decididoEm: new Date().toISOString(), versao: 2 }
  if (s) {
    try {
      s.setItem(CHAVE_V2, JSON.stringify(p))
      s.removeItem(CHAVE_V1)
    } catch {
      // sem armazenamento: a escolha vale só nesta página
    }
  }
  window.dispatchEvent(new CustomEvent(EVENTO_MUDOU, { detail: p }))
}

/** Reabre o painel (link "Preferências de cookies" do rodapé). */
export function abrirPreferencias(): void {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(EVENTO_ABRIR))
}
