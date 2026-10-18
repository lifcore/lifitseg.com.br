'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { capturarOrigem } from '@/utils/tracking'
import { registrarEvento } from '@/utils/eventos'
import { EVENTO_MUDOU, medicaoPermitida, type Preferencias } from '@/utils/consentimento'

/**
 * Captura a origem em TODAS as páginas (antes só nas duas LPs) e conta a
 * visita à página quando o visitante aceitou a medição (D-30). Não
 * renderiza nada.
 *
 * Um page_view por rota (Etapa C): a mesma rota não é contada de novo
 * quando a preferência muda sem sair da página (ex.: acrescentar
 * publicidade) nem quando o efeito roda duas vezes no modo de desenvolvimento.
 */
let rotaContada: string | null = null

function contarVisita(pathname: string) {
  if (rotaContada === pathname || !medicaoPermitida()) return
  rotaContada = pathname
  registrarEvento('page_view')
}

export function RastreamentoOrigem() {
  const pathname = usePathname()

  useEffect(() => {
    capturarOrigem()
    contarVisita(pathname)
  }, [pathname])

  useEffect(() => {
    function aoMudar(e: Event) {
      const p = (e as CustomEvent<Preferencias>).detail
      if (p?.medicao) {
        capturarOrigem()
        contarVisita(window.location.pathname)
      }
    }
    window.addEventListener(EVENTO_MUDOU, aoMudar)
    return () => window.removeEventListener(EVENTO_MUDOU, aoMudar)
  }, [])

  return null
}
