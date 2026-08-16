// src/config/referenciasSaudeEspecialidades.ts
//
// Taxonomia oficial de especialidades do módulo Referências em Saúde
// — ATUALIZADA (Etapa E, doc REFERENCIAS_SAUDE_003): expandida de 8
// para as 30 especialidades definidas na planilha oficial de curadoria.
// Fonte única: o hub, o menu (navigation.ts) e as páginas de
// especialidade usam essa lista, nunca duplicam em outro lugar.
//
// `busca` usa o nome completo (não só a 1ª palavra) nas especialidades
// que poderiam colidir com outra mais genérica — ex: "Oncologia
// Pediátrica" usa 'oncologia pediatr', não só 'oncologia' (que já é o
// termo da especialidade-mãe "Oncologia") — sem isso as duas páginas
// mostrariam exatamente o mesmo resultado.

export const ESPECIALIDADES_SAUDE = [
  { slug: 'cardiologia', nome: 'Cardiologia', busca: 'cardiologia', icone: '🫀' },
  { slug: 'oncologia', nome: 'Oncologia', busca: 'oncologia', icone: '🎗️' },
  { slug: 'neurologia', nome: 'Neurologia', busca: 'neurologia', icone: '🧠' },
  { slug: 'neurocirurgia', nome: 'Neurocirurgia', busca: 'neurocirurgia', icone: '🧠' },
  { slug: 'ortopedia', nome: 'Ortopedia', busca: 'ortopedia', icone: '🦴' },
  { slug: 'pediatria', nome: 'Pediatria', busca: 'pediatria', icone: '👶' },
  { slug: 'maternidade-obstetricia', nome: 'Maternidade / Obstetrícia', busca: 'matern', icone: '🤰' },
  { slug: 'ginecologia', nome: 'Ginecologia', busca: 'ginecologia', icone: '🌸' },
  { slug: 'gastroenterologia', nome: 'Gastroenterologia', busca: 'gastroenterologia', icone: '🫁' },
  { slug: 'pneumologia', nome: 'Pneumologia', busca: 'pneumologia', icone: '🫁' },
  { slug: 'urologia', nome: 'Urologia', busca: 'urologia', icone: '🩺' },
  { slug: 'hematologia', nome: 'Hematologia', busca: 'hematologia', icone: '🩸' },
  { slug: 'nefrologia', nome: 'Nefrologia', busca: 'nefrologia', icone: '🩺' },
  { slug: 'endocrinologia', nome: 'Endocrinologia', busca: 'endocrinologia', icone: '🩺' },
  { slug: 'dermatologia', nome: 'Dermatologia', busca: 'dermatologia', icone: '🩺' },
  { slug: 'oftalmologia', nome: 'Oftalmologia', busca: 'oftalmologia', icone: '👁️' },
  { slug: 'otorrinolaringologia', nome: 'Otorrinolaringologia', busca: 'otorrinolaringologia', icone: '👂' },
  { slug: 'cirurgia-geral', nome: 'Cirurgia Geral', busca: 'cirurgia geral', icone: '🔪' },
  { slug: 'cirurgia-cardiaca', nome: 'Cirurgia Cardíaca', busca: 'cirurgia cardiaca', icone: '🫀' },
  { slug: 'hemodinamica', nome: 'Hemodinâmica', busca: 'hemodinamica', icone: '🫀' },
  { slug: 'medicina-fetal', nome: 'Medicina Fetal', busca: 'medicina fetal', icone: '🤰' },
  { slug: 'neonatologia', nome: 'Neonatologia', busca: 'neonatologia', icone: '👶' },
  { slug: 'oncologia-pediatrica', nome: 'Oncologia Pediátrica', busca: 'oncologia pediatr', icone: '🎗️' },
  { slug: 'cardiologia-pediatrica', nome: 'Cardiologia Pediátrica', busca: 'cardiologia pediatr', icone: '🫀' },
  { slug: 'neurologia-pediatrica', nome: 'Neurologia Pediátrica', busca: 'neurologia pediatr', icone: '🧠' },
  { slug: 'diagnostico-por-imagem', nome: 'Diagnóstico por Imagem', busca: 'diagnostico por imagem', icone: '🩻' },
  { slug: 'analises-clinicas', nome: 'Análises Clínicas', busca: 'analises clinicas', icone: '🧪' },
  { slug: 'medicina-nuclear', nome: 'Medicina Nuclear', busca: 'medicina nuclear', icone: '🩻' },
  { slug: 'radioterapia', nome: 'Radioterapia', busca: 'radioterapia', icone: '🎗️' },
  { slug: 'reproducao-assistida', nome: 'Reprodução Assistida', busca: 'reproducao assistida', icone: '🤰' },
] as const

export type EspecialidadeSaudeSlug = (typeof ESPECIALIDADES_SAUDE)[number]['slug']

export function especialidadePorSlug(slug: string) {
  return ESPECIALIDADES_SAUDE.find((e) => e.slug === slug) ?? null
}
