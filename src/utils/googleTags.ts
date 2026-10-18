// src/utils/googleTags.ts
//
// Etapa C (contrato: marketing/entregas/claude/2026-10-17_Etapa-C_consentimento-tags-contrato_v1.md).
// Regras puras entre a escolha do visitante e as tags de terceiros:
// - um único dono da injeção: o GTM (o GA4 é configurado dentro dele);
// - Consent Mode v2 em modo básico: sem medição permitida, o GTM nem carrega;
// - só parâmetros da allowlist chegam ao dataLayer (nada de formulário,
//   título de página ou rota de saúde).
//
// Sem dependências: testado com `node --test` (src/utils/googleTags.test.ts).

export type EscolhaPrivacidade = { medicao: boolean; publicidade: boolean }

export type EstadoConsentimento = {
  analytics_storage: 'granted' | 'denied'
  ad_storage: 'granted' | 'denied'
  ad_user_data: 'granted' | 'denied'
  ad_personalization: 'granted' | 'denied'
  functionality_storage: 'denied'
  personalization_storage: 'denied'
  security_storage: 'granted'
}

/** Estado antes de qualquer escolha: tudo negado, salvo segurança. */
export const CONSENTIMENTO_PADRAO: EstadoConsentimento = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted',
}

export function estadoConsentimento(escolha: EscolhaPrivacidade | null): EstadoConsentimento {
  if (!escolha) return CONSENTIMENTO_PADRAO
  const pub = escolha.publicidade ? 'granted' : 'denied'
  return {
    ...CONSENTIMENTO_PADRAO,
    analytics_storage: escolha.medicao ? 'granted' : 'denied',
    ad_storage: pub,
    ad_user_data: pub,
    ad_personalization: pub,
  }
}

/**
 * Modo básico: o GTM só carrega com medição permitida (publicidade sozinha
 * não basta) e nunca numa rota de saúde, mesmo que uma tag do contêiner
 * esteja mal configurada para disparar sozinha.
 */
export function deveCarregarGtm(gtmId: string | undefined, escolha: EscolhaPrivacidade | null, pathname = '/'): boolean {
  return !!gtmId && /^GTM-[A-Z0-9]+$/.test(gtmId) && escolha?.medicao === true && !rotaSensivel(pathname)
}

/** Preferência guardada (v1 ou v2) → escolha. v1 nunca vira publicidade. */
export function escolhaDasPreferencias(p: { medicao: boolean; publicidade?: boolean; versao?: number } | null): EscolhaPrivacidade | null {
  if (!p) return null
  return { medicao: p.medicao === true, publicidade: p.versao === 2 && p.publicidade === true }
}

/**
 * Troca de rota com o GTM já na página: entrar numa rota de saúde exige
 * recarregar (a página nova nasce sem GTM, sem biblioteca em memória nem
 * evento automático). Fora disso, carrega se a escolha permitir.
 */
export function acaoNaTrocaDeRota(ctx: { gtmId: string | undefined; gtmCarregado: boolean; escolha: EscolhaPrivacidade | null; pathname: string }): 'carregar' | 'recarregar' | 'nada' {
  if (ctx.gtmCarregado && rotaSensivel(ctx.pathname)) return 'recarregar'
  if (!ctx.gtmCarregado && deveCarregarGtm(ctx.gtmId, ctx.escolha, ctx.pathname)) return 'carregar'
  return 'nada'
}

/**
 * Mudança de preferência. Revogar a medição com o GTM carregado recarrega a
 * página depois de apagar os cookies: o Consent Mode sozinho não garante
 * ausência de tráfego, a página sem GTM garante.
 */
export function acaoAoMudarPreferencia(ctx: { gtmId: string | undefined; gtmCarregado: boolean; escolha: EscolhaPrivacidade | null; pathname: string }) {
  const semMedicao = !ctx.escolha?.medicao
  return {
    apagarTerceiros: semMedicao,
    apagarAnuncio: !semMedicao && !ctx.escolha?.publicidade,
    recarregar: ctx.gtmCarregado && semMedicao,
    carregar: !ctx.gtmCarregado && deveCarregarGtm(ctx.gtmId, ctx.escolha, ctx.pathname),
  }
}

