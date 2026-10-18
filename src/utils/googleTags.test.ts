// Rodar: npm test (node --test, sem dependências).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  CONSENTIMENTO_PADRAO, caminhoParaTags, cookiesParaApagar, deveCarregarGtm, estadoConsentimento,
  eventoParaDataLayer, paginaPermiteAnuncio, escolhaDasPreferencias, acaoNaTrocaDeRota, acaoAoMudarPreferencia, urlDoGtm,
} from './googleTags.ts'

const PROTOCOLO = '3f1c2a7e-9b1d-4c2e-8f3a-0a1b2c3d4e5f'

test('preferência v1 nunca vira publicidade; v2 respeita a escolha', () => {
  assert.equal(escolhaDasPreferencias(null), null)
  assert.deepEqual(escolhaDasPreferencias({ medicao: true }), { medicao: true, publicidade: false })
  assert.deepEqual(escolhaDasPreferencias({ medicao: true, publicidade: true, versao: 1 }), { medicao: true, publicidade: false })
  assert.deepEqual(escolhaDasPreferencias({ medicao: true, publicidade: true, versao: 2 }), { medicao: true, publicidade: true })
})

test('troca de rota: rota de saúde com GTM na página recarrega; sem GTM, carrega só se permitido e fora da saúde', () => {
  const medicao = { medicao: true, publicidade: false }
  assert.equal(acaoNaTrocaDeRota({ gtmId: 'GTM-KB8C46R', gtmCarregado: true, escolha: medicao, pathname: '/referencias-saude' }), 'recarregar')
  assert.equal(acaoNaTrocaDeRota({ gtmId: 'GTM-KB8C46R', gtmCarregado: true, escolha: medicao, pathname: '/beneficios-corporativos' }), 'nada')
  assert.equal(acaoNaTrocaDeRota({ gtmId: 'GTM-KB8C46R', gtmCarregado: false, escolha: medicao, pathname: '/' }), 'carregar')
  assert.equal(acaoNaTrocaDeRota({ gtmId: 'GTM-KB8C46R', gtmCarregado: false, escolha: medicao, pathname: '/referencias-saude' }), 'nada')
  assert.equal(acaoNaTrocaDeRota({ gtmId: 'GTM-KB8C46R', gtmCarregado: false, escolha: null, pathname: '/' }), 'nada')
  assert.equal(acaoNaTrocaDeRota({ gtmId: undefined, gtmCarregado: false, escolha: medicao, pathname: '/' }), 'nada')
})

test('mudança de preferência: revogar medição com GTM carregado apaga cookies e recarrega', () => {
  const base = { gtmId: 'GTM-KB8C46R', pathname: '/' }
  assert.deepEqual(acaoAoMudarPreferencia({ ...base, gtmCarregado: true, escolha: { medicao: false, publicidade: false } }), { apagarTerceiros: true, apagarAnuncio: false, recarregar: true, carregar: false })
  assert.deepEqual(acaoAoMudarPreferencia({ ...base, gtmCarregado: true, escolha: { medicao: true, publicidade: false } }), { apagarTerceiros: false, apagarAnuncio: true, recarregar: false, carregar: false })
  assert.deepEqual(acaoAoMudarPreferencia({ ...base, gtmCarregado: false, escolha: { medicao: true, publicidade: true } }), { apagarTerceiros: false, apagarAnuncio: false, recarregar: false, carregar: true })
  assert.deepEqual(acaoAoMudarPreferencia({ ...base, gtmCarregado: false, escolha: { medicao: false, publicidade: false } }), { apagarTerceiros: true, apagarAnuncio: false, recarregar: false, carregar: false })
})

test('sem escolha: tudo negado, salvo segurança', () => {
  assert.deepEqual(estadoConsentimento(null), CONSENTIMENTO_PADRAO)
  assert.equal(CONSENTIMENTO_PADRAO.analytics_storage, 'denied')
  assert.equal(CONSENTIMENTO_PADRAO.ad_user_data, 'denied')
})

test('medição libera só analytics; publicidade libera só ad_*', () => {
  const m = estadoConsentimento({ medicao: true, publicidade: false })
  assert.equal(m.analytics_storage, 'granted')
  assert.equal(m.ad_storage, 'denied')
  assert.equal(m.ad_personalization, 'denied')
  const p = estadoConsentimento({ medicao: false, publicidade: true })
  assert.equal(p.analytics_storage, 'denied')
  assert.equal(p.ad_storage, 'granted')
  assert.equal(p.ad_user_data, 'granted')
  assert.equal(p.functionality_storage, 'denied')
})

