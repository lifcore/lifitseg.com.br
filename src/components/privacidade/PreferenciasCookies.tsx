'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { EVENTO_ABRIR, EVENTO_MUDOU, obterPreferencias, precisaEscolher, salvarPreferencias } from '@/utils/consentimento'

/**
 * Aviso de privacidade (Etapa C, consentimento v2), em formato compacto
 * pedido por Raphael (18/10/2026, referência: aviso da Bradesco Seguros).
 *
 * - Aviso: texto curto, "Recusar" e "Aceitar" com o mesmo destaque, link para
 *   a Política de Privacidade (termos completos) e "Personalizar".
 * - Personalizar: medição e publicidade separadas, desmarcadas por padrão.
 *   Publicidade só vale com medição (garantido em `salvarPreferencias`).
 * - Nada opcional é ativado antes da escolha, e recusar não bloqueia
 *   formulário. O rodapé reabre direto na personalização, com a escolha atual.
 *
 * Texto resumido a partir de `Lifitseg_EtapaC_Aviso_Privacidade_v2.md` (Chief,
 * 17/10/2026); o detalhamento completo fica na Política de Privacidade.
 */

// Lê a escolha guardada como "loja externa": no servidor ainda não se sabe
// ('servidor'); no navegador, 'sim', 'nao' ou 'pendente'.
function assinar(aviso: () => void) {
  window.addEventListener(EVENTO_MUDOU, aviso)
  return () => window.removeEventListener(EVENTO_MUDOU, aviso)
}

function escolhaAtual(): 'publicidade' | 'sim' | 'nao' | 'pendente' {
  if (precisaEscolher()) return 'pendente'
  const p = obterPreferencias()
  return p?.medicao ? (p.publicidade ? 'publicidade' : 'sim') : 'nao'
}

export function PreferenciasCookies() {
  const escolha = useSyncExternalStore(assinar, escolhaAtual, () => 'servidor' as const)
  const [reaberto, setReaberto] = useState(false)
  const [personalizando, setPersonalizando] = useState(false)
  const [medicao, setMedicao] = useState(false)
  const [publicidade, setPublicidade] = useState(false)
  const tituloId = useId()
  const painelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function abrir() {
      const p = obterPreferencias()
      setMedicao(p?.medicao ?? false)
      setPublicidade(p?.publicidade ?? false)
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

  function decidir(m: boolean, p = false) {
    salvarPreferencias(m, p)
    setReaberto(false)
    setPersonalizando(false)
  }

  const botao = 'flex-1 rounded-xl border-2 border-lifitseg-green px-4 py-2.5 text-sm font-bold text-lifitseg-green hover:bg-lifitseg-paper'
  const link = 'font-semibold text-lifitseg-green underline underline-offset-2'

  return (
    <div
      ref={painelRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby={tituloId}
      tabIndex={-1}
      className="fixed inset-x-3 bottom-3 z-50 max-w-md rounded-2xl border border-lifitseg-line bg-white p-5 text-lifitseg-text shadow-2xl outline-none sm:left-6 sm:right-auto sm:bottom-6"
    >
      <h2 id={tituloId} className="font-bold text-lifitseg-dark" style={{ fontSize: '1rem' }}>
        Sua privacidade
      </h2>

      {!personalizando ? (
        <>
          <p className="mt-2 text-sm text-lifitseg-text-soft">
            Usamos cookies para o site funcionar e, com a sua permissão, para medir o uso do site e das nossas campanhas.
            Você pode mudar a escolha quando quiser, pelo rodapé.
          </p>
          <div className="mt-3 flex gap-4 text-sm">
            <Link href="/privacidade" className={link}>Política de Privacidade</Link>
            <button type="button" onClick={() => setPersonalizando(true)} className={link}>Personalizar</button>
          </div>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => decidir(false)} className={botao}>Recusar</button>
            <button type="button" onClick={() => decidir(true, true)} className={botao}>Aceitar</button>
          </div>
        </>
      ) : (
        <>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="flex items-start justify-between gap-4">
              <span>
                <span className="block font-semibold text-lifitseg-dark">Necessários</span>
                <span className="block text-lifitseg-text-soft">Mantêm o site funcionando e guardam esta escolha.</span>
              </span>
              <span className="shrink-0 text-xs font-semibold text-lifitseg-text-soft">Sempre ativos</span>
            </li>
            <li>
              <label className="flex cursor-pointer items-start justify-between gap-4">
                <span>
                  <span className="block font-semibold text-lifitseg-dark">Medição</span>
                  <span className="block text-lifitseg-text-soft">Uso do site e origem das visitas, inclusive pelo Google Analytics.</span>
                </span>
                <input type="checkbox" checked={medicao} onChange={(e) => { setMedicao(e.target.checked); if (!e.target.checked) setPublicidade(false) }} className="mt-1 h-5 w-5 shrink-0 accent-lifitseg-green" />
              </label>
            </li>
            <li>
              <label className={`flex items-start justify-between gap-4 ${medicao ? 'cursor-pointer' : 'opacity-60'}`}>
                <span>
                  <span className="block font-semibold text-lifitseg-dark">Publicidade</span>
                  <span className="block text-lifitseg-text-soft">Medição das campanhas pelas ferramentas de anúncio. Depende da medição.</span>
                </span>
                <input type="checkbox" checked={publicidade} disabled={!medicao} onChange={(e) => setPublicidade(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-lifitseg-green" />
              </label>
            </li>
          </ul>
          <p className="mt-3 text-xs text-lifitseg-text-soft">
            Detalhes na <Link href="/privacidade" className={link}>Política de Privacidade</Link>.
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => decidir(false)} className={botao}>Recusar</button>
            <button type="button" onClick={() => decidir(medicao, publicidade)} className={botao}>Salvar escolha</button>
          </div>
        </>
      )}
    </div>
  )
}
