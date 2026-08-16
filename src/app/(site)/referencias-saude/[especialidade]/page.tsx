// src/app/(site)/referencias-saude/[especialidade]/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/common/Breadcrumb'
import { lifcoreApi } from '@/services/lifcoreApi'
import { ESPECIALIDADES_SAUDE, especialidadePorSlug } from '@/config/referenciasSaudeEspecialidades'
import { REGIOES_SAUDE, nomeDaRegiao } from '@/config/referenciasSaude'
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
  const item = especialidadePorSlug(especialidade)
  if (!item) return { title: 'Especialidade não encontrada' }

  return {
    title: `Hospitais de Referência em ${item.nome}`,
    description: `Encontre hospitais e centros de referência em ${item.nome} em Jundiaí, Campinas e São Paulo.`,
  }
}

export default async function EspecialidadeSaudePage({ params }: PageProps) {
  const { especialidade } = await params
  const item = especialidadePorSlug(especialidade)

  if (!item) {
    notFound()
  }

  const resultado = await lifcoreApi.listarReferenciasSaude({ especialidade: item.busca })
  const instituicoes = resultado?.data ?? []

  const contagemPorRegiao = Object.fromEntries(
    REGIOES_SAUDE.map((r) => [r.slug, instituicoes.filter((i: any) => i.regiao === r.slug).length])
  )

  return (
    <>
      <Breadcrumb items={[{ label: 'Referências em Saúde', href: '/referencias-saude' }, { label: item.nome }]} />

      <section className="bg-lifitseg-offwhite py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="mb-3 block text-4xl">{item.icone}</span>
          <h1 className="mb-4 text-3xl font-black text-lifitseg-dark sm:text-4xl">
            Hospitais de Referência em {item.nome}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-lifitseg-dark/70">
            Escolha a região para ver as instituições catalogadas.
          </p>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {REGIOES_SAUDE.map((regiao) => (
              <Link
                key={regiao.slug}
                href={`/referencias-saude/${especialidade}/${regiao.slug}`}
                className="rounded-full border border-lifitseg-dark/15 bg-lifitseg-offwhite px-5 py-2 text-sm font-semibold text-lifitseg-dark transition-colors hover:border-primary hover:text-primary"
              >
                {regiao.nome} ({contagemPorRegiao[regiao.slug] ?? 0})
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {instituicoes.length === 0 ? (
            <p className="text-center text-lifitseg-dark/60">
              Ainda não temos instituições catalogadas para {item.nome}.
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
                  mostrarRegiao
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

      <CtaConsultarCobertura especialidade={item.nome} />
    </>
  )
}
