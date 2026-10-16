'use client'

import { registrarEvento } from '@/utils/eventos'
import { EVENTO_SELECIONAR_FAIXA } from '@/components/forms/FormularioEmpresarial'
import { FAIXAS_DETALHE } from '@/content/atuacao'

// Três cenários empresariais (D-29, redação da etapa 2 do Chat). O link leva
// ao formulário com a faixa já marcada e conta o clique (com consentimento).
// Faixas comerciais não representam regimes regulatórios completos.
export function CardsFaixas() {
  function escolher(valor: string) {
    registrarEvento('cta_click', `faixa-${valor}`)
    window.dispatchEvent(new CustomEvent(EVENTO_SELECIONAR_FAIXA, { detail: valor }))
  }

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {FAIXAS_DETALHE.map((f) => (
        <article key={f.valor} className="flex flex-col rounded-2xl border border-lifitseg-line bg-lifitseg-paper p-6">
          <span aria-hidden="true" className="mb-4 h-0.5 w-8 bg-lifitseg-green" />
          <p className="text-xs font-bold tracking-wide text-lifitseg-green uppercase">{f.segmento}</p>
          <h3 className="mt-2 text-2xl font-bold text-lifitseg-dark">{f.titulo}</h3>
          <p className="mt-1 text-sm font-semibold text-lifitseg-dark">{f.subtitulo}</p>
          <p className="mt-3 flex-1 text-sm text-lifitseg-text-soft">{f.texto}</p>
          <a href="#contato" onClick={() => escolher(f.valor)} className="mt-5 text-sm font-bold text-lifitseg-green hover:underline">
            {f.cta} <span aria-hidden="true">→</span>
          </a>
        </article>
      ))}
    </div>
  )
}
