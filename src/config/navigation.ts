// src/config/navigation.ts

export type ItemNavegacao = {
  label: string
  href: string
  descricao?: string
}

/** Itens de âncora na própria Home (rolagem interna) */
export const NAV_HOME: ItemNavegacao[] = [
  { label: 'Diferenciais', href: '/#diferenciais' },
  { label: 'Como Trabalhamos', href: '/#metodo' },
  { label: 'Tecnologia', href: '/#tecnologia' },
  { label: 'Contato', href: '/#contato' },
]

/** Submenu "Soluções" ajustado ao conteúdo real das páginas */
export const NAV_SOLUCOES: ItemNavegacao[] = [
  {
    label: 'Benefícios Corporativos',
    href: '/beneficios-corporativos',
    descricao: 'Planos de Saúde e Odontológicos PME/Corp.',
  },
  {
    label: 'Seguros Corporativos e Pessoais',
    href: '/seguros-corporativos-pessoais',
    descricao: 'Proteção para pessoas, patrimônios e empresas.',
  },
  {
    label: 'Centro de Conhecimento',
    href: '/centro-de-conhecimento',
    descricao: 'Artigos, análises regulatórias e guias práticos.',
  },
]

/** Itens institucionais */
export const NAV_INSTITUCIONAL: ItemNavegacao[] = [
  { label: 'Sobre a LifitSeg', href: '/sobre' },
]