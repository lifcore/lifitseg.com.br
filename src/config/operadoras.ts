// src/config/operadoras.ts
//
// Fonte única das operadoras/seguradoras com quem a LifitSeg trabalha
// — extraído de `(site)/page.tsx` pra não duplicar a lista entre a
// home e qualquer LP que também precise exibir prova de credenciamento
// (ex: lp/saude-odonto). Logos em `/public/seguradoras/{file}.png`.
//
// NOTA (herdada da home): categoria/destaque é classificação nossa em
// cima da lista já existente. Confirmar com Raphael se algum item
// ficou na categoria errada — em especial Sobam e Yelum, cuja atuação
// exata não temos 100% de certeza (assumimos Sobam como operador de
// saúde regional e Yelum como seguradora).
export const OPERADORAS = [
  { name: 'Bradesco Saúde', file: 'bradesco', categoria: 'saude', destaque: true },
  { name: 'SulAmérica', file: 'sulamerica', categoria: 'saude', destaque: true },
  { name: 'Amil', file: 'amil', categoria: 'saude', destaque: true },
  { name: 'Porto Seguro', file: 'porto', categoria: 'saude', destaque: true },
  { name: 'Omint', file: 'omint', categoria: 'saude', destaque: false },
  { name: 'Care Plus', file: 'careplus', categoria: 'saude', destaque: false },
  { name: 'Unimed', file: 'unimed', categoria: 'saude', destaque: true },
  { name: 'Seguros Unimed', file: 'seguros_unimed', categoria: 'saude', destaque: false },
  { name: 'Tokio Marine', file: 'tokio', categoria: 'seguros', destaque: false },
  { name: 'Liberty Seguros', file: 'liberty', categoria: 'seguros', destaque: false },
  { name: 'Mapfre', file: 'mapfre', categoria: 'seguros', destaque: false },
  { name: 'Sobam', file: 'sobam', categoria: 'saude', destaque: false },
  { name: 'Hapvida', file: 'hapvida', categoria: 'saude', destaque: true },
  { name: 'NotreDame', file: 'notredame', categoria: 'saude', destaque: false },
  { name: 'Allianz', file: 'allianz', categoria: 'seguros', destaque: false },
  { name: 'HDI Seguros', file: 'hdi', categoria: 'seguros', destaque: false },
  { name: 'Yelum', file: 'yelum', categoria: 'seguros', destaque: false },
  { name: 'Suhai', file: 'suhai', categoria: 'seguros', destaque: false },
  { name: 'Alice', file: 'alice', categoria: 'saude', destaque: false },
  { name: 'Sami', file: 'sami', categoria: 'saude', destaque: false },
  { name: 'New Leader Saúde', file: 'new', categoria: 'saude', destaque: false },
  { name: 'Plena Saúde', file: 'plena', categoria: 'saude', destaque: false },
  { name: 'Única Saúde', file: 'unica', categoria: 'saude', destaque: false },
  { name: 'Zurich', file: 'zurich', categoria: 'seguros', destaque: false },
  { name: 'GoCare', file: 'gocare', categoria: 'saude', destaque: false },
  { name: 'Saúde Beneficência', file: 'beneficencia', categoria: 'saude', destaque: false },
  { name: 'VeraCruz', file: 'veracruz', categoria: 'saude', destaque: false },
  { name: 'MedSênior', file: 'medsenior', categoria: 'saude', destaque: false },
] as const

export const OPERADORAS_SAUDE = OPERADORAS.filter((op) => op.categoria === 'saude')

// Grade de parceiros de saúde da home (M-27). Raphael confirmou ao Chief
// Chat, em 16/10/2026, o direito de uso das imagens dos parceiros
// credenciados que já constam no site (Lifitseg_Site_Etapa2_INDICE.md).
// A confirmação não se estende a novos parceiros nem promete que todo
// produto está disponível para toda região ou faixa; a ordem da lista não
// é ranking nem recomendação. Para esconder a grade em produção, voltar
// esta constante para false.
export const PORTFOLIO_HOME_CONFIRMADO = true
