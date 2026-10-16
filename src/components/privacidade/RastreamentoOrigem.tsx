'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { capturarOrigem } from '@/utils/tracking'
import { registrarEvento } from '@/utils/eventos'
import { EVENTO_MUDOU, type Preferencias } from '@/utils/consentimento'

/**
 * Captura a origem em TODAS as páginas (antes só nas duas LPs) e conta a
 * visita à página quando o visitante aceitou a medição (D-30). Não
 * renderiza nada.
 */
export function RastreamentoOrigem() {
  const pathname = usePathname()

  useEffect(() => {
    capturarOrigem()
    registrarEvento('page_view')
  }, [pathname])

  useEffect(() => {
    function aoMudar(e: Event) {
      const p = (e as CustomEvent<Preferencias>).detail
      if (p?.medicao) {
        capturarOrigem()
        registrarEvento('page_view')
      }
    }
    window.addEventListener(EVENTO_MUDOU, aoMudar)
    return () => window.removeEventListener(EVENTO_MUDOU, aoMudar)
  }, [])

  return null
}
