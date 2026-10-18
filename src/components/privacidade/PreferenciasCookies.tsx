'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { EVENTO_ABRIR, EVENTO_MUDOU, obterPreferencias, precisaEscolher, salvarPreferencias } from '@/utils/consentimento'

/**
 * Preferências de privacidade (Etapa C, consentimento v2). Três escolhas de
 * mesmo destaque: recusar opcionais, permitir medição (inclui o Google
 * Analytics, carregado pelo GTM só depois da permissão) e permitir medição e
 * publicidade (ferramentas de anúncio só nas páginas permitidas e só quando
 * habilitadas). Nada vem marcado, nada opcional é ativado antes da escolha, e
 * recusar não bloqueia formulário. O rodapé reabre o painel.
 *
 * Texto do Chief Chat: `Lifitseg_EtapaC_Aviso_Privacidade_v2.md` (17/10/2026).
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

  function decidir(medicao: boolean, publicidade = false) {
    salvarPreferencias(medicao, publicidade)
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
        Usamos cookies e armazenamento necessário para manter o site funcionando e registrar suas escolhas. Se você
        permitir medição, usaremos informações de navegação e de origem das visitas, inclusive com o Google Analytics,
        para entender o uso do site. Se também permitir publicidade, poderemos usar ferramentas de anúncios habilitadas
        para medir campanhas nas páginas permitidas. Você pode recusar os usos opcionais e continuar navegando. Altere
        sua escolha a qualquer momento nas preferências de privacidade do rodapé.
      </p>

      {detalhes && (
        <div className="mt-3 space-y-2 rounded-xl bg-lifitseg-paper p-4 text-sm text-lifitseg-text-soft">
          <p>
            <strong className="text-lifitseg-dark">Necessários:</strong> registram suas preferências e mantêm recursos
            essenciais do site.
          </p>
          <p>
            <strong className="text-lifitseg-dark">Medição:</strong> registra interações e informações de origem para
            analisar o uso do site; a implementação prevê histórico de primeira e última origem por até 90 dias no
            navegador.
          </p>
          <p>
            <strong className="text-lifitseg-dark">Publicidade:</strong> permite medição de campanhas pelas ferramentas
            habilitadas, conforme as páginas e finalidades descritas na Política de Privacidade.
          </p>
          <p>
            Mesmo ao recusar medição, a origem da visita atual pode acompanhar um contato que você decidir enviar. Esse
            registro de origem no contato é separado da autorização para ferramentas de medição e publicidade. Ao retirar
            a permissão de medição, o histórico persistente de origem é removido do navegador. A mudança vale para usos
            futuros e não apaga automaticamente dados já recebidos.
          </p>
        </div>
      )}

      {escolha !== 'pendente' && escolha !== 'servidor' && (
        <p className="mt-3 text-xs font-semibold text-lifitseg-dark">
          Escolha atual: {escolha === 'publicidade' ? 'medição e publicidade permitidas' : escolha === 'sim' ? 'medição permitida, publicidade recusada' : 'medição e publicidade recusadas'}.
        </p>
      )}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4 text-sm">
          <button type="button" onClick={() => setDetalhes((d) => !d)} aria-expanded={detalhes} className="font-semibold text-lifitseg-green underline underline-offset-2">
            {detalhes ? 'Ocultar detalhes' : 'Mais detalhes'}
          </button>
          <Link href="/privacidade" className="font-semibold text-lifitseg-green underline underline-offset-2">
            Política de Privacidade
          </Link>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={() => decidir(false)} className={botao}>Recusar opcionais</button>
          <button type="button" onClick={() => decidir(true)} className={botao}>Permitir medição</button>
          <button type="button" onClick={() => decidir(true, true)} className={botao}>Permitir medição e publicidade</button>
        </div>
      </div>
    </div>
  )
}
