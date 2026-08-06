// src/config/navigation.ts
//
// Fonte única dos menus do site. Header (desktop + mobile), Footer e
// Breadcrumb consomem esta configuração — evita 3-4 menus diferentes
// desatualizando entre si com o tempo.

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

/** Submenu "Soluções" — mega-menu no Header, também usado no Footer */
export const NAV_SOLUCOES: ItemNavegacao[] = [
  {
    label: 'Benefícios Corporativos',
    href: '/beneficios-corporativos',
    descricao: 'Planos de Saúde e Odontológicos PME/Corp.',
  },
  {
    label: 'Automóvel & Frotas',
    href: '/seguro-auto-frota',
    descricao: 'Gestão de telemetria e redução de TCO.',
  },
  {
    label: 'Riscos Patrimoniais',
    href: '/seguro-empresarial',
    descricao: 'Proteção física, D&O e responsabilidade civil.',
  },
  {
    label: 'Vida em Grupo & Keyman',
    href: '/seguro-vida',
    descricao: 'Continuidade executiva e isenção fiscal.',
  },
]

/** Itens institucionais (Sobre, Centro de Conhecimento) */
export const NAV_INSTITUCIONAL: ItemNavegacao[] = [
  { label: 'Sobre a LifitSeg', href: '/sobre' },
  { label: 'Centro de Conhecimento', href: '/centro-conhecimento' },
]
