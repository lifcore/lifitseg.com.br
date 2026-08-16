// src/app/(site)/referencias-saude/[especialidade]/[regiao]/page.tsx

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/common/Breadcrumb'
import { lifcoreApi } from '@/services/lifcoreApi'
import { ESPECIALIDADES_SAUDE, especialidadePorSlug } from '@/config/referenciasSaudeEspecialidades'
import { REGIOES_SAUDE, nomeDaRegiao } from '@/config/referenciasSaude'
import { InstituicaoCard } from '@/components/referencias-saude/InstituicaoCard'
import { CtaConsultarCobertura } from '@/components/referencias-saude/CtaConsultarCobertura'

type PageProps = {
  params: Promise<{ especialidade: string; regiao: string }>
}

export async function generateStaticParams() {
  const combinacoes = []
  for (const e of ESPECIALIDADES_SAUDE) {
    for (const r of REGIOES_SAUDE) {
      combinacoes.push({ especialidade: e.slug, regiao: r.slug })
    }
  }
  return combinacoes
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { especialidade, regiao } = await params
  const item = especialidadePorSlug(especialidade)
  if (!item) return { title: 'Especialidade não encontrada' }
  const nomeRegiao = nomeDaRegiao(regiao)

  return {
    title: `Hospitais de Referência em ${item.nome} — ${nomeRegiao}`,
    description: `Encontre hospitais e centros de referência em ${item.nome} em ${nomeRegiao}.`,
  }
}

export default async function EspecialidadeRegiaoSaudePage({ params }: PageProps) {
  const { especialidade, regiao } = await params
  const item = especialidadePorSlug(especialidade)

  if (!item || !REGIOES_SAUDE.some((r) => r.slug === regiao)) {
    notFound()
  }

  const resultado = await lifcoreApi.listarReferenciasSaude({ especialidade: item.busca, regiao })
  const instituicoes = resultado?.data ?? []
  const nomeRegiao = nomeDaRegiao(regiao)

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Referências em Saúde', href: '/referencias-saude' },
          { label: item.nome, href: `/referencias-saude/${especialidade}` },
          { label: nomeRegiao },
        ]}
      />

      <section className="bg-lifitseg-offwhite py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="mb-3 block text-4xl">{item.icone}</span>
          <h1 className="mb-4 text-3xl font-black text-lifitseg-dark sm:text-4xl">
            {item.nome} em {nomeRegiao}
          </h1>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {instituicoes.length === 0 ? (
            <p className="text-center text-lifitseg-dark/60">
              Ainda não temos instituições de {item.nome} catalogadas em {nomeRegiao}.
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

      <CtaConsultarCobertura especialidade={item.nome} cidade={nomeRegiao} />
    </>
  )
}
