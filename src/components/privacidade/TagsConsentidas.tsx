'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { EVENTO_MUDOU, obterPreferencias, type Preferencias } from '@/utils/consentimento'
import { CONSENTIMENTO_PADRAO, cookiesParaApagar, deveCarregarGtm, estadoConsentimento } from '@/utils/googleTags'

/**
 * Etapa C: único dono da injeção de tags de terceiros (contrato em
 * marketing/entregas/claude/2026-10-17_Etapa-C_consentimento-tags-contrato_v1.md).
 *
 * - Consent Mode v2 em modo básico: o default (tudo negado) é registrado
 *   antes de qualquer script; o GTM só carrega com medição permitida.
 * - O GA4 vive dentro do GTM: este componente nunca carrega gtag.js.
 * - Sem NEXT_PUBLIC_GTM_ID, nada é carregado (é como o site fica até
 *   Raphael liberar a publicação do contêiner).
 * - Revogar: consent update negado, cookies de terceiros apagados e o GTM
 *   deixa de carregar nas próximas páginas.
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

type JanelaComTags = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }

function gtag(...args: unknown[]) {
  const w = window as JanelaComTags
  w.dataLayer = w.dataLayer || []
  // O Consent Mode exige o objeto `arguments`, não um array comum.
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer.push(arguments)
  void args
}

let gtmCarregado = false
let padraoRegistrado = false

function carregarGtm(id: string) {
  if (gtmCarregado || document.getElementById('gtm-lifitseg')) return
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

function apagarCookiesTerceiros() {
  const nomes = document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter(Boolean)
  const host = window.location.hostname
  const dominios = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`]
  for (const nome of cookiesParaApagar(nomes)) {
    for (const d of dominios) {
      document.cookie = `${nome}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`
    }
  }
}

export function TagsConsentidas() {
  // Na troca de rota (SPA), carrega o GTM se a nova página não for de saúde.
  const pathname = usePathname()
  useEffect(() => {
    if (GTM_ID && deveCarregarGtm(GTM_ID, obterPreferencias(), pathname)) carregarGtm(GTM_ID)
  }, [pathname])

  useEffect(() => {
    if (!GTM_ID) return
    if (!padraoRegistrado) {
      padraoRegistrado = true
      gtag('consent', 'default', { ...CONSENTIMENTO_PADRAO, wait_for_update: 500 })
    }

    function aplicar(p: Preferencias | null, revogando: boolean) {
      const escolha = p && p.versao === 2 ? { medicao: p.medicao, publicidade: p.publicidade } : p ? { medicao: p.medicao, publicidade: false } : null
      if (!escolha && !revogando) return // sem escolha: fica só o default negado
      gtag('consent', 'update', estadoConsentimento(escolha))
      if (deveCarregarGtm(GTM_ID, escolha, window.location.pathname)) carregarGtm(GTM_ID as string)
      if (revogando && !escolha?.medicao) apagarCookiesTerceiros()
      if (revogando && escolha && !escolha.publicidade) {
        // Publicidade revogada: some com os cookies de anúncio, mantém os de medição.
        const nomes = document.cookie.split(';').map((c) => c.split('=')[0].trim())
        for (const nome of cookiesParaApagar(nomes).filter((n) => !/^_g(a|id|at)/.test(n))) {
          document.cookie = `${nome}=; Max-Age=0; path=/`
        }
      }
    }

    aplicar(obterPreferencias(), false)
    function aoMudar(e: Event) {
      aplicar((e as CustomEvent<Preferencias>).detail ?? obterPreferencias(), true)
    }
    window.addEventListener(EVENTO_MUDOU, aoMudar)
    return () => window.removeEventListener(EVENTO_MUDOU, aoMudar)
  }, [])

  return null
}
