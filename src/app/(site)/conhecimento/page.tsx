import type { Metadata } from 'next'
import Breadcrumb from '@/components/common/Breadcrumb'
import { GuiasDestaque } from '@/components/atuacao/Blocos'

export const metadata: Metadata = {
  title: 'Guias sobre plano de saúde empresarial',
  description: 'Guias para RH, financeiro e direção: comparação de propostas, renovação, rede, sinistralidade, reembolso e dificuldades de atendimento.',
}

// Índice da primeira coleção de guias (M-27). Conteúdo educativo: não é
// canal de urgência nem formulário para dados médicos.
export default function ConhecimentoPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Início', href: '/' }, { label: 'Guias' }]} />
      <section className="bg-lifitseg-paper py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest text-lifitseg-green uppercase">Conhecimento</p>
          <h1 className="mt-4 max-w-3xl text-4xl text-lifitseg-dark">Entenda os critérios antes de tomar a decisão.</h1>
          <p className="mt-4 max-w-2xl text-lifitseg-text-soft">
            Conteúdos para apoiar a conversa entre RH, financeiro e direção. Cada guia explica perguntas e cuidados, sem substituir a análise do caso concreto.
          </p>
          <div className="mt-10"><GuiasDestaque /></div>
        </div>
      </section>
    </>
  )
}
