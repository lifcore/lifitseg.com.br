'use client'

import { useState } from 'react'
import { ReferenciaSaudeLeadModal } from './ReferenciaSaudeLeadModal'
import { ReusableCtaSection } from '@/components/common/StandardCard'

type CtaConsultarCoberturaProps = {
  nomeInstituicao?: string
  instituicaoSlug?: string
  especialidade?: string
  cidade?: string
  /** Lista de operadoras/convênios identificados — só as curtas (nome real, não frase inteira) viram chip. */
  operadorasInformadas?: string[]
  /** 'secao' (padrão) = banner full-width, usado no hub/região/especialidade.
   *  'card' = card compacto lateral, usado só no perfil de instituição, lado a lado com o conteúdo. */
  variante?: 'secao' | 'card'
}

const TAMANHO_MAXIMO_CHIP = 40 // acima disso é frase inteira, não nome de operadora — não vira chip

/**
 * "Ilha" de interatividade dentro de páginas Server Component do
 * módulo Referências em Saúde. O resto da página (dados do hospital,
 * texto) é renderizado no servidor pra SEO — só o botão que abre o
 * modal precisa rodar no navegador.
 *
 * ATUALIZADO (diretriz de design premium): variante 'card' — bloco
 * grande de "Operadoras/Convênios Informados" saiu do perfil,
 * substituído por chips pequenos (nome + placeholder de logo) dentro
 * do próprio card de CTA, lado a lado com o conteúdo no desktop.
 * Quando não há operadora identificada, ou o valor salvo é uma frase
 * inteira (não um nome curto), simplesmente não aparece nada — sem
 * texto de "não identificado".
 *
 * Regra crítica do documento do Chief (item 13 / seção 9 do Doc de
 * Codificação): o hospital é referência de conteúdo, NUNCA cobertura
 * confirmada. O texto do CTA reforça isso.
 */
export function CtaConsultarCobertura({
  nomeInstituicao,
  instituicaoSlug,
  especialidade,
  cidade,
  operadorasInformadas,
  variante = 'secao',
}: CtaConsultarCoberturaProps) {
  const [modalAberto, setModalAberto] = useState(false)

  const titulo = nomeInstituicao
    ? `Quer saber qual plano dá acesso a ${nomeInstituicao}?`
    : 'Quer saber quais planos têm cobertura compatível?'
  const subtitulo = nomeInstituicao
    ? 'A LifitSeg identifica as opções disponíveis e compara as alternativas de acordo com seu perfil.'
    : 'Consulte a LifitSeg para verificar quais produtos possuem cobertura compatível com esta instituição.'
  const textoBotao = nomeInstituicao ? 'Quero um Plano com Acesso a Este Hospital' : 'Consultar Planos Compatíveis'

  const chipsOperadoras = (operadorasInformadas ?? []).filter((o) => o.length <= TAMANHO_MAXIMO_CHIP)

  return (
    <>
      {variante === 'card' ? (
        <div className="rounded-3xl border border-primary/20 bg-lifitseg-dark p-7 shadow-lg lg:p-8">
          <h2 className="mb-2 text-xl font-bold leading-snug text-lifitseg-offwhite">{titulo}</h2>
          <p className="mb-6 text-sm leading-relaxed text-lifitseg-offwhite/70">{subtitulo}</p>

          {chipsOperadoras.length > 0 && (
            <div className="mb-6">
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-lifitseg-offwhite/40">
                Operadoras identificadas
              </p>
              <div className="flex flex-wrap gap-2">
                {chipsOperadoras.map((op) => (
                  <span
                    key={op}
                    className="flex items-center gap-1.5 rounded-lg bg-white/5 py-1.5 pl-1.5 pr-3 text-xs font-medium text-lifitseg-offwhite/90"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/20 text-[9px] font-bold text-primary">
                      {op.charAt(0).toUpperCase()}
                    </span>
                    {op}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setModalAberto(true)}
            className="w-full rounded-xl bg-primary py-4 text-sm font-bold text-lifitseg-dark shadow-md transition-opacity hover:opacity-90"
          >
            {textoBotao}
          </button>
        </div>
      ) : (
        <ReusableCtaSection
          title={titulo}
          subtitle={subtitulo}
          buttonText={textoBotao}
          onOpenLeadModal={() => setModalAberto(true)}
        />
      )}
      <ReferenciaSaudeLeadModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        especialidade={especialidade}
        hospitalInteresse={nomeInstituicao}
        instituicaoSlug={instituicaoSlug}
        cidade={cidade}
      />
    </>
  )
}
