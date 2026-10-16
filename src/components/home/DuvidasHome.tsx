'use client'

import { useId, useState } from 'react'

export type Duvida = { q: string; a: string; fonte?: { rotulo: string; url: string } }

// Accordion acessível (home v3 e página de benefícios): botão com
// aria-expanded e região associada; várias podem ficar abertas.
export function DuvidasHome({ itens }: { itens: Duvida[] }) {
  const [abertas, setAbertas] = useState<number[]>([])
  const id = useId()

  return (
    <div className="divide-y divide-lifitseg-line border-y border-lifitseg-line">
      {itens.map((d, i) => {
        const aberta = abertas.includes(i)
        return (
          <div key={d.q}>
            <h3 style={{ fontSize: '1rem', fontWeight: 500 }}>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={aberta}
                aria-controls={`${id}-r${i}`}
                onClick={() => setAbertas((a) => (aberta ? a.filter((x) => x !== i) : [...a, i]))}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-base text-lifitseg-dark"
              >
                {d.q}
                <span aria-hidden="true" className="text-xl text-lifitseg-green">{aberta ? '−' : '+'}</span>
              </button>
            </h3>
            {aberta && (
              <div id={`${id}-r${i}`} role="region" aria-labelledby={`${id}-q${i}`} className="pb-5">
                <p className="max-w-3xl text-sm text-lifitseg-text-soft">{d.a}</p>
                {d.fonte && (
                  <p className="mt-2 text-xs">
                    Fonte:{' '}
                    <a href={d.fonte.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-lifitseg-green underline underline-offset-2">
                      {d.fonte.rotulo}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
