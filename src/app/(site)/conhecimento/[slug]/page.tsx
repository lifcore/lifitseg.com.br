import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/common/Breadcrumb'
import { LinkWhatsApp } from '@/components/common/LinkWhatsApp'
import { GUIAS, obterGuia, AUTORIA_GUIAS, DATA_REVISAO_GUIAS } from '@/content/guias'
import { siteConfig } from '@/config/site'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return GUIAS.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const guia = obterGuia(slug)
  if (!guia) return {}
  return { title: guia.titulo, description: guia.resumo }
}

function dataBR(iso: string) {
  const [a, m, d] = iso.split('-')
  return `${d}/${m}/${a}`
}

export default async function GuiaPage({ params }: PageProps) {
  const { slug } = await params
  const guia = obterGuia(slug)
  if (!guia) notFound()

  const outros = GUIAS.filter((g) => g.area === guia.area && g.slug !== guia.slug).slice(0, 3)
  const seguros = guia.area === 'seguros'

  return (
    <>
      <Breadcrumb items={[{ label: 'Guias', href: '/conhecimento' }, { label: guia.titulo }]} />
      <article className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-bold tracking-widest text-lifitseg-green uppercase">{guia.tema}</p>
          <h1 className="mt-4 text-3xl text-lifitseg-dark sm:text-4xl">{guia.titulo}</h1>
          <p className="mt-3 text-sm text-lifitseg-text-soft">
            {AUTORIA_GUIAS} · atualizado em <time dateTime={DATA_REVISAO_GUIAS}>{dataBR(DATA_REVISAO_GUIAS)}</time>
          </p>

          <div className="mt-8 space-y-5 text-lifitseg-text">
            {guia.paragrafos.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
          </div>

          <section aria-labelledby="titulo-lista" className="mt-10 rounded-2xl bg-lifitseg-paper p-6">
            <h2 id="titulo-lista" className="text-lifitseg-dark" style={{ fontSize: '1.15rem' }}>{guia.listaTitulo}</h2>
            <ul className="mt-4 space-y-2 text-sm text-lifitseg-text">
              {guia.lista.map((item) => (
                <li key={item} className="flex gap-3"><span aria-hidden="true" className="text-lifitseg-green">•</span>{item}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="titulo-apoio" className="mt-10">
            <h2 id="titulo-apoio" className="text-lifitseg-dark" style={{ fontSize: '1.15rem' }}>Como a Lifitseg pode apoiar</h2>
            <p className="mt-3 text-lifitseg-text">{guia.apoio}</p>
            {guia.cta.destino === 'contato' ? (
              <Link href={guia.cta.href ?? "/#contato"} className="mt-6 inline-block rounded-xl bg-lifitseg-green px-6 py-3 text-sm font-bold text-white hover:opacity-90">
                {guia.cta.texto}
              </Link>
            ) : (
              <div className="mt-6 rounded-2xl border border-lifitseg-line p-5 text-sm">
                <p className="font-semibold text-lifitseg-dark">{guia.cta.texto}</p>
                <p className="mt-2 text-lifitseg-text-soft">Clientes Lifitseg: use o canal de atendimento. {seguros ? 'Em ocorrência, priorize a segurança e os canais indicados na apólice. Não envie documentos por redes sociais ou formulários públicos.' : 'Não envie documentos ou informações de saúde por redes sociais ou formulários públicos.'}</p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <LinkWhatsApp rotulo={`guia-${guia.slug}`} className="font-bold text-lifitseg-green hover:underline">WhatsApp {siteConfig.contato.whatsappExibicao}</LinkWhatsApp>
                  <a href={`mailto:${siteConfig.contato.email}`} className="font-bold text-lifitseg-green hover:underline">{siteConfig.contato.email}</a>
                </div>
              </div>
            )}
          </section>

          {guia.fontes.length === 0 && (
            <p className="mt-10 border-t border-lifitseg-line pt-6 text-sm text-lifitseg-text-soft">
              Este guia reúne a orientação prática da equipe Lifitseg; não cita fonte pública específica. As condições aplicáveis estão no contrato ou na apólice de cada caso.
            </p>
          )}

          {guia.fontes.length > 0 && (
            <section aria-labelledby="titulo-fontes" className="mt-10 border-t border-lifitseg-line pt-6 text-sm">
              <h2 id="titulo-fontes" className="font-semibold text-lifitseg-dark" style={{ fontSize: '1rem' }}>Fontes públicas</h2>
              <ul className="mt-2 space-y-1">
                {guia.fontes.map((f) => (
                  <li key={f.url}>
                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-lifitseg-green underline underline-offset-2">{f.rotulo}</a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="mt-10 text-xs text-lifitseg-text-soft">
            {seguros
              ? 'Conteúdo educativo. Coberturas, limites e condições dependem da proposta, da apólice e da análise da seguradora. Não substitui a leitura do seu contrato nem os canais oficiais da seguradora e da SUSEP.'
              : 'Conteúdo educativo. Não substitui a análise das condições do seu contrato, a orientação do profissional de saúde nem os canais oficiais da operadora e da ANS. Em urgência, procure atendimento assistencial.'}
          </p>
        </div>
      </article>

      <section aria-labelledby="titulo-outros" className="bg-lifitseg-paper py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-outros" className="text-lifitseg-dark">Outros guias</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {outros.map((g) => (
              <li key={g.slug}>
                <Link href={`/conhecimento/${g.slug}`} className="block h-full rounded-2xl border border-lifitseg-line bg-white p-5 hover:border-lifitseg-green">
                  <span className="font-bold text-lifitseg-dark">{g.titulo}</span>
                  <span className="mt-2 block text-sm text-lifitseg-text-soft">{g.resumo}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
