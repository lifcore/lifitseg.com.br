import type { Metadata } from 'next'
import Breadcrumb from '@/components/common/Breadcrumb'
import { DuvidasHome } from '@/components/home/DuvidasHome'
import { FormularioSeguros } from '@/components/forms/FormularioSeguros'
import { SolucoesSeguros, AtendimentoSinistro, GradeSeguradoras } from '@/components/seguros/BlocosSeguros'
import { GuiasDestaque } from '@/components/atuacao/Blocos'
import { CORPORATIVO } from '@/content/seguros'

// Seguros Corporativos — etapa 3 do Chief Chat (Lifitseg_Site_Seguros_Conteudo_v1.md).
// Rota preservada; portfólio derivado da página anterior.

export const metadata: Metadata = {
  title: { absolute: 'Seguros corporativos e análise de riscos | Lifitseg' },
  description: 'Consultoria em seguros para patrimônio, responsabilidades, transporte e frota. Entenda critérios de contratação, renovação e acompanhamento.',
}

const C = CORPORATIVO

export default function SegurosCorporativosPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Início', href: '/' }, { label: 'Seguros corporativos' }]} />

      <section className="bg-lifitseg-dark text-lifitseg-offwhite">
        <div className="mx-auto max-w-7xl px-4 pt-14 pb-16 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest text-lifitseg-mint uppercase">{C.abertura.sobretitulo}</p>
          <h1 className="mt-5 max-w-4xl text-4xl text-white sm:text-5xl" style={{ lineHeight: 1.15 }}>{C.abertura.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg text-lifitseg-offwhite/80">{C.abertura.texto}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#contato" className="rounded-xl bg-primary px-6 py-3.5 text-center text-sm font-bold text-lifitseg-dark hover:opacity-90">{C.abertura.ctaPrincipal}</a>
            <a href="#solucoes" className="text-sm font-semibold hover:text-lifitseg-mint">{C.abertura.ctaSecundario} <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section aria-labelledby="titulo-antes" className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 id="titulo-antes" className="text-lifitseg-dark">{C.antes.titulo}</h2>
            <p className="mt-4 text-lifitseg-text-soft">{C.antes.texto}</p>
          </div>
          <ul className="space-y-3">
            {C.antes.perguntas.map((p) => (
              <li key={p} className="flex gap-3 rounded-xl bg-lifitseg-paper p-4 text-sm text-lifitseg-text">
                <span aria-hidden="true" className="font-bold text-lifitseg-green">?</span>{p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="solucoes" aria-labelledby="titulo-solucoes" className="scroll-mt-20 bg-lifitseg-paper py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-solucoes" className="text-lifitseg-dark">Soluções conforme a necessidade.</h2>
          <div className="mt-10"><SolucoesSeguros itens={C.solucoes} /></div>
        </div>
      </section>

      <section aria-labelledby="titulo-momentos" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-momentos" className="text-lifitseg-dark">Nossa atuação em quatro momentos.</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {C.momentos.map((m, i) => (
              <li key={m.titulo} className="rounded-2xl border border-lifitseg-line p-5">
                <span className="text-sm font-bold text-lifitseg-green">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-2 font-bold text-lifitseg-dark">{m.titulo}</p>
                <p className="mt-2 text-sm text-lifitseg-text-soft">{m.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="titulo-criterios-seg" className="bg-lifitseg-paper py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-criterios-seg" className="text-lifitseg-dark">O que observar na comparação.</h2>
          <dl className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {C.criterios.map((c) => (
              <div key={c.criterio} className="rounded-2xl bg-white p-5">
                <dt className="font-semibold text-lifitseg-dark">{c.criterio}</dt>
                <dd className="mt-1 text-sm text-lifitseg-text-soft">{c.motivo}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <AtendimentoSinistro texto={C.sinistro} rotulo="corporativo" />

      <GradeSeguradoras />

      <section aria-labelledby="titulo-faq-corp" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-faq-corp" className="mb-8 text-lifitseg-dark">Perguntas frequentes.</h2>
          <DuvidasHome itens={C.faq} />
        </div>
      </section>

      <section aria-labelledby="titulo-guias-corp" className="bg-lifitseg-paper py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-guias-corp" className="text-lifitseg-dark">Guias de seguros.</h2>
          <div className="mt-8"><GuiasDestaque area="seguros" /></div>
        </div>
      </section>

      <section id="contato" aria-labelledby="titulo-contato-corp" className="scroll-mt-24 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8">
          <div>
            <h2 id="titulo-contato-corp" className="text-lifitseg-dark">{C.encerramento}</h2>
            <p className="mt-4 max-w-md text-lifitseg-text-soft">{C.ctaFinal}: conte o que a empresa faz e o que precisa ser avaliado.</p>
          </div>
          <div className="rounded-3xl border border-lifitseg-line bg-lifitseg-paper p-6 sm:p-8">
            <FormularioSeguros variante="corporativo" pontoEntrada="seguros-corporativos" />
          </div>
        </div>
      </section>
    </>
  )
}
