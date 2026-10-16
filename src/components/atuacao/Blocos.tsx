import Link from 'next/link'
import { METODO, FRENTES_GESTAO, COMPLEXIDADE, CRITERIOS, PERGUNTAS_DIAGNOSTICO, EXEMPLOS_EDUCATIVOS } from '@/content/atuacao'
import { GUIAS, type Guia } from '@/content/guias'

// Blocos de conteúdo técnico (M-27 / D-36), compartilhados pela home e pela
// página de Benefícios Corporativos. Resumo sempre visível; detalhe em
// <details> quando há densidade (orientação do Chat: não esconder tudo).

export function MetodoEtapas() {
  return (
    <ol className="grid gap-4 md:grid-cols-5">
      {METODO.map((etapa, i) => (
        <li key={etapa.titulo} className="flex flex-col rounded-2xl border border-lifitseg-line bg-white p-5">
          <span className="text-sm font-bold text-lifitseg-green">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="mt-2 text-lifitseg-dark" style={{ fontSize: '1.05rem' }}>{etapa.titulo}</h3>
          <p className="mt-2 flex-1 text-sm text-lifitseg-text-soft">{etapa.texto}</p>
          <details className="mt-4 text-sm">
            <summary className="cursor-pointer font-semibold text-lifitseg-green">O que é considerado</summary>
            <p className="mt-2 text-lifitseg-text-soft">{etapa.considerado}</p>
          </details>
        </li>
      ))}
    </ol>
  )
}

export function FrentesGestao() {
  return (
    <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
      {FRENTES_GESTAO.map((f) => (
        <article key={f.id}>
          <span aria-hidden="true" className="mb-3 block h-0.5 w-8 bg-lifitseg-green" />
          <h3 className="text-lifitseg-dark" style={{ fontSize: '1.1rem' }}>{f.titulo}</h3>
          <p className="mt-2 text-sm text-lifitseg-text-soft">{f.texto}</p>
        </article>
      ))}
    </div>
  )
}

export function ComplexidadeBloco() {
  return (
    <section aria-labelledby="titulo-complexidade" className="bg-lifitseg-dark py-16 text-lifitseg-offwhite">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
        <h2 id="titulo-complexidade" className="text-white">{COMPLEXIDADE.titulo}</h2>
        <div className="space-y-4 text-lifitseg-offwhite/80">
          {COMPLEXIDADE.paragrafos.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
          <p className="text-sm text-lifitseg-offwhite/60">O formulário de contato não recebe dados médicos. Situações sensíveis são tratadas em canal reservado.</p>
        </div>
      </div>
    </section>
  )
}

export function CriteriosComparacao() {
  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl border border-lifitseg-line md:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Critérios que entram na comparação de um plano empresarial</caption>
          <thead className="bg-lifitseg-paper text-lifitseg-dark">
            <tr>
              <th scope="col" className="px-5 py-3 font-semibold">Critério</th>
              <th scope="col" className="px-5 py-3 font-semibold">O que observar</th>
              <th scope="col" className="px-5 py-3 font-semibold">Pergunta prática</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-lifitseg-line bg-white">
            {CRITERIOS.map((c) => (
              <tr key={c.criterio}>
                <th scope="row" className="px-5 py-4 align-top font-semibold text-lifitseg-dark">{c.criterio}</th>
                <td className="px-5 py-4 align-top text-lifitseg-text-soft">{c.texto}</td>
                <td className="px-5 py-4 align-top text-lifitseg-text">{c.pergunta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="space-y-3 md:hidden">
        {CRITERIOS.map((c) => (
          <li key={c.criterio} className="rounded-2xl border border-lifitseg-line bg-white p-4">
            <p className="font-semibold text-lifitseg-dark">{c.criterio}</p>
            <p className="mt-1 text-sm text-lifitseg-text-soft">{c.texto}</p>
            <p className="mt-2 text-sm text-lifitseg-text"><span className="font-semibold">Pergunta: </span>{c.pergunta}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-lifitseg-text-soft">
        Não existe uma tabela universal de coberturas: cada condição é conferida por produto, na informação atual da operadora.
      </p>
    </>
  )
}

export function PerguntasDiagnostico() {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {PERGUNTAS_DIAGNOSTICO.map((p) => (
        <li key={p} className="flex gap-3 rounded-xl bg-white p-4 text-sm text-lifitseg-text">
          <span aria-hidden="true" className="font-bold text-lifitseg-green">?</span>
          <span>{p}</span>
        </li>
      ))}
    </ul>
  )
}

export function ExemplosEducativos() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {EXEMPLOS_EDUCATIVOS.map((e) => (
        <article key={e.titulo} className="rounded-2xl border border-lifitseg-line bg-white p-6">
          <p className="text-xs font-bold tracking-wide text-lifitseg-green uppercase">Exemplo educativo</p>
          <h3 className="mt-2 text-lifitseg-dark" style={{ fontSize: '1.1rem' }}>{e.titulo}</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div><dt className="font-semibold text-lifitseg-dark">A necessidade</dt><dd className="text-lifitseg-text-soft">{e.necessidade}</dd></div>
            <div><dt className="font-semibold text-lifitseg-dark">O que precisa ser analisado</dt><dd className="text-lifitseg-text-soft">{e.analise}</dd></div>
            <div><dt className="font-semibold text-lifitseg-dark">Como a consultoria pode apoiar</dt><dd className="text-lifitseg-text-soft">{e.apoio}</dd></div>
            <div><dt className="font-semibold text-lifitseg-dark">O que se aprende</dt><dd className="text-lifitseg-text-soft">{e.aprendizado}</dd></div>
          </dl>
          {'limite' in e && e.limite && <p className="mt-4 text-xs text-lifitseg-text-soft">{e.limite}</p>}
        </article>
      ))}
    </div>
  )
}

export function GuiasDestaque({ limite = 6, area }: { limite?: number; area?: Guia['area'] }) {
  const lista = area ? GUIAS.filter((g) => g.area === area) : GUIAS
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {lista.slice(0, limite).map((g) => (
        <li key={g.slug}>
          <Link href={`/conhecimento/${g.slug}`} className="flex h-full flex-col rounded-2xl border border-lifitseg-line bg-white p-5 transition-colors hover:border-lifitseg-green">
            <span className="text-xs font-bold tracking-wide text-lifitseg-green uppercase">{g.tema}</span>
            <span className="mt-2 font-bold text-lifitseg-dark">{g.titulo}</span>
            <span className="mt-2 flex-1 text-sm text-lifitseg-text-soft">{g.resumo}</span>
            <span className="mt-4 text-sm font-bold text-lifitseg-green">Ler o guia <span aria-hidden="true">→</span></span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
