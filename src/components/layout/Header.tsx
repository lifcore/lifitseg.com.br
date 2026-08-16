'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NAV_SOLUCOES, NAV_INSTITUCIONAL, NAV_REFERENCIAS_SAUDE } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { LeadModal } from '@/components/forms/LeadModal'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [solucoesAberto, setSolucoesAberto] = useState(false)
  const [referenciasSaudeAberto, setReferenciasSaudeAberto] = useState(false)
  const [modalAberto, setModalAberto] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-primary/20 bg-lifitseg-dark/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="group flex items-center">
            <div className="relative flex items-center transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt={siteConfig.nome}
                width={180}
                height={56}
                className="h-14 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 text-sm font-medium text-lifitseg-offwhite/80 lg:flex">
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>

            {/* Mega Menu de Soluções */}
            <div
              className="relative py-2"
              onMouseEnter={() => setSolucoesAberto(true)}
              onMouseLeave={() => setSolucoesAberto(false)}
            >
              <button className="flex items-center gap-1.5 transition-colors hover:text-primary focus:outline-none">
                <span>Soluções</span>
                <svg
                  className={`h-4 w-4 transition-transform ${solucoesAberto ? 'rotate-180 text-primary' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {solucoesAberto && (
                <div className="absolute top-full left-1/2 mt-1 grid w-80 -translate-x-1/2 gap-2 rounded-2xl border border-primary/30 bg-lifitseg-dark p-4 shadow-2xl">
                  {NAV_SOLUCOES.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl p-3 transition-colors hover:bg-lifitseg-surface"
                    >
                      <p className="text-sm font-bold text-lifitseg-offwhite">{item.label}</p>
                      {item.descricao && (
                        <p className="mt-0.5 text-xs text-lifitseg-offwhite/60">{item.descricao}</p>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mega Menu de Referências em Saúde */}
            <div
              className="relative py-2"
              onMouseEnter={() => setReferenciasSaudeAberto(true)}
              onMouseLeave={() => setReferenciasSaudeAberto(false)}
            >
              <Link href="/referencias-saude" className="flex items-center gap-1.5 transition-colors hover:text-primary focus:outline-none">
                <span>Referências em Saúde</span>
                <svg
                  className={`h-4 w-4 transition-transform ${referenciasSaudeAberto ? 'rotate-180 text-primary' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {referenciasSaudeAberto && (
                <div className="absolute top-full left-1/2 mt-1 grid w-80 -translate-x-1/2 gap-2 rounded-2xl border border-primary/30 bg-lifitseg-dark p-4 shadow-2xl">
                  {NAV_REFERENCIAS_SAUDE.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl p-3 transition-colors hover:bg-lifitseg-surface"
                    >
                      <p className="text-sm font-bold text-lifitseg-offwhite">{item.label}</p>
                      {item.descricao && (
                        <p className="mt-0.5 text-xs text-lifitseg-offwhite/60">{item.descricao}</p>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {NAV_INSTITUCIONAL.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-primary">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={`https://wa.me/${siteConfig.contato.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-lifitseg-offwhite transition-colors hover:bg-white/5"
            >
              WhatsApp
            </a>
            <button
              onClick={() => setModalAberto(true)}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-lifitseg-dark shadow-md transition-all active:scale-95 hover:opacity-90"
            >
              Falar com Consultor
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg bg-lifitseg-surface p-2 text-lifitseg-offwhite focus:outline-none lg:hidden"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="space-y-3 border-b border-primary/20 bg-lifitseg-dark px-4 pt-2 pb-6 lg:hidden">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-medium text-lifitseg-offwhite">
            Home
          </Link>

          <div className="space-y-2 border-l-2 border-primary/40 py-2 pl-4">
            <p className="text-xs font-bold text-primary uppercase">Soluções</p>
            {NAV_SOLUCOES.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 text-sm text-lifitseg-offwhite/80"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="space-y-2 border-l-2 border-primary/40 py-2 pl-4">
            <p className="text-xs font-bold text-primary uppercase">Referências em Saúde</p>
            {NAV_REFERENCIAS_SAUDE.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 text-sm text-lifitseg-offwhite/80"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {NAV_INSTITUCIONAL.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-medium text-lifitseg-offwhite"
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false)
              setModalAberto(true)
            }}
            className="mt-2 w-full rounded-xl bg-primary py-3 text-center font-bold text-lifitseg-dark transition-colors hover:opacity-90"
          >
            Falar com Consultor
          </button>
        </div>
      )}

      <LeadModal isOpen={modalAberto} onClose={() => setModalAberto(false)} origem="header" />
    </header>
  )
}