'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { EVENTO_ABRIR, EVENTO_MUDOU, obterPreferencias, salvarPreferencias } from '@/utils/consentimento'

/**
 * Preferências de privacidade (D-30). Só existe a medição PRÓPRIA da
 * Lifitseg (origem dos contatos e contagem agregada de uso); não há pixels
 * nem ferramentas de terceiros. Nada vem marcado, nada é medido antes da
 * escolha, e recusar não bloqueia formulário. O rodapé reabre o painel.
 *
 * Texto do Chief Chat (`Lifitseg_Privacidade_e_Revisao_Site_v1.md`):
 * dois botões de mesmo destaque, sem "aceite para continuar".
 */

// Lê a escolha guardada como "loja externa": no servidor ainda não se sabe
// ('servidor'); no navegador, 'sim', 'nao' ou 'pendente'.
function assinar(aviso: () => void) {
  window.addEventListener(EVENTO_MUDOU, aviso)
  return () => window.removeEventListener(EVENTO_MUDOU, aviso)
}

function escolhaAtual(): 'sim' | 'nao' | 'pendente' {
  const p = obterPreferencias()
  return p ? (p.medicao ? 'sim' : 'nao') : 'pendente'
}

export function PreferenciasCookies() {
  const escolha = useSyncExternalStore(assinar, escolhaAtual, () => 'servidor' as const)
  const [reaberto, setReaberto] = useState(false)
  const [detalhes, setDetalhes] = useState(false)
  const tituloId = useId()
  const painelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function abrir() {
      setReaberto(true)
    }
    window.addEventListener(EVENTO_ABRIR, abrir)
    return () => window.removeEventListener(EVENTO_ABRIR, abrir)
  }, [])

  const visivel = reaberto || escolha === 'pendente'

  useEffect(() => {
    if (visivel) painelRef.current?.focus()
  }, [visivel])

  if (!visivel) return null

  function decidir(valor: boolean) {
    salvarPreferencias(valor)
    setReaberto(false)
    setDetalhes(false)
  }

  const botao = 'rounded-xl border-2 border-lifitseg-green px-5 py-2.5 text-sm font-bold text-lifitseg-green hover:bg-lifitseg-paper'

  return (
    <div
      ref={painelRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby={tituloId}
      tabIndex={-1}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border border-lifitseg-line bg-white p-5 text-lifitseg-text shadow-2xl outline-none sm:inset-x-6 sm:p-6"
    >
      <h2 id={tituloId} className="font-bold text-lifitseg-dark" style={{ fontSize: '1rem' }}>
        Suas preferências de privacidade
      </h2>
      <p className="mt-2 text-sm text-lifitseg-text-soft">
        Usamos armazenamento necessário para registrar suas escolhas e manter o funcionamento do site. Se você permitir a
        medição, poderemos registrar interações e guardar informações de origem da visita para entender quais conteúdos
        ajudam nossos visitantes. Você pode recusar a medição e continuar usando o site.
      </p>

      {detalhes && (
        <p className="mt-3 rounded-xl bg-lifitseg-paper p-4 text-sm text-lifitseg-text-soft">
          Sem medição, a origem da visita atual pode acompanhar um contato que você decidir enviar. Com medição permitida,
          informações de primeiro e último acesso de origem podem ser mantidas por até 90 dias no navegador. Revogar a
          medição remove esse histórico persistente do navegador.
        </p>
      )}

      {escolha !== 'pendente' && escolha !== 'servidor' && (
        <p className="mt-3 text-xs font-semibold text-lifitseg-dark">
          Escolha atual: {escolha === 'sim' ? 'medição permitida' : 'medição recusada'}.
        </p>
      )}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4 text-sm">
          <button type="button" onClick={() => setDetalhes((d) => !d)} aria-expanded={detalhes} className="font-semibold text-lifitseg-green underline underline-offset-2">
            {detalhes ? 'Ocultar detalhes' : 'Mais detalhes'}
          </button>
          <Link href="/privacidade" className="font-semibold text-lifitseg-green underline underline-offset-2">
            Entender o uso de dados
          </Link>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={() => decidir(false)} className={botao}>Recusar medição</button>
          <button type="button" onClick={() => decidir(true)} className={botao}>Permitir medição</button>
        </div>
      </div>
    </div>
  )
}
