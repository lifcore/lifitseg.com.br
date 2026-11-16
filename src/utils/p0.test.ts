// Correções P0 do site (SITE_MESTRE S-01, S-02 e S-07). Rodar: npm test.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { redirecionamentos, DOMINIO_OFICIAL } from './redirecionamentos.ts'
import { fichaEmpresa, jsonLdSeguro } from './fichaEmpresa.ts'
import { siteConfig } from '../config/site.ts'

test('o domínio oficial é o do siteConfig', () => {
  assert.equal(DOMINIO_OFICIAL, siteConfig.url)
})

test('sem www leva ao mesmo caminho em www, com 301', () => {
  const geral = redirecionamentos().find((r) => r.source === '/:caminho*')
  assert.deepEqual(geral, { source: '/:caminho*', destination: 'https://www.lifitseg.com.br/:caminho*', statusCode: 301, has: [{ type: 'host', value: 'lifitseg.com.br' }] })
})

test('endereço antigo vai à página equivalente, nunca tudo à home; sem www é um salto só', () => {
  const lista = redirecionamentos()
  const em = (source: string, comHost: boolean) => lista.find((r) => r.source === source && Boolean(r.has) === comHost)?.destination
  assert.equal(em('/plano-de-saude-empresarial', false), '/beneficios-corporativos')
  assert.equal(em('/plano-de-saude-empresarial', true), 'https://www.lifitseg.com.br/beneficios-corporativos')
  assert.equal(em('/seguro-de-vida', false), '/seguros-pessoais')
  assert.equal(em('/blog/:caminho*', false), '/conhecimento')
  assert.equal(em('/contato', false), '/#contato')
  // o geral do domínio vem depois dos específicos, senão o caminho antigo daria dois saltos
  const iGeral = lista.findIndex((r) => r.source === '/:caminho*')
  assert.ok(lista.findIndex((r) => r.source === '/contato' && r.has) < iGeral)
  for (const r of lista) {
    assert.equal(r.statusCode, 301)
    assert.notEqual(r.destination, '/')
  }
})

test('ficha da empresa: só dado institucional do siteConfig', () => {
  const f = fichaEmpresa(siteConfig)
  assert.equal(f['@type'], 'InsuranceAgency')
  assert.equal(f.legalName, siteConfig.juridico.razaoSocial)
  assert.equal(f.taxID, '43.609.696/0001-60')
  assert.equal(f.identifier[0].value, '232149012')
  assert.equal(f.telephone, '+5511942882664')
  assert.equal(f.address.postalCode, '13207-605')
  assert.equal(f.openingHoursSpecification[0].closes, '17:30')
  assert.equal(f.sameAs.length, 3)
  const texto = JSON.stringify(f)
  assert.doesNotMatch(texto, /aggregateRating|review|ratingValue/)
})

test('JSON-LD não abre brecha para fechar o script', () => {
  assert.equal(jsonLdSeguro({ a: '</script><b>' }), '{"a":"\\u003c/script>\\u003cb>"}')
})
