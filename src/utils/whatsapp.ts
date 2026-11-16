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

// Referências em Saúde (Raphael, 15/11/2026): no hospital GERAL, a mensagem leva o nome do hospital, que o visitante
// decide enviar; o assistente cadastra o prospect e abre a demanda. Em instituição especializada (oncologia,
// fertilidade, neurologia, saúde da mulher e afins), clínica ou laboratório, a mensagem continua neutra, porque o
// interesse pode revelar uma condição de saúde. O nome nunca vai para a medição nem para anúncios.
const ESPECIALIZADA = /oncolog|c[aâ]ncer|graacc|ibcc|boldrini|fertil|reprodu|neuro|psiq|retina|oftalm|mulher|matre|cardio|cora[cç][aã]o/i

export function hospitalGeral(tipo?: string | null, nome?: string | null): boolean {
  return tipo === 'hospital' && !!nome && !ESPECIALIZADA.test(nome)
}

export function mensagemReferencia(tipo?: string | null, nome?: string | null): string {
  return hospitalGeral(tipo, nome)
    ? `Olá! Vim pelo site da Lifitseg e quero um plano de saúde com acesso ao ${nome}.`
    : MENSAGEM_WHATSAPP
}
