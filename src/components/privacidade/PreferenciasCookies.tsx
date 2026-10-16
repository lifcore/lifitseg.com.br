'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { EVENTO_ABRIR, EVENTO_MUDOU, obterPreferencias, salvarPreferencias } from '@/utils/consentimento'

/**
 * Preferências de cookies e medição (D-30). Nesta fase só existe a
 * medição PRÓPRIA da Lifitseg (origem dos contatos e contagem de uso do
 * site); não há pixels nem ferramentas de terceiros. Nenhuma opção vem
 * marcada; nada é medido antes da escolha. O rodapé reabre este painel.
 *
 * Textos provisórios: o Chief Chat revisa a redação e a política de
 * privacidade antes da publicação (plano M-24, seção 4).
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
  const [personalizando, setPersonalizando] = useState(false)
  const [medicao, setMedicao] = useState(false)
  const tituloId = useId()
  const painelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function abrir() {
      setMedicao(obterPreferencias()?.medicao ?? false)
      setPersonalizando(true)
      setReaberto(true)
    }
    window.addEventListener(EVENTO_ABRIR, abrir)
    return () => window.removeEventListener(EVENTO_ABRIR, abrir)
  }, [])

  const visivel = reaberto || escolha === 'pendente'

  useEffect(() => {
    if (visivel) painelRef.current?.focus()
  }, [visivel, personalizando])

  if (!visivel) return null

  function decidir(valor: boolean) {
    salvarPreferencias(valor)
    setMedicao(valor)
    setReaberto(false)
    setPersonalizando(false)
  }

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
        Preferências de cookies e medição
      </h2>
      <p className="mt-2 text-sm text-lifitseg-text-soft">
        Usamos armazenamento necessário para o site funcionar e guardar esta escolha. Com a sua permissão, também
        medimos de forma própria como as pessoas chegam até nós e usam o site, para melhorar a comunicação. Não
        usamos ferramentas de publicidade de terceiros. Saiba mais na{' '}
        <Link href="/privacidade" className="font-semibold text-lifitseg-green underline underline-offset-2">
          Política de Privacidade
        </Link>
        .
      </p>

      {personalizando && (
        <div className="mt-4 space-y-3 rounded-xl bg-lifitseg-paper p-4 text-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-lifitseg-dark">Necessários</p>
              <p className="text-lifitseg-text-soft">Funcionamento do site, segurança dos formulários e esta preferência.</p>
            </div>
            <span className="shrink-0 text-xs font-semibold text-lifitseg-text-soft">Sempre ativos</span>
          </div>
          <label className="flex cursor-pointer items-start justify-between gap-4">
            <span>
              <span className="block font-semibold text-lifitseg-dark">Medição própria</span>
              <span className="block text-lifitseg-text-soft">
                Guarda por até 90 dias a origem da sua visita (campanha ou site que indicou) e conta acessos e cliques, sem
                identificar você.
              </span>
            </span>
            <input
              type="checkbox"
              checked={medicao}
              onChange={(e) => setMedicao(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-lifitseg-green"
            />
          </label>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        {personalizando ? (
          <button type="button" onClick={() => decidir(medicao)} className="rounded-xl bg-lifitseg-green px-5 py-2.5 text-sm font-bold text-white hover:opacity-90">
            Salvar preferências
          </button>
        ) : (
          <>
            <button type="button" onClick={() => setPersonalizando(true)} className="rounded-xl border border-lifitseg-line px-5 py-2.5 text-sm font-semibold text-lifitseg-dark hover:bg-lifitseg-paper">
              Personalizar
            </button>
            <button type="button" onClick={() => decidir(false)} className="rounded-xl border border-lifitseg-line px-5 py-2.5 text-sm font-semibold text-lifitseg-dark hover:bg-lifitseg-paper">
              Rejeitar não necessários
            </button>
            <button type="button" onClick={() => decidir(true)} className="rounded-xl bg-lifitseg-green px-5 py-2.5 text-sm font-bold text-white hover:opacity-90">
              Aceitar todos
            </button>
          </>
        )}
      </div>
    </div>
  )
}
