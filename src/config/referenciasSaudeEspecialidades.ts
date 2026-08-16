// src/config/referenciasSaudeEspecialidades.ts
//
// Taxonomia oficial de especialidades do módulo Referências em Saúde
// — definida pelo Chief (briefing de aprimoramento do site, 11/08).
// Fonte única: o hub, o menu (navigation.ts) e as páginas de
// especialidade usam essa lista, nunca duplicam em outro lugar.
//
// `busca` é o termo usado no filtro parcial da Edge Function — pode
// ser mais simples que `nome` quando ajuda a pegar variações (ex:
// "Exames de Imagem" busca por "imagem", que também bate com
// "Diagnóstico por Imagem" salvo em alguma instituição).

export const ESPECIALIDADES_SAUDE = [
  { slug: 'cardiologia', nome: 'Cardiologia', busca: 'cardio', icone: '🫀' },
  { slug: 'oncologia', nome: 'Oncologia', busca: 'oncolog', icone: '🎗️' },
  { slug: 'neurologia', nome: 'Neurologia', busca: 'neuro', icone: '🧠' },
  { slug: 'ortopedia', nome: 'Ortopedia', busca: 'ortoped', icone: '🦴' },
  { slug: 'pediatria', nome: 'Pediatria', busca: 'pediátric', icone: '👶' },
  { slug: 'maternidade', nome: 'Maternidade', busca: 'matern', icone: '🤰' },
  { slug: 'exames-de-imagem', nome: 'Exames de Imagem', busca: 'imagem', icone: '🩻' },
  { slug: 'exames-laboratoriais', nome: 'Exames Laboratoriais', busca: 'laborat', icone: '🧪' },
] as const

export type EspecialidadeSaudeSlug = (typeof ESPECIALIDADES_SAUDE)[number]['slug']

export function especialidadePorSlug(slug: string) {
  return ESPECIALIDADES_SAUDE.find((e) => e.slug === slug) ?? null
}
