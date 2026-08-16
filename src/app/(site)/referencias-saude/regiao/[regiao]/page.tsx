// src/app/(site)/referencias-saude/regiao/[regiao]/page.tsx

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/common/Breadcrumb'
import { lifcoreApi } from '@/services/lifcoreApi'
import { REGIOES_SAUDE, nomeDaRegiao, ROTULO_STATUS_REFERENCIA } from '@/config/referenciasSaude'
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
    title: `Referências em Saúde — ${nome}`,
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
            Referências em Saúde — {nome}
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
                <Link
                  key={inst.slug}
                  href={`/referencias-saude/instituicao/${inst.slug}`}
                  className="flex flex-col justify-between rounded-2xl border border-lifitseg-dark/10 bg-lifitseg-offwhite p-6 transition-all hover:border-primary/60"
                >
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      {inst.status === 'EM_IMPLANTACAO' && (
                        <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                          {ROTULO_STATUS_REFERENCIA[inst.status]}
                        </span>
                      )}
                      {inst.destaque && (
                        <span className="rounded-md border border-lifitseg-dark/20 bg-lifitseg-dark/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-lifitseg-dark/60">
                          Destaque
                        </span>
                      )}
                    </div>
                    <h2 className="mb-2 text-lg font-bold text-lifitseg-dark">{inst.nome}</h2>
                    <p className="mb-3 text-sm text-lifitseg-dark/60">{inst.cidade}</p>
                    {inst.especialidades?.length > 0 && (
                      <p className="text-xs text-lifitseg-dark/50">
                        {inst.especialidades.slice(0, 3).join(' · ')}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaConsultarCobertura />
    </>
  )
}
