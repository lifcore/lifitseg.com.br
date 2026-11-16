// Rodar: npm test (node --test, sem dependências).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { linkWhatsApp, MENSAGEM_WHATSAPP, NUMERO_WHATSAPP, mensagemReferencia } from './whatsapp.ts'
import { siteConfig } from '../config/site.ts'

test('o número do link é a central do siteConfig', () => {
  assert.equal(NUMERO_WHATSAPP, siteConfig.contato.whatsapp)
})

test('abre a central com a mensagem pronta e neutra', () => {
  const url = linkWhatsApp()
  assert.equal(url, 'https://wa.me/5511942882664?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Lifitseg%20e%20gostaria%20de%20conversar.')
  assert.equal(decodeURIComponent(new URL(url).searchParams.get('text') ?? ''), MENSAGEM_WHATSAPP)
})

test('a mensagem não leva página, produto nem nada de saúde', () => {
  assert.doesNotMatch(MENSAGEM_WHATSAPP, /refer|sa[uú]de|hospital|especialidade|plano|cota|\/|http/i)
})

test('mensagem própria (LP) e sem mensagem', () => {
  assert.equal(linkWhatsApp('Olá & tudo?'), 'https://wa.me/5511942882664?text=Ol%C3%A1%20%26%20tudo%3F')
  assert.equal(linkWhatsApp('  '), 'https://wa.me/5511942882664')
  assert.equal(linkWhatsApp('oi', '+55 (11) 9 9999-0000'), 'https://wa.me/5511999990000?text=oi')
})

test('referências: nome só em hospital geral; especializada, clínica e laboratório ficam neutros', () => {
  assert.equal(mensagemReferencia('hospital', 'Hospital Santa Elisa'), 'Olá! Vim pelo site da Lifitseg e quero um plano de saúde com acesso ao Hospital Santa Elisa.')
  assert.equal(mensagemReferencia('hospital', 'Hospital A.C.Camargo Cancer Center'), MENSAGEM_WHATSAPP)
  assert.equal(mensagemReferencia('hospital', 'Hospital do GRAACC'), MENSAGEM_WHATSAPP)
  assert.equal(mensagemReferencia('hospital', 'Hospital e Maternidade Pró-Matre Paulista'), MENSAGEM_WHATSAPP)
  assert.equal(mensagemReferencia('hospital', 'HCor — Hospital do Coração'), MENSAGEM_WHATSAPP)
  assert.equal(mensagemReferencia('clinica', 'Centro Médico Itaim'), MENSAGEM_WHATSAPP)
  assert.equal(mensagemReferencia('laboratorio', 'Hermes Pardini'), MENSAGEM_WHATSAPP)
})
