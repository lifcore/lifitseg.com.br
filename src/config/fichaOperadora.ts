// Ficha da operadora (Raphael, 15/11/2026): site, central e link da rede credenciada da própria operadora,
// planos em comercialização só com nome e tipo (o preço sai na cotação) e o IDSS da ANS. Sem reajustes e sem
// contato comercial ou pessoal. Os dados vêm do Lifcore (institucional.ficha_operadora_publica).

export type FichaOperadora = {
  slug: string
  nome: string
  logo_url: string | null
  registro_ans: string | null
  site: string | null
  rede_credenciada: string | null
  central: string | null
  contatos: { rotulo: string; valor: string; tipo: string; horario: string | null }[]
  idss: { ano: number; nota: number } | null
  planos: { linha: string; tipo: string | null; familias: string[] }[]
}

export function normalizar(t: string): string {
  return t.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

// Nomes usados no site (logos, operadoras informadas nas referências) → slug da ficha.
const APELIDOS: Record<string, string> = {
  'bradesco': 'bradesco', 'bradesco saude': 'bradesco',
  'sulamerica': 'sulamerica', 'sulamerica saude': 'sulamerica',
  'amil': 'amil', 'porto': 'porto-seguro', 'porto seguro': 'porto-seguro', 'porto saude': 'porto-seguro',
  'omint': 'omint', 'care plus': 'careplus', 'careplus': 'careplus',
  'unimed jundiai': 'unimed-jundiai', 'seguros unimed': 'seguros-unimed', 'unimed sorocaba': 'unimed-sorocaba',
  'sobam': 'sobam', 'hapvida': 'hapvida-sp-rj', 'hapvida sp rj': 'hapvida-sp-rj', 'notredame': 'notredame-intermedica', 'notredame intermedica': 'notredame-intermedica',
  'notre dame intermedica': 'notredame-intermedica', 'gndi': 'notredame-intermedica', 'alice': 'alice', 'sami': 'sami',
  'new leader': 'newleader', 'new leader saude': 'newleader', 'newleader': 'newleader', 'plena': 'plena-saude', 'plena saude': 'plena-saude',
  'unica saude': 'unica-saude', 'gocare': 'gocare', 'go care': 'gocare', 'veracruz': 'vera-cruz-campinas', 'vera cruz': 'vera-cruz-campinas',
  'vera cruz campinas': 'vera-cruz-campinas',
}

/** Slug da ficha a partir de um nome de operadora; null se não houver ficha. */
export function slugDaFicha(nome: string, slugsExistentes?: Set<string>): string | null {
  const s = APELIDOS[normalizar(nome)] ?? null
  if (!s) return null
  return !slugsExistentes || slugsExistentes.has(s) ? s : null
}

/** Faixas do IDSS da ANS (0 a 1). */
export function faixaIdss(nota: number): string {
  if (nota >= 0.8) return 'Faixa 0,80 a 1,00 (a mais alta)'
  if (nota >= 0.6) return 'Faixa 0,60 a 0,79'
  if (nota >= 0.4) return 'Faixa 0,40 a 0,59'
  if (nota >= 0.2) return 'Faixa 0,20 a 0,39'
  return 'Faixa 0,00 a 0,19'
}
