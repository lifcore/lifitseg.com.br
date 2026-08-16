// src/config/navigation.ts

import { ESPECIALIDADES_SAUDE } from './referenciasSaudeEspecialidades'

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

/** Submenu "Soluções" — nomenclatura oficial definitiva */
export const NAV_SOLUCOES: ItemNavegacao[] = [
  {
    label: 'Benefícios Corporativos',
    href: '/beneficios-corporativos',
    descricao: 'Planos de Saúde e Odontológicos PME/Corp.',
  },
  {
    label: 'Seguros Corporativos',
    href: '/seguros-corporativos',
    descricao: 'Portfólio consultivo para diferentes segmentos empresariais.',
  },
  {
    label: 'Seguros Pessoais',
    href: '/seguros-pessoais',
    descricao: 'Proteção para você, sua família e seu patrimônio.',
  },
]

/** Itens institucionais */
export const NAV_INSTITUCIONAL: ItemNavegacao[] = [
  { label: 'Sobre a LifitSeg', href: '/sobre-e-conhecimento#sobre' },
  { label: 'Centro de Conhecimento', href: '/sobre-e-conhecimento#conhecimento' },
]

/**
 * Submenu "Referências em Saúde" (briefing do Chief, 11/08) —
 * derivado direto de ESPECIALIDADES_SAUDE, nunca uma segunda lista
 * escrita à mão (evita as duas divergirem com o tempo).
 */
export const NAV_REFERENCIAS_SAUDE: ItemNavegacao[] = ESPECIALIDADES_SAUDE.map((e) => ({
  label: e.nome,
  href: `/referencias-saude/${e.slug}`,
}))
