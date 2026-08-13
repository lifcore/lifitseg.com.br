'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export type FaqItem = {
  q: string
  a: string
}

type FaqAccordionProps = {
  items: FaqItem[]
  /** Índice da pergunta que já vem aberta ao carregar a página.
   *  Use `null` para começar tudo fechado. Padrão: 0 (primeira pergunta aberta),
   *  conforme REV-SITE-001 §20. */
  defaultOpenIndex?: number | null
}

export function FaqAccordion({ items, defaultOpenIndex = 0 }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex)

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx
        return (
          <div key={item.q} className="bg-white rounded-2xl border border-lifitseg-dark/10 overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-sm font-bold text-lifitseg-dark">{item.q}</span>
              <ChevronDown
                className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5">
                <p className="text-sm text-lifitseg-dark/60 leading-relaxed">{item.a}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
