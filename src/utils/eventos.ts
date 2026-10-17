// src/utils/eventos.ts
//
// Eventos de navegação próprios (H2, plano M-24). Só são enviados com
// consentimento de medição (D-30) e chegam ao Connect apenas como
// contagens por dia, página, evento e campanha. Nada de dado pessoal,
// texto de formulário, id de sessão ou de clique.

import { lifcoreApi } from '@/services/lifcoreApi'
import { medicaoPermitida } from './consentimento'
import { caminhoMedivel, ehRotaSensivel, obterRastreio } from './tracking'
import { eventoParaDataLayer } from './googleTags'

export type EventoSite = 'page_view' | 'cta_click' | 'whatsapp_click' | 'form_start' | 'form_submit_ok' | 'form_submit_error'

/**
 * Etapa C: o mesmo evento vai ao dataLayer (GTM), só com a allowlist de
 * googleTags.ts. Sucesso de formulário exige o protocolo devolvido pelo
 * servidor (`eventId`); sem ele, nada vai às tags.
 */
function enviarParaTags(evento: EventoSite, rotulo: string, eventId?: string | null): void {
  const dado = eventoParaDataLayer(evento, { pathname: window.location.pathname, search: window.location.search, rotulo, eventId })
  if (!dado) return
  const w = window as Window & { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push(dado)
}

export function registrarEvento(evento: EventoSite, rotulo = '', opcoes: { eventId?: string | null } = {}): void {
  if (typeof window === 'undefined' || !medicaoPermitida()) return
  // Rotas de saúde não geram evento nenhum (M-29, plano v1.1 §2.1).
  if (ehRotaSensivel(window.location.pathname)) return
  const ultimo = obterRastreio().ultimo
  void lifcoreApi.registrarEvento({
    evento,
    pagina: caminhoMedivel(window.location.pathname),
    rotulo: rotulo.slice(0, 80),
    campanha: ultimo ? { source: ultimo.source, medium: ultimo.medium, campaign: ultimo.campaign, content: ultimo.content } : null,
  })
  enviarParaTags(evento, rotulo, opcoes.eventId)
}
