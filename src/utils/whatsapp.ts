// Link único do WhatsApp do site (S-04, SITE_MESTRE; aprovado por Raphael com a prévia em 15/11/2026).
//
// O WhatsApp abre a central (siteConfig) já com uma mensagem curta e NEUTRA, que o visitante decide enviar.
// Neutra de propósito: não leva página, especialidade, produto nem dado de saúde (vale para as rotas de saúde),
// e o assistente virtual não tira dela nenhuma intenção (conferido em intencao.ts do Lifcore: começa a triagem
// normal). "Vim pelo site" é a evidência declarada de origem para a frente S-05; pode ser editada pelo visitante.

export const NUMERO_WHATSAPP = '5511942882664' // = siteConfig.contato.whatsapp (central, 30/10/2026)

export const MENSAGEM_WHATSAPP = 'Olá! Vim pelo site da Lifitseg e gostaria de conversar.'

/** wa.me com a mensagem pronta; mensagem vazia abre a conversa sem texto. */
export function linkWhatsApp(mensagem: string = MENSAGEM_WHATSAPP, numero: string = NUMERO_WHATSAPP): string {
  const digitos = numero.replace(/\D/g, '')
  const texto = mensagem.trim()
  return texto ? `https://wa.me/${digitos}?text=${encodeURIComponent(texto)}` : `https://wa.me/${digitos}`
}
