import type { Metadata } from 'next'
import Breadcrumb from '@/components/common/Breadcrumb'
import { GuiasDestaque } from '@/components/atuacao/Blocos'
import { AREAS_GUIAS, GUIAS } from '@/content/guias'

export const metadata: Metadata = {
  title: 'Guias sobre plano de saúde empresarial e seguros',
  description: 'Guias sobre comparação de propostas, renovação, rede, sinistralidade, reembolso, franquia, endosso, responsabilidade civil e sinistro.',
}

// Índice dos guias (M-27 e etapa 3), agrupados por área. Conteúdo educativo:
// não é canal de urgência nem formulário para dados médicos.
export default function ConhecimentoPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Guias' }]} />
      <section className="bg-lifitseg-paper py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest text-lifitseg-green uppercase">Conhecimento</p>
          <h1 className="mt-4 max-w-3xl text-4xl text-lifitseg-dark">Entenda os critérios antes de tomar a decisão.</h1>
          <p className="mt-4 max-w-2xl text-lifitseg-text-soft">
            Conteúdos para apoiar decisões sobre benefícios e seguros. Cada guia explica perguntas e cuidados, sem substituir a análise do caso concreto.
          </p>
          {AREAS_GUIAS.map((a) => (
            <section key={a.id} aria-labelledby={`area-${a.id}`} className="mt-12">
              <h2 id={`area-${a.id}`} className="text-lifitseg-dark">{a.titulo}</h2>
              <div className="mt-6"><GuiasDestaque area={a.id} limite={GUIAS.length} /></div>
            </section>
          ))}
        </div>
      </section>
    </>
  )
}
