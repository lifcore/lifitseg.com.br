'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export type FaqItem = {
  q: string
  a: string
}

type FaqAccordionProps = {
  items: FaqItem[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx
        return (
          <div key={item.q} className="bg-white rounded-2xl border border-[#05191b]/10 overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-sm font-bold text-[#05191b]">{item.q}</span>
              <ChevronDown
                className={`w-5 h-5 text-[#E0A63D] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5">
                <p className="text-sm text-[#05191b]/60 leading-relaxed">{item.a}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
