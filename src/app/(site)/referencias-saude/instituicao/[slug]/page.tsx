// src/app/(site)/referencias-saude/instituicao/[slug]/page.tsx

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/common/Breadcrumb'
import { lifcoreApi } from '@/services/lifcoreApi'
import { nomeDaRegiao, ROTULO_STATUS_REFERENCIA } from '@/config/referenciasSaude'
import { CtaConsultarCobertura } from '@/components/referencias-saude/CtaConsultarCobertura'
import { LogoOuPlaceholder } from '@/components/referencias-saude/LogoOuPlaceholder'

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

          <div className="mb-6 flex items-start gap-4">
            <LogoOuPlaceholder nome={inst.nome} logoUrl={inst.logo_url} tamanho="lg" />
            <div>
              <h1 className="text-3xl font-black text-lifitseg-dark sm:text-4xl">{inst.nome}</h1>
              <p className="mt-1 text-base text-lifitseg-dark/60">
                {inst.cidade} · {ROTULO_STATUS_REFERENCIA[inst.status] ?? inst.status}
              </p>
            </div>
          </div>

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

          {inst.servicos_destaque?.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-lifitseg-dark/50">
                Serviços de destaque
              </h2>
              <div className="flex flex-wrap gap-2">
                {inst.servicos_destaque.map((s: string) => (
                  <span key={s} className="rounded-full border border-lifitseg-dark/15 bg-white px-3 py-1 text-xs font-medium text-lifitseg-dark/80">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {inst.operadoras_informadas?.length > 0 && (
            <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-lifitseg-dark/70">
                Operadoras/convênios informados
              </h2>
              <div className="mb-3 flex flex-wrap gap-2">
                {inst.operadoras_informadas.map((o: string) => (
                  <span key={o} className="rounded-full border border-lifitseg-dark/15 bg-white px-3 py-1 text-xs font-medium text-lifitseg-dark/80">
                    {o}
                  </span>
                ))}
              </div>
              <p className="text-xs leading-relaxed text-lifitseg-dark/60">
                {inst.observacao_cobertura ||
                  'A disponibilidade depende da operadora, produto/plano, unidade e condições contratuais vigentes. A LifitSeg valida o produto/plano específico antes de apresentar a opção ao cliente.'}
              </p>
            </div>
          )}

          {(inst.endereco || inst.telefone || inst.site_oficial || inst.google_business_url) && (
            <div className="mt-8 rounded-2xl border border-lifitseg-dark/10 bg-white p-6">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-lifitseg-dark/50">
                Contato
              </h2>
              {inst.endereco && <p className="mb-1 text-sm text-lifitseg-dark/80">{inst.endereco}</p>}
              {inst.telefone && <p className="mb-3 text-sm text-lifitseg-dark/80">{inst.telefone}</p>}
              <div className="flex flex-wrap gap-3">
                {inst.site_oficial && (
                  <a
                    href={inst.site_oficial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-lifitseg-dark px-4 py-2 text-xs font-bold text-lifitseg-offwhite transition-opacity hover:opacity-90"
                  >
                    Visitar site oficial
                  </a>
                )}
                {!inst.site_oficial && inst.google_business_url && (
                  <a
                    href={inst.google_business_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-lifitseg-dark/20 px-4 py-2 text-xs font-bold text-lifitseg-dark transition-colors hover:border-primary"
                  >
                    Ver no Google
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaConsultarCobertura nomeInstituicao={inst.nome} instituicaoSlug={inst.slug} cidade={inst.cidade} especialidade={inst.especialidades?.[0]} />
    </>
  )
}
