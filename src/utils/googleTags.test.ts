// Rodar: npm test (node --test, sem dependências).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  CONSENTIMENTO_PADRAO, caminhoParaTags, cookiesParaApagar, deveCarregarGtm, estadoConsentimento,
  eventoParaDataLayer, paginaPermiteAnuncio,
} from './googleTags.ts'

const PROTOCOLO = '3f1c2a7e-9b1d-4c2e-8f3a-0a1b2c3d4e5f'

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
