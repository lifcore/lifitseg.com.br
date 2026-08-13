'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/config/site'
import { NAV_SOLUCOES, NAV_INSTITUCIONAL } from '@/config/navigation'

function whatsappLink(mensagem: string) {
  return `https://wa.me/${siteConfig.contato.whatsapp}?text=${encodeURIComponent(mensagem)}`
}

export function Header() {
  const [solucoesOpen, setSolucoesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-lifitseg-dark text-lifitseg-offwhite">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
          <Image src="/logo.png" alt={siteConfig.nome} width={140} height={40} className="h-9 w-auto" priority />
        </Link>

        {/* NAVEGAÇÃO PRINCIPAL — DESKTOP */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-lifitseg-offwhite/80 transition-colors hover:text-primary">
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setSolucoesOpen(true)}
            onMouseLeave={() => setSolucoesOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-lifitseg-offwhite/80 transition-colors hover:text-primary">
              Soluções
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {solucoesOpen && (
              <div className="absolute top-full left-1/2 w-80 -translate-x-1/2 pt-3">
                <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">
                  {NAV_SOLUCOES.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block border-b border-black/5 px-5 py-4 transition-colors last:border-b-0 hover:bg-lifitseg-offwhite"
                    >
                      <p className="text-sm font-bold text-lifitseg-dark">{item.label}</p>
                      {item.descricao && (
                        <p className="mt-0.5 text-xs text-lifitseg-dark/60">{item.descricao}</p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {NAV_INSTITUCIONAL.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-lifitseg-offwhite/80 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* AÇÕES — DESKTOP */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={whatsappLink('Olá, gostaria de falar com um especialista da LifitSeg.')}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-lifitseg-offwhite/80 transition-colors hover:border-primary/40 hover:text-primary"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.84 14.1c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.61-.6-2.85-1.23-4.7-4.1-4.84-4.29-.14-.19-1.16-1.54-1.16-2.94s.72-2.09.98-2.37c.25-.28.55-.35.73-.35h.53c.17 0 .4-.06.62.48.24.55.8 1.9.87 2.04.07.14.12.3.02.49-.09.19-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.29.28-.12.55.17.28.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.33 1.44.28.14.44.12.61-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.63-.14.26.09 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.16 1.36z" />
            </svg>
          </a>
          <a
            href={whatsappLink('Olá, gostaria de falar com um especialista da LifitSeg.')}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-lifitseg-dark shadow-md transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            Falar com um Especialista
          </a>
        </div>

        {/* BOTÃO HAMBÚRGUER — MOBILE */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`block h-0.5 w-6 bg-lifitseg-offwhite transition-transform duration-200 ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-lifitseg-offwhite transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-lifitseg-offwhite transition-transform duration-200 ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* MENU MOBILE */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-lifitseg-dark-deep px-4 py-6 md:hidden">
          <nav className="flex flex-col gap-1">
            <Link href="/" onClick={() => setMobileOpen(false)} className="py-2.5 text-sm font-medium text-lifitseg-offwhite/90">
              Home
            </Link>

            <p className="mt-3 mb-1 text-xs font-bold tracking-wider text-primary uppercase">Soluções</p>
            {NAV_SOLUCOES.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 pl-3 text-sm font-medium text-lifitseg-offwhite/90 border-b border-white/5 last:border-b-0"
              >
                {item.label}
              </Link>
            ))}

            <p className="mt-4 mb-1 text-xs font-bold tracking-wider text-primary uppercase">Institucional</p>
            {NAV_INSTITUCIONAL.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 pl-3 text-sm font-medium text-lifitseg-offwhite/90 border-b border-white/5 last:border-b-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={whatsappLink('Olá, gostaria de falar com um especialista da LifitSeg.')}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-6 block rounded-xl bg-primary px-6 py-3.5 text-center text-sm font-semibold text-lifitseg-dark shadow-md"
          >
            Falar com um Especialista
          </a>
        </div>
      )}
    </header>
  )
}
