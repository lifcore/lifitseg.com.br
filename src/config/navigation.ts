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
 * Submenu "Referências em Saúde" — ATUALIZADO (doc
 * REFERENCIAS_SAUDE_003, Etapa E): passou de lista direta de
 * especialidades pra 4 categorias oficiais. Cada uma leva pra uma
 * página própria com seleção de região (Hospitais/Laboratórios/
 * Clínicas) ou lista de especialidades (Por Especialidades) — nunca
 * lista instituição direto no menu.
 */
export const NAV_REFERENCIAS_SAUDE: ItemNavegacao[] = [
  { label: 'Hospitais', href: '/referencias-saude/hospitais', descricao: 'Por região: Jundiaí, Campinas e São Paulo' },
  { label: 'Laboratórios', href: '/referencias-saude/laboratorios', descricao: 'Por região: Jundiaí, Campinas e São Paulo' },
  { label: 'Clínicas', href: '/referencias-saude/clinicas', descricao: 'Por região: Jundiaí, Campinas e São Paulo' },
  { label: 'Por Especialidades', href: '/referencias-saude/especialidades', descricao: 'Cardiologia, Oncologia e mais 28 outras' },
]
