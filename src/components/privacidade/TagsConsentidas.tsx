'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { EVENTO_MUDOU, obterPreferencias, type Preferencias } from '@/utils/consentimento'
import {
  CONSENTIMENTO_PADRAO, acaoAoMudarPreferencia, acaoNaTrocaDeRota, cookiesParaApagar, escolhaDasPreferencias, estadoConsentimento,
} from '@/utils/googleTags'

/**
 * Etapa C: único dono da injeção de tags de terceiros (contrato em
 * marketing/entregas/claude/2026-10-17_Etapa-C_consentimento-tags-contrato_v1.md).
 *
 * - Consent Mode v2 em modo básico: default (tudo negado) e update da
 *   escolha guardada vão para o dataLayer ANTES do script do GTM, em todos
 *   os caminhos (primeira visita, visitante recorrente, troca de rota).
 * - O GTM só carrega com medição permitida e fora das rotas de saúde. O GA4
 *   vive dentro do GTM: este componente nunca carrega gtag.js.
 * - Rota de saúde com o GTM já na página (navegação interna): a página é
 *   recarregada e nasce sem GTM, sem biblioteca em memória nem evento
 *   automático.
 * - Revogar a medição: consent update negado, cookies de terceiros apagados e
 *   a página recarregada sem GTM (o Consent Mode sozinho não garante
 *   ausência de tráfego).
 * - Sem NEXT_PUBLIC_GTM_ID, nada é carregado.
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

type JanelaComTags = Window & { dataLayer?: unknown[] }

function gtag(...args: unknown[]) {
  const w = window as JanelaComTags
  w.dataLayer = w.dataLayer || []
  // O Consent Mode exige o objeto `arguments`, não um array comum.
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer.push(arguments)
  void args
}

let gtmCarregado = false
let consentimentoIniciado = false

/** Default negado e, se houver escolha guardada, o update dela. Uma vez por página. */
function iniciarConsentimento() {
  if (consentimentoIniciado) return
  consentimentoIniciado = true
  gtag('consent', 'default', { ...CONSENTIMENTO_PADRAO, wait_for_update: 500 })
  const escolha = escolhaDasPreferencias(obterPreferencias())
  if (escolha) gtag('consent', 'update', estadoConsentimento(escolha))
}

function carregarGtm(id: string) {
  if (gtmCarregado || document.getElementById('gtm-lifitseg')) return
  iniciarConsentimento()
  gtmCarregado = true
  const w = window as JanelaComTags
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  const s = document.createElement('script')
  s.id = 'gtm-lifitseg'
  s.async = true
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`
  document.head.appendChild(s)
}

function apagarCookies(soAnuncio: boolean) {
  const nomes = document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter(Boolean)
  const host = window.location.hostname
  const dominios = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`]
  for (const nome of cookiesParaApagar(nomes).filter((n) => !soAnuncio || !/^_g(a|id|at)/.test(n))) {
    for (const d of dominios) {
      document.cookie = `${nome}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`
    }
  }
}

export function TagsConsentidas() {
  const pathname = usePathname()

  // Troca de rota (e primeira renderização): consentimento antes de tudo.
  useEffect(() => {
    if (!GTM_ID) return
    iniciarConsentimento()
    const acao = acaoNaTrocaDeRota({ gtmId: GTM_ID, gtmCarregado, escolha: escolhaDasPreferencias(obterPreferencias()), pathname })
    if (acao === 'recarregar') window.location.reload()
    else if (acao === 'carregar') carregarGtm(GTM_ID)
  }, [pathname])

  // Mudança de escolha no painel de preferências.
  useEffect(() => {
    if (!GTM_ID) return
    function aoMudar(e: Event) {
      iniciarConsentimento()
      const escolha = escolhaDasPreferencias((e as CustomEvent<Preferencias>).detail ?? obterPreferencias())
      gtag('consent', 'update', estadoConsentimento(escolha))
      const acao = acaoAoMudarPreferencia({ gtmId: GTM_ID, gtmCarregado, escolha, pathname: window.location.pathname })
      if (acao.apagarTerceiros) apagarCookies(false)
      else if (acao.apagarAnuncio) apagarCookies(true)
      if (acao.recarregar) window.location.reload()
      else if (acao.carregar) carregarGtm(GTM_ID as string)
    }
    window.addEventListener(EVENTO_MUDOU, aoMudar)
    return () => window.removeEventListener(EVENTO_MUDOU, aoMudar)
  }, [])

  return null
}
