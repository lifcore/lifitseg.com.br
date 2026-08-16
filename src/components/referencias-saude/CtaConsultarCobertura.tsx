'use client'

import { useState } from 'react'
import { LeadModal } from '@/components/forms/LeadModal'
import { ReusableCtaSection } from '@/components/common/StandardCard'

type CtaConsultarCoberturaProps = {
  nomeInstituicao?: string
}

/**
 * "Ilha" de interatividade dentro de páginas Server Component do
 * módulo Referências em Saúde. O resto da página (dados do hospital,
 * texto) é renderizado no servidor pra SEO — só o botão que abre o
 * modal precisa rodar no navegador.
 *
 * Regra crítica do documento do Chief (item 13): o hospital é
 * referência de conteúdo, NUNCA cobertura confirmada. O texto do CTA
 * reforça isso — nunca "esse plano cobre este hospital", sempre
 * "consulte pra confirmar".
 */
export function CtaConsultarCobertura({ nomeInstituicao }: CtaConsultarCoberturaProps) {
  const [modalAberto, setModalAberto] = useState(false)

  return (
    <>
      <ReusableCtaSection
        title="Quer saber quais planos têm cobertura compatível?"
        subtitle={
          nomeInstituicao
            ? `Consulte a LifitSeg para verificar quais produtos possuem cobertura compatível com ${nomeInstituicao}.`
            : 'Consulte a LifitSeg para verificar quais produtos possuem cobertura compatível com esta instituição.'
        }
        buttonText="Consultar Planos Compatíveis"
        onOpenLeadModal={() => setModalAberto(true)}
      />
      <LeadModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        origem="referencias-saude"
        produtos={['Plano de Saúde Empresarial', 'Plano Odontológico Empresarial', 'Plano de Saúde Individual/Familiar', 'Seguro de Vida em Grupo']}
        mostrarDadosEmpresa={true}
      />
    </>
  )
}
