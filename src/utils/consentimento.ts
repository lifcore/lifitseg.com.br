// src/utils/consentimento.ts
//
// Preferências de medição própria (D-30). Guardar a ESCOLHA do visitante
// é necessário para respeitá-la; nenhuma medição é feita antes da escolha.
// Pixels e ferramentas de terceiros não existem nesta fase (fase H6).

export type Preferencias = { medicao: boolean; decididoEm: string; versao: 1 }

const CHAVE = 'lifitseg_preferencias_v1'
export const EVENTO_MUDOU = 'lifitseg:preferencias'
export const EVENTO_ABRIR = 'lifitseg:abrir-preferencias'

function armazenamento(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    return null
  }
}

export function obterPreferencias(): Preferencias | null {
  const s = armazenamento()
  if (!s) return null
  try {
    const bruto = s.getItem(CHAVE)
    if (!bruto) return null
    const p = JSON.parse(bruto)
    return p && p.versao === 1 && typeof p.medicao === 'boolean' ? p : null
  } catch {
    return null
  }
}

export function medicaoPermitida(): boolean {
  return obterPreferencias()?.medicao === true
}

export function salvarPreferencias(medicao: boolean): void {
  const s = armazenamento()
  if (!s) return
  const p: Preferencias = { medicao, decididoEm: new Date().toISOString(), versao: 1 }
  try {
    s.setItem(CHAVE, JSON.stringify(p))
  } catch {
    // sem armazenamento: a escolha vale só nesta página
  }
  window.dispatchEvent(new CustomEvent(EVENTO_MUDOU, { detail: p }))
}

/** Reabre o painel (link "Preferências de cookies" do rodapé). */
export function abrirPreferencias(): void {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(EVENTO_ABRIR))
}
