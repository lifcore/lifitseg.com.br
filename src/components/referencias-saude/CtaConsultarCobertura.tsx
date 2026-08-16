'use client'

import { useState } from 'react'
import { ReferenciaSaudeLeadModal } from './ReferenciaSaudeLeadModal'
import { ReusableCtaSection } from '@/components/common/StandardCard'

type CtaConsultarCoberturaProps = {
  nomeInstituicao?: string
  instituicaoSlug?: string
  especialidade?: string
  cidade?: string
}

/**
 * "Ilha" de interatividade dentro de páginas Server Component do
 * módulo Referências em Saúde. O resto da página (dados do hospital,
 * texto) é renderizado no servidor pra SEO — só o botão que abre o
 * modal precisa rodar no navegador.
 *
 * ATUALIZADO (11/08, briefing do Chief): passou a abrir o
 * `ReferenciaSaudeLeadModal` (Empresa/PF, Especialidade, Hospital,
 * Cidade) em vez do `LeadModal` genérico — mais alinhado com a
 * "máquina de vendas" que o documento descreve. Pré-preenche o que
 * já sabe pelo contexto da página (especialidade, cidade, hospital).
 *
 * ATUALIZADO (Doc de Codificação v2): `instituicaoSlug` viaja junto
 * pra enriquecer o `origem` do lead (`referencias-saude:<slug>`),
 * permitindo medir lead por instituição no Growth Center — sem
 * precisar alterar a Edge Function compartilhada de recebimento.
 *
 * Regra crítica do documento do Chief (item 13 / seção 9 do Doc de
 * Codificação): o hospital é referência de conteúdo, NUNCA cobertura
 * confirmada. O texto do CTA reforça isso.
 */
export function CtaConsultarCobertura({ nomeInstituicao, instituicaoSlug, especialidade, cidade }: CtaConsultarCoberturaProps) {
  const [modalAberto, setModalAberto] = useState(false)

  return (
    <>
      <ReusableCtaSection
        title={
          nomeInstituicao
            ? `Quer saber qual plano dá acesso a ${nomeInstituicao}?`
            : 'Quer saber quais planos têm cobertura compatível?'
        }
        subtitle={
          nomeInstituicao
            ? 'A LifitSeg identifica as opções disponíveis e compara as alternativas de acordo com seu perfil.'
            : 'Consulte a LifitSeg para verificar quais produtos possuem cobertura compatível com esta instituição.'
        }
        buttonText={nomeInstituicao ? 'Quero um Plano com Acesso a Este Hospital' : 'Consultar Planos Compatíveis'}
        onOpenLeadModal={() => setModalAberto(true)}
      />
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