test('modo básico: GTM só carrega com medição e com ID válido', () => {
  assert.equal(deveCarregarGtm('GTM-KB8C46R', { medicao: true, publicidade: false }), true)
  assert.equal(deveCarregarGtm('GTM-KB8C46R', { medicao: false, publicidade: true }), false)
  assert.equal(deveCarregarGtm('GTM-KB8C46R', null), false)
  assert.equal(deveCarregarGtm('', { medicao: true, publicidade: true }), false)
  assert.equal(deveCarregarGtm('<script>', { medicao: true, publicidade: true }), false)
  assert.equal(deveCarregarGtm('GTM-KB8C46R', { medicao: true, publicidade: true }, '/referencias-saude/oncologia'), false)
  assert.equal(deveCarregarGtm('GTM-KB8C46R', { medicao: true, publicidade: false }, '/beneficios-corporativos'), true)
})

test('caminho para tags: só UTMs na query; rota de saúde vira marcador', () => {
  assert.equal(caminhoParaTags('/beneficios-corporativos', '?utm_source=google&utm_medium=organic_local&nome=Ana&email=a@b.com'),
    '/beneficios-corporativos?utm_source=google&utm_medium=organic_local')
  assert.equal(caminhoParaTags('/', '?gclid=abc&fbclid=x'), '/')
  assert.equal(caminhoParaTags('/referencias-saude/oncologia/hcor', '?utm_source=meta'), 'sensivel')
})

test('publicidade só em páginas corporativas', () => {
  for (const ok of ['/', '/beneficios-corporativos', '/beneficios-corporativos/', '/seguros-corporativos', '/sobre-e-conhecimento', '/lp/veiculos-frota', '/conhecimento/como-comparar-propostas-de-plano-empresarial']) {
    assert.equal(paginaPermiteAnuncio(ok), true, ok)
  }
  for (const nao of ['/lp/saude-odonto', '/seguros-pessoais', '/referencias-saude', '/referencias-saude/x', '/privacidade']) {
    assert.equal(paginaPermiteAnuncio(nao), false, nao)
  }
})

test('dataLayer: allowlist e sucesso real do formulário', () => {
  assert.deepEqual(eventoParaDataLayer('page_view', { pathname: '/', search: '?utm_campaign=x&cpf=123' }),
    { event: 'lf_page_view', page_path: '/?utm_campaign=x', pagina_permite_anuncio: true })
  assert.deepEqual(eventoParaDataLayer('whatsapp_click', { pathname: '/sobre-e-conhecimento', rotulo: 'rodape' }),
    { event: 'lf_whatsapp_click', page_path: '/sobre-e-conhecimento', pagina_permite_anuncio: true, rotulo: 'rodape' })
  // sucesso só com protocolo do servidor
  assert.equal(eventoParaDataLayer('form_submit_ok', { pathname: '/', rotulo: 'home-formulario' }), null)
  assert.deepEqual(eventoParaDataLayer('form_submit_ok', { pathname: '/lp/saude-odonto', rotulo: 'lp-saude-odonto', eventId: PROTOCOLO }),
    { event: 'lf_lead_recebido', page_path: '/lp/saude-odonto', pagina_permite_anuncio: false, ponto_entrada: 'lp-saude-odonto', event_id: `lead:${PROTOCOLO}` })
  // erro de formulário e rota de saúde não saem
  assert.equal(eventoParaDataLayer('form_submit_error', { pathname: '/' }), null)
  assert.equal(eventoParaDataLayer('page_view', { pathname: '/referencias-saude/cardiologia' }), null)
  // rótulo fora do padrão (texto livre) é descartado
  const r = eventoParaDataLayer('cta_click', { pathname: '/', rotulo: 'Ana Souza ana@x.com' })
  assert.equal(r && 'rotulo' in r, false)
})

test('revogar apaga só cookies de terceiros conhecidos', () => {
  assert.deepEqual(cookiesParaApagar(['_ga', '_ga_YPQE1GHEHJ', '_gcl_au', '_fbp', 'li_sugr', 'lifitseg_preferencias_v1', 'sb-token']),
    ['_ga', '_ga_YPQE1GHEHJ', '_gcl_au', '_fbp', 'li_sugr'])
})

test('gtm.js: ambiente de visualização só com gtm_auth e gtm_preview válidos', () => {
  const base = 'https://www.googletagmanager.com/gtm.js?id=GTM-KB8C46R'
  assert.equal(urlDoGtm('GTM-KB8C46R'), base)
  assert.equal(urlDoGtm('GTM-KB8C46R', 'gtm_auth=Ab3_xY9-kL&gtm_preview=env-3&gtm_cookies_win=x'), `${base}&gtm_auth=Ab3_xY9-kL&gtm_preview=env-3&gtm_cookies_win=x`)
  assert.equal(urlDoGtm('GTM-KB8C46R', '?gtm_preview=env-12&gtm_auth=Ab3_xY9-kL&outro=1'), `${base}&gtm_auth=Ab3_xY9-kL&gtm_preview=env-12&gtm_cookies_win=x`)
  assert.equal(urlDoGtm('GTM-KB8C46R', 'gtm_auth=Ab3"><script&gtm_preview=env-3'), base)
  assert.equal(urlDoGtm('GTM-KB8C46R', 'gtm_auth=Ab3_xY9-kL&gtm_preview=producao'), base)
})
