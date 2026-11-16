// src/app/(site)/operadoras/[slug]/page.tsx — ficha da operadora (Raphael, 15/11/2026).
// Site, central e link da rede credenciada da própria operadora; planos em comercialização só com nome e tipo
// e um botão "Veja os preços" (WhatsApp do assistente, que cadastra o prospect); IDSS da ANS. Sem reajustes e
// sem contato comercial ou pessoal.

import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/common/Breadcrumb'
import { lifcoreApi } from '@/services/lifcoreApi'
import { faixaIdss, slugDaFicha, type FichaOperadora } from '@/config/fichaOperadora'
import { OPERADORAS } from '@/config/operadoras'

/** Logo local do site para a ficha (public/seguradoras). */
function logoDaFicha(slug: string): string | null {
  const op = OPERADORAS.find((o) => slugDaFicha(o.name) === slug)
  return op ? `/seguradoras/${op.file}.png` : null
}
import { linkWhatsApp } from '@/utils/whatsapp'

type PageProps = { params: Promise<{ slug: string }> }

async function fichas(): Promise<FichaOperadora[]> {
  try {
    const r = await lifcoreApi.listarOperadoras()
    return (r?.data ?? []) as FichaOperadora[]
  } catch {
    return []
  }
}

export async function generateStaticParams() {
  return (await fichas()).map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const f = (await fichas()).find((x) => x.slug === slug)
  if (!f) return { title: 'Operadora não encontrada' }
  return {
    title: `${f.nome}: planos, rede credenciada e IDSS`,
    description: `Ficha da ${f.nome}: planos que a Lifitseg comercializa, link da rede credenciada, central de atendimento e nota no IDSS da ANS.`,
  }
}

function Rotulo({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">{children}</h2>
}

const MAX_FAMILIAS = 12

export default async function FichaOperadoraPage({ params }: PageProps) {
  const { slug } = await params
  const f = (await fichas()).find((x) => x.slug === slug)
  if (!f) notFound()

  const logo = logoDaFicha(f.slug)
  const precos = linkWhatsApp(`Olá! Vim pelo site da Lifitseg e quero ver os preços dos planos da ${f.nome}.`)
  const nota = f.idss ? f.idss.nota.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : null

  return (
    <>
      <Breadcrumb items={[{ label: 'Operadoras', href: '/#parceiros' }, { label: f.nome }]} />
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-start">
            <div className="min-w-0">
              <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                {logo && (
                  <div className="relative h-16 w-44 shrink-0 overflow-hidden rounded-xl border border-lifitseg-dark/10 bg-white">
                    <Image src={logo} alt={`Logo — ${f.nome}`} fill sizes="176px" className="object-contain p-2" />
                  </div>
                )}
                <div className="min-w-0">
                  <h1 className="text-2xl font-black leading-tight text-lifitseg-dark sm:text-3xl">{f.nome}</h1>
                  {f.registro_ans && <p className="mt-1 text-sm text-lifitseg-dark/50">Registro ANS {f.registro_ans}</p>}
                </div>
              </div>

              {f.idss && (
                <div className="mb-10 rounded-2xl border border-lifitseg-dark/10 bg-lifitseg-paper p-6">
                  <Rotulo>IDSS · ANS</Rotulo>
                  <p className="text-4xl font-black text-lifitseg-dark">{nota}</p>
                  <p className="mt-1 text-sm text-lifitseg-dark/70">{faixaIdss(f.idss.nota)} · ano-base {f.idss.ano}</p>
                  <p className="mt-3 text-xs leading-relaxed text-lifitseg-dark/55">
                    O Índice de Desempenho da Saúde Suplementar é calculado pela ANS de 0 a 1, a partir da qualidade da atenção, do
                    acesso, da sustentabilidade e da gestão de cada operadora.
                  </p>
                </div>
              )}

              <Rotulo>Planos que a Lifitseg comercializa</Rotulo>
              {f.planos.length === 0 ? (
                <p className="mb-10 text-sm text-lifitseg-dark/60">Consulte a Lifitseg sobre os planos disponíveis para o seu perfil.</p>
              ) : (
                <div className="mb-10 grid gap-4">
                  {f.planos.map((p) => (
                    <div key={`${p.linha}-${p.tipo}`} className="rounded-2xl border border-lifitseg-dark/10 p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-bold text-lifitseg-dark">{p.linha}</p>
                        {p.tipo && <span className="rounded-full bg-lifitseg-green/10 px-2.5 py-0.5 text-xs font-semibold text-lifitseg-green">{p.tipo}</span>}
                      </div>
                      {p.familias.length > 0 && (
                        <p className="mt-2 text-sm leading-relaxed text-lifitseg-dark/70">
                          {p.familias.slice(0, MAX_FAMILIAS).join(' · ')}
                          {p.familias.length > MAX_FAMILIAS && ` · e mais ${p.familias.length - MAX_FAMILIAS}`}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs leading-relaxed text-lifitseg-dark/50">
                Disponibilidade, rede e condições dependem do produto, da região e da análise comercial. A Lifitseg é corretora
                autorizada a comercializar; a ficha não é endosso nem ranking.
              </p>
            </div>

            <aside className="lg:sticky lg:top-28">
              <div className="rounded-3xl border border-primary/20 bg-lifitseg-dark p-7 shadow-lg">
                <h2 className="mb-2 text-xl font-bold leading-snug text-lifitseg-offwhite">Quer ver os preços?</h2>
                <p className="mb-6 text-sm leading-relaxed text-lifitseg-offwhite/70">
                  O assistente virtual faz algumas perguntas e um consultor monta a cotação para o seu perfil.
                </p>
                <a
                  href={precos}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-xl bg-primary py-4 text-center text-sm font-bold text-lifitseg-dark shadow-md transition-opacity hover:opacity-90"
                >
                  Veja os preços
                </a>
              </div>

              <div className="mt-6 rounded-2xl border border-lifitseg-dark/10 p-6">
                <Rotulo>Canais da operadora</Rotulo>
                <ul className="space-y-3 text-sm">
                  {f.rede_credenciada && (
                    <li>
                      <a href={f.rede_credenciada} target="_blank" rel="noopener noreferrer" className="font-semibold text-lifitseg-green underline underline-offset-2">
                        Rede credenciada (site da operadora)
                      </a>
                    </li>
                  )}
                  {f.site && (
                    <li>
                      <a href={f.site} target="_blank" rel="noopener noreferrer" className="font-semibold text-lifitseg-green underline underline-offset-2">
                        Site oficial
                      </a>
                    </li>
                  )}
                  {f.central && (
                    <li className="text-lifitseg-dark/80">
                      Central de atendimento: <span className="font-semibold text-lifitseg-dark">{f.central}</span>
                    </li>
                  )}
                  {f.contatos.map((c) => (
                    <li key={`${c.tipo}-${c.valor}`} className="text-lifitseg-dark/80">
                      {c.rotulo}: <span className="font-semibold text-lifitseg-dark">{c.valor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
