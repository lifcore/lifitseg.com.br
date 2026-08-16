// src/app/(site)/referencias-saude/instituicao/[slug]/page.tsx

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/common/Breadcrumb'
import { lifcoreApi } from '@/services/lifcoreApi'
import { nomeDaRegiao, ROTULO_STATUS_REFERENCIA } from '@/config/referenciasSaude'
import { CtaConsultarCobertura } from '@/components/referencias-saude/CtaConsultarCobertura'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const resultado = await lifcoreApi.listarReferenciasSaude()
  const instituicoes = resultado?.data ?? []
  return instituicoes.map((inst: any) => ({ slug: inst.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const resultado = await lifcoreApi.listarReferenciasSaude({ slug })
  const inst = resultado?.data
  if (!inst) return { title: 'Referência não encontrada' }

  return {
    title: inst.nome,
    description: inst.descricao || `${inst.nome} — ${inst.cidade}. Referência privada em saúde catalogada pela LifitSeg.`,
  }
}

export default async function InstituicaoSaudePage({ params }: PageProps) {
  const { slug } = await params
  const resultado = await lifcoreApi.listarReferenciasSaude({ slug })
  const inst = resultado?.data

  if (!inst) {
    notFound()
  }

  const nomeRegiao = nomeDaRegiao(inst.regiao)
  const emImplantacao = inst.status === 'EM_IMPLANTACAO'

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Referências em Saúde', href: '/referencias-saude' },
          { label: nomeRegiao, href: `/referencias-saude/regiao/${inst.regiao}` },
          { label: inst.nome },
        ]}
      />

      <section className="bg-lifitseg-offwhite py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {emImplantacao && (
            <div className="mb-6 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-lifitseg-dark">
              ⚠️ {ROTULO_STATUS_REFERENCIA[inst.status]} — esta instituição ainda não está em
              operação. As informações abaixo são sobre o empreendimento anunciado, não sobre um
              atendimento disponível hoje.
            </div>
          )}

          <h1 className="mb-2 text-3xl font-black text-lifitseg-dark sm:text-4xl">{inst.nome}</h1>
          <p className="mb-6 text-base text-lifitseg-dark/60">{inst.cidade}</p>

          {inst.descricao && (
            <p className="mb-8 text-base leading-relaxed text-lifitseg-dark/80">{inst.descricao}</p>
          )}

          {inst.especialidades?.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-lifitseg-dark/50">
                Especialidades
              </h2>
              <div className="flex flex-wrap gap-2">
                {inst.especialidades.map((e: string) => (
                  <span key={e} className="rounded-full border border-lifitseg-dark/15 bg-white px-3 py-1 text-xs font-medium text-lifitseg-dark/80">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          )}

          {inst.patologias?.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-lifitseg-dark/50">
                Condições atendidas
              </h2>
              <div className="flex flex-wrap gap-2">
                {inst.patologias.map((p: string) => (
                  <span key={p} className="rounded-full border border-lifitseg-dark/15 bg-white px-3 py-1 text-xs font-medium text-lifitseg-dark/80">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(inst.endereco || inst.telefone || inst.site_oficial) && (
            <div className="mt-8 rounded-2xl border border-lifitseg-dark/10 bg-white p-6">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-lifitseg-dark/50">
                Contato
              </h2>
              {inst.endereco && <p className="mb-1 text-sm text-lifitseg-dark/80">{inst.endereco}</p>}
              {inst.telefone && <p className="mb-1 text-sm text-lifitseg-dark/80">{inst.telefone}</p>}
              {inst.site_oficial && (
                <a href={inst.site_oficial} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary underline">
                  Site oficial
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      <CtaConsultarCobertura nomeInstituicao={inst.nome} />
    </>
  )
}
