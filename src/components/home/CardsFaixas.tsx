'use client'

import { registrarEvento } from '@/utils/eventos'
import { EVENTO_SELECIONAR_FAIXA } from '@/components/forms/FormularioEmpresarial'

// Home v3: três caminhos por porte (D-29). O link leva ao formulário com a
// faixa já marcada e conta o clique (com consentimento de medição).
const FAIXAS = [
  { valor: '2-29', segmento: 'PME', titulo: '2 a 29 vidas', texto: 'Entenda alternativas e condições para contratar ou rever o plano.', cta: 'Conhecer as possibilidades' },
  { valor: '30-99', segmento: 'PME', titulo: '30 a 99 vidas', texto: 'Organize a comparação de propostas entre RH, financeiro e direção.', cta: 'Organizar minha avaliação' },
  { valor: '100+', segmento: 'PJ / Corporativo', titulo: '100+ vidas', texto: 'Converse sobre planejamento e necessidades da sua operação.', cta: 'Conversar sobre a operação' },
]

export function CardsFaixas() {
  function escolher(valor: string) {
    registrarEvento('cta_click', `faixa-${valor}`)
    window.dispatchEvent(new CustomEvent(EVENTO_SELECIONAR_FAIXA, { detail: valor }))
  }

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {FAIXAS.map((f) => (
        <article key={f.valor} className="flex flex-col rounded-2xl border border-lifitseg-line bg-lifitseg-paper p-6">
          <span aria-hidden="true" className="mb-4 h-0.5 w-8 bg-lifitseg-green" />
          <p className="text-xs font-bold tracking-wide text-lifitseg-green uppercase">{f.segmento}</p>
          <h3 className="mt-2 text-2xl font-bold text-lifitseg-dark">{f.titulo}</h3>
          <p className="mt-3 flex-1 text-sm text-lifitseg-text-soft">{f.texto}</p>
          <a href="#contato" onClick={() => escolher(f.valor)} className="mt-5 text-sm font-bold text-lifitseg-green hover:underline">
            {f.cta} <span aria-hidden="true">→</span>
          </a>
        </article>
      ))}
    </div>
  )
}