const ROTAS_SENSIVEIS = ['/referencias-saude']
export const MARCADOR_SENSIVEL = 'sensivel'

export function rotaSensivel(caminho: string): boolean {
  const c = caminho.split('?')[0].split('#')[0].toLowerCase()
  return ROTAS_SENSIVEIS.some((r) => c === r || c.startsWith(`${r}/`))
}

const UTM_PERMITIDAS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

/** Caminho limpo: sem query, salvo as UTMs; rota de saúde vira só o marcador. */
export function caminhoParaTags(pathname: string, search = ''): string {
  if (rotaSensivel(pathname)) return MARCADOR_SENSIVEL
  const entrada = new URLSearchParams(search)
  const saida = new URLSearchParams()
  for (const chave of UTM_PERMITIDAS) {
    const v = entrada.get(chave)
    if (v) saida.set(chave, v.slice(0, 100))
  }
  const q = saida.toString()
  return q ? `${pathname}?${q}` : pathname
}

/**
 * Páginas onde pixels de PUBLICIDADE (LinkedIn/Meta) podem disparar: só as
 * corporativas. Fora: saúde para pessoa física, seguros pessoais e rotas de
 * saúde (termo do LinkedIn sobre serviços de saúde ao consumidor). Lista a
 * validar com o advogado antes de publicar.
 */
const PAGINAS_PUBLICIDADE = ['/', '/beneficios-corporativos', '/seguros-corporativos', '/sobre-e-conhecimento', '/lp/veiculos-frota']
const PREFIXOS_PUBLICIDADE = ['/beneficios-corporativos/', '/seguros-corporativos/', '/conhecimento/']

export function paginaPermiteAnuncio(pathname: string): boolean {
  if (rotaSensivel(pathname)) return false
  const c = pathname.split('?')[0].replace(/\/+$/, '') || '/'
  return PAGINAS_PUBLICIDADE.includes(c) || PREFIXOS_PUBLICIDADE.some((p) => `${c}/`.startsWith(p))
}

export type EventoTag = 'lf_page_view' | 'lf_cta_click' | 'lf_whatsapp_click' | 'lf_form_start' | 'lf_lead_recebido'

const DO_EVENTO_PROPRIO: Record<string, EventoTag | undefined> = {
  page_view: 'lf_page_view',
  cta_click: 'lf_cta_click',
  whatsapp_click: 'lf_whatsapp_click',
  form_start: 'lf_form_start',
  form_submit_ok: 'lf_lead_recebido',
}

const TEXTO_SEGURO = /^[a-z0-9][a-z0-9_:.-]{0,79}$/

/**
 * Monta o objeto do dataLayer só com a allowlist. Devolve null quando o
 * evento não deve sair (rota de saúde, evento sem equivalente, sucesso sem
 * protocolo do servidor).
 */
export function eventoParaDataLayer(
  eventoProprio: string,
  ctx: { pathname: string; search?: string; rotulo?: string; eventId?: string | null },
): Record<string, string | boolean> | null {
  const evento = DO_EVENTO_PROPRIO[eventoProprio]
  if (!evento || rotaSensivel(ctx.pathname)) return null
  const saida: Record<string, string | boolean> = {
    event: evento,
    page_path: caminhoParaTags(ctx.pathname, ctx.search),
    pagina_permite_anuncio: paginaPermiteAnuncio(ctx.pathname),
  }
  const rotulo = (ctx.rotulo ?? '').toLowerCase()
  if (rotulo && TEXTO_SEGURO.test(rotulo)) saida[evento === 'lf_lead_recebido' ? 'ponto_entrada' : 'rotulo'] = rotulo
  if (evento === 'lf_lead_recebido') {
    const id = ctx.eventId ?? ''
    // Sucesso real = protocolo devolvido pelo Connect; sem ele, nada sai.
    if (!/^[0-9a-f-]{36}$/i.test(id)) return null
    saida.event_id = `lead:${id}`
  }
  return saida
}

/** Cookies de terceiros apagados quando o visitante revoga. */
export function cookiesParaApagar(nomes: string[]): string[] {
  return nomes.filter((n) => /^(_ga|_gid|_gat|_gcl|_fbp|_fbc|li_|lidc|bcookie|_uet)/.test(n))
}
