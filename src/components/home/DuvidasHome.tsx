'use client'

import { useId, useState } from 'react'

// Redação da home v3 (Chief Chat). Accordion acessível: botão com
// aria-expanded e região associada; vários podem ficar abertos.
const DUVIDAS = [
  {
    q: 'Minha empresa ainda não tem plano. Podemos conversar?',
    a: 'Sim. Podemos começar pela primeira contratação ou pela revisão de um benefício existente. Produtos e condições disponíveis são conferidos conforme o cenário da empresa.',
  },
  {
    q: 'Como saber quais alternativas considerar?',
    a: 'Município, quantidade aproximada de vidas, objetivos e critérios de contratação ajudam a orientar a análise. A avaliação comercial confirma os requisitos de cada produto.',
  },
  {
    q: 'A Lifitseg trabalha com uma única operadora?',
    a: 'O foco da Lifitseg é o conhecimento técnico para orientar a decisão empresarial. As alternativas disponíveis são apresentadas conforme o perfil da empresa e o portfólio comercial confirmado.',
  },
  {
    q: 'Preciso enviar informações de saúde no primeiro contato?',
    a: 'Não. O formulário inicial trata do cenário empresarial e dos dados de contato. Não envie diagnósticos, exames ou histórico médico nesse canal.',
  },
  {
    q: 'A gestão está incluída em toda contratação?',
    a: 'O escopo de acompanhamento deve ser confirmado na proposta de atendimento. A equipe explica quais serviços se aplicam à sua empresa antes da contratação.',
  },
]

export function DuvidasHome() {
  const [abertas, setAbertas] = useState<number[]>([])
  const id = useId()

  return (
    <div className="divide-y divide-lifitseg-line border-y border-lifitseg-line">
      {DUVIDAS.map((d, i) => {
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
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
