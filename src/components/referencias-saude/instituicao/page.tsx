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

/** Rótulo de seção discreto — pequeno, sem gritar. Substitui o antigo "ESPECIALIDADES" grande/maiúsculo. */
function RotuloSecao({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-lifitseg-dark/40">{children}</h2>
}

function ChipsLista({ itens }: { itens: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {itens.map((item) => (
        <span
          key={item}
          className="rounded-lg bg-lifitseg-dark/[0.04] px-3 py-1.5 text-sm font-medium text-lifitseg-dark/75"
        >
          {item}
        </span>
      ))}
    </div>
  )
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

      <section className="bg-lifitseg-offwhite py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-14">
            {/* ===== Coluna principal ===== */}
            <div>
              {emImplantacao && (
                <div className="mb-6 rounded-xl border border-primary/25 bg-primary/[0.06] px-4 py-3 text-sm text-lifitseg-dark/80">
                  ⚠️ <strong className="font-semibold">{ROTULO_STATUS_REFERENCIA[inst.status]}</strong> — esta
                  instituição ainda não está em operação. As informações abaixo são sobre o empreendimento
                  anunciado, não sobre um atendimento disponível hoje.
                </div>
              )}

              <div className="mb-7 flex items-start gap-4">
                <LogoOuPlaceholder nome={inst.nome} logoUrl={inst.logo_url} tamanho="lg" />
                <div className="pt-0.5">
                  <h1 className="text-2xl font-black leading-tight text-lifitseg-dark sm:text-3xl">{inst.nome}</h1>
                  <p className="mt-1 text-sm text-lifitseg-dark/50">
                    {inst.cidade} · {ROTULO_STATUS_REFERENCIA[inst.status] ?? inst.status}
                  </p>
                </div>
              </div>

              {inst.descricao && (
                <p className="mb-9 text-base leading-relaxed text-lifitseg-dark/75">{inst.descricao}</p>
              )}

              <div className="space-y-7">
                {inst.especialidades?.length > 0 && (
                  <div>
                    <RotuloSecao>Especialidades</RotuloSecao>
                    <ChipsLista itens={inst.especialidades} />
                  </div>
                )}

                {inst.patologias?.length > 0 && (
                  <div>
                    <RotuloSecao>Condições atendidas</RotuloSecao>
                    <ChipsLista itens={inst.patologias} />
                  </div>
                )}

                {inst.servicos_destaque?.length > 0 && (
                  <div>
                    <RotuloSecao>Serviços de destaque</RotuloSecao>
                    <ChipsLista itens={inst.servicos_destaque} />
                  </div>
                )}
              </div>

              {(inst.endereco || inst.telefone || inst.site_oficial || inst.google_business_url) && (
                <div className="mt-9 border-t border-lifitseg-dark/10 pt-7">
                  <RotuloSecao>Contato</RotuloSecao>
                  <div className="space-y-1 text-sm text-lifitseg-dark/70">
                    {inst.endereco && <p>{inst.endereco}</p>}
                    {inst.telefone && <p>{inst.telefone}</p>}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
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

            {/* ===== Coluna lateral — CTA em destaque, fixo ao rolar no desktop ===== */}
            <div className="lg:sticky lg:top-28">
              <CtaConsultarCobertura
                variante="card"
                nomeInstituicao={inst.nome}
                instituicaoSlug={inst.slug}
                cidade={inst.cidade}
                especialidade={inst.especialidades?.[0]}
                operadorasInformadas={inst.operadoras_informadas}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
