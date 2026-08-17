// src/app/(site)/referencias-saude/[especialidade]/page.tsx

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/common/Breadcrumb'
import { lifcoreApi } from '@/services/lifcoreApi'
import { ESPECIALIDADES_SAUDE, especialidadePorSlug } from '@/config/referenciasSaudeEspecialidades'
import { InstituicaoCard } from '@/components/referencias-saude/InstituicaoCard'
import { CtaConsultarCobertura } from '@/components/referencias-saude/CtaConsultarCobertura'

type PageProps = {
  params: Promise<{ especialidade: string }>
}

export async function generateStaticParams() {
  return ESPECIALIDADES_SAUDE.map((e) => ({ especialidade: e.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { especialidade } = await params
  const esp = especialidadePorSlug(especialidade)
  if (!esp) return { title: 'Especialidade não encontrada' }

  return {
    title: `Referências em Saúde — ${esp.nome}`,
    description: `Hospitais, laboratórios e clínicas de referência com atuação em ${esp.nome}.`,
  }
}

export default async function EspecialidadeSaudePage({ params }: PageProps) {
  const { especialidade } = await params
  const esp = especialidadePorSlug(especialidade)

  if (!esp) {
    notFound()
  }

  // usa o campo `busca` (não `nome`) — é o termo pensado pra não colidir com
  // especialidades parecidas, ex: "Oncologia Pediátrica" não deve puxar os
  // mesmos resultados de "Oncologia"
  const resultado = await lifcoreApi.listarReferenciasSaude({ especialidade: esp.busca })
  const instituicoes = resultado?.data ?? []

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Referências em Saúde', href: '/referencias-saude' },
          { label: 'Por Especialidades', href: '/referencias-saude/especialidades' },
          { label: esp.nome },
        ]}
      />

      <section className="bg-lifitseg-offwhite py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="mb-3 block text-4xl">{esp.icone}</span>
          <h1 className="mb-4 text-3xl font-black text-lifitseg-dark sm:text-4xl">
            Referências em Saúde — {esp.nome}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-lifitseg-dark/70">
            Instituições privadas de referência com atuação confirmada em {esp.nome}, em todas as regiões
            catalogadas.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {instituicoes.length === 0 ? (
            <p className="text-center text-lifitseg-dark/60">
              Ainda não temos instituições catalogadas para esta especialidade.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {instituicoes.map((inst: any) => (
                <InstituicaoCard
                  key={inst.slug}
                  slug={inst.slug}
                  nome={inst.nome}
                  cidade={inst.cidade}
                  regiao={inst.regiao}
                  status={inst.status}
                  destaque={inst.destaque}
                  logoUrl={inst.logo_url}
                  especialidades={inst.especialidades}
                  mostrarRegiao
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaConsultarCobertura especialidade={esp.nome} />
    </>
  )
}
