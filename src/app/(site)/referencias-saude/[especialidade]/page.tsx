// src/app/(site)/referencias-saude/especialidades/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/common/Breadcrumb'
import { ESPECIALIDADES_SAUDE } from '@/config/referenciasSaudeEspecialidades'
import { CtaConsultarCobertura } from '@/components/referencias-saude/CtaConsultarCobertura'

export const metadata: Metadata = {
  title: 'Referências por Especialidade',
  description: 'Encontre hospitais, laboratórios e clínicas de referência organizados por especialidade médica.',
}

export default function EspecialidadesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Referências em Saúde', href: '/referencias-saude' }, { label: 'Por Especialidades' }]} />

      <section className="bg-lifitseg-offwhite py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4 text-3xl font-black text-lifitseg-dark sm:text-4xl">Por Especialidades</h1>
          <p className="mx-auto max-w-2xl text-base text-lifitseg-dark/70">
            Navegação transversal — cada especialidade reúne hospitais, clínicas e laboratórios relacionados,
            quando houver informação confiável de que atuam nessa área.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {ESPECIALIDADES_SAUDE.map((esp) => (
              <Link
                key={esp.slug}
                href={`/referencias-saude/${esp.slug}`}
                className="flex flex-col items-center gap-2 rounded-2xl border border-lifitseg-dark/10 bg-lifitseg-offwhite p-5 text-center transition-all hover:border-primary/60"
              >
                <span className="text-2xl">{esp.icone}</span>
                <span className="text-xs font-bold text-lifitseg-dark">{esp.nome}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaConsultarCobertura />
    </>
  )
}
