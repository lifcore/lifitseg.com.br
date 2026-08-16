// src/config/referenciasSaude.ts
//
// Fonte única dos slugs/nomes de região do módulo Referências em
// Saúde — usado pelo hub, pela página de região e pelos metadados de
// SEO. Bate exatamente com o CHECK constraint de
// institucional.referencias_saude.regiao no banco.

export const REGIOES_SAUDE = [
  { slug: 'jundiai-entorno', nome: 'Jundiaí e Entorno' },
  { slug: 'campinas-regiao', nome: 'Campinas e Região' },
  { slug: 'sp-grande-abcd', nome: 'São Paulo e Grande ABCD' },
] as const

export type RegiaoSaudeSlug = (typeof REGIOES_SAUDE)[number]['slug']

export function nomeDaRegiao(slug: string): string {
  return REGIOES_SAUDE.find((r) => r.slug === slug)?.nome ?? slug
}

export const ROTULO_STATUS_REFERENCIA: Record<string, string> = {
  ATIVO: 'Disponível',
  EM_IMPLANTACAO: 'Em implantação',
}
