// src/app/(site)/referencias-saude/regiao/[regiao]/page.tsx

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/common/Breadcrumb'
import { lifcoreApi } from '@/services/lifcoreApi'
import { REGIOES_SAUDE, nomeDaRegiao } from '@/config/referenciasSaude'
import { InstituicaoCard } from '@/components/referencias-saude/InstituicaoCard'
import { CtaConsultarCobertura } from '@/components/referencias-saude/CtaConsultarCobertura'

type PageProps = {
  params: Promise<{ regiao: string }>
}

export async function generateStaticParams() {
  return REGIOES_SAUDE.map((r) => ({ regiao: r.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { regiao } = await params
  const nome = nomeDaRegiao(regiao)
  return {
    title: `${nome}: instituições de referência`,
    description: `Hospitais, laboratórios e centros diagnósticos privados de referência em ${nome}.`,
  }
}

export default async function RegiaoSaudePage({ params }: PageProps) {
  const { regiao } = await params

  if (!REGIOES_SAUDE.some((r) => r.slug === regiao)) {
    notFound()
  }

  const resultado = await lifcoreApi.listarReferenciasSaude({ regiao })
  const instituicoes = resultado?.data ?? []
  const nome = nomeDaRegiao(regiao)

  return (
    <>
      <Breadcrumb items={[{ label: 'Referências em Saúde', href: '/referencias-saude' }, { label: nome }]} />

      <section className="bg-lifitseg-offwhite py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4 text-3xl font-black text-lifitseg-dark sm:text-4xl">
            {nome}: instituições de referência
          </h1>
          <p className="mx-auto max-w-2xl text-base text-lifitseg-dark/70">
            Instituições privadas de referência catalogadas nesta região.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {instituicoes.length === 0 ? (
            <p className="text-center text-lifitseg-dark/60">
              Ainda não temos instituições catalogadas nesta região.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {instituicoes.map((inst: any) => (
                <InstituicaoCard
                  key={inst.slug}
                  slug={inst.slug}
                  nome={inst.nome}
                  cidade={inst.cidade}
                  status={inst.status}
                  destaque={inst.destaque}
                  logoUrl={inst.logo_url}
                  especialidades={inst.especialidades}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaConsultarCobertura cidade={nome} />
    </>
  )
}
