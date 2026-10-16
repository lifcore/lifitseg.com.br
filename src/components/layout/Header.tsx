'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NAV_SOLUCOES, NAV_REFERENCIAS_SAUDE, type ItemNavegacao } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { registrarEvento } from '@/utils/eventos'

// Home v3 (Chief Chat, M-21): logo B1 ampliado, navegação curta e um CTA.
// Todas as rotas existentes continuam acessíveis (Outras soluções e
// Referências em Saúde mantêm seus submenus).
const OUTRAS_SOLUCOES = NAV_SOLUCOES.filter((i) => i.href !== '/beneficios-corporativos')

function Submenu({ rotulo, itens, href }: { rotulo: string; itens: ItemNavegacao[]; href?: string }) {
  const [aberto, setAberto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function fora(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setAberto(false)
    }
    document.addEventListener('mousedown', fora)
    return () => document.removeEventListener('mousedown', fora)
  }, [])

  return (
    <div ref={ref} className="relative py-2" onMouseEnter={() => setAberto(true)} onMouseLeave={() => setAberto(false)} onKeyDown={(e) => e.key === 'Escape' && setAberto(false)}>
      <button type="button" aria-expanded={aberto} onClick={() => setAberto((a) => !a)} className="flex items-center gap-1.5 transition-colors hover:text-lifitseg-mint focus-visible:text-lifitseg-mint">
        {rotulo}
        <svg aria-hidden="true" className={`h-4 w-4 transition-transform ${aberto ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {aberto && (
        <div className="absolute top-full left-1/2 z-50 mt-1 grid w-80 -translate-x-1/2 gap-1 rounded-2xl border border-white/10 bg-lifitseg-dark p-3 shadow-2xl">
          {href && (
            <Link href={href} className="block rounded-xl p-3 text-sm font-semibold text-lifitseg-offwhite hover:bg-lifitseg-surface">
              Ver tudo
            </Link>
          )}
          {itens.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-xl p-3 hover:bg-lifitseg-surface">
              <p className="text-sm font-semibold text-lifitseg-offwhite">{item.label}</p>
              {item.descricao && <p className="mt-0.5 text-xs text-lifitseg-offwhite/60">{item.descricao}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const fechar = () => setMenuAberto(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-lifitseg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link href="/" aria-label={`${siteConfig.nome} — página inicial`} className="shrink-0">
            <Image src="/marca/Lifitseg_logo_compacto_escuro.svg" alt={siteConfig.nome} width={190} height={45} className="h-11 w-auto" priority />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-7 text-sm font-medium text-lifitseg-offwhite/85 lg:flex">
            <Link href="/beneficios-corporativos" className="transition-colors hover:text-lifitseg-mint">Plano empresarial</Link>
            <Link href="/#como-atuamos" className="transition-colors hover:text-lifitseg-mint">Como atuamos</Link>
            <Submenu rotulo="Outras soluções" itens={OUTRAS_SOLUCOES} />
            <Submenu rotulo="Referências em saúde" itens={NAV_REFERENCIAS_SAUDE} href="/referencias-saude" />
            <Link href="/sobre-e-conhecimento#sobre" className="transition-colors hover:text-lifitseg-mint">A Lifitseg</Link>
          </nav>

          <Link
            href="/#contato"
            onClick={() => registrarEvento('cta_click', 'header-fale-com-a-lifitseg')}
            className="hidden rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-lifitseg-dark transition-opacity hover:opacity-90 lg:inline-block"
          >
            Fale com a Lifitseg
          </Link>

          <button
            type="button"
            onClick={() => setMenuAberto((a) => !a)}
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            className="rounded-lg p-2 text-lifitseg-offwhite lg:hidden"
          >
            <span className="sr-only">{menuAberto ? 'Fechar menu' : 'Abrir menu'}</span>
            <span aria-hidden="true" className="text-sm font-semibold">{menuAberto ? 'Fechar' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {menuAberto && (
        <nav id="menu-mobile" aria-label="Principal" className="space-y-1 border-t border-white/10 bg-lifitseg-dark px-4 pt-3 pb-6 text-lifitseg-offwhite lg:hidden">
          <Link href="/beneficios-corporativos" onClick={fechar} className="block py-2 font-medium">Plano empresarial</Link>
          <Link href="/#como-atuamos" onClick={fechar} className="block py-2 font-medium">Como atuamos</Link>
          <p className="pt-3 text-xs font-bold tracking-wide text-lifitseg-mint uppercase">Outras soluções</p>
          {OUTRAS_SOLUCOES.map((i) => <Link key={i.href} href={i.href} onClick={fechar} className="block py-1.5 pl-3 text-sm text-lifitseg-offwhite/80">{i.label}</Link>)}
          <p className="pt-3 text-xs font-bold tracking-wide text-lifitseg-mint uppercase">Referências em saúde</p>
          {NAV_REFERENCIAS_SAUDE.map((i) => <Link key={i.href} href={i.href} onClick={fechar} className="block py-1.5 pl-3 text-sm text-lifitseg-offwhite/80">{i.label}</Link>)}
          <Link href="/sobre-e-conhecimento#sobre" onClick={fechar} className="block py-2 pt-3 font-medium">A Lifitseg</Link>
          <Link
            href="/#contato"
            onClick={() => { fechar(); registrarEvento('cta_click', 'menu-fale-com-a-lifitseg') }}
            className="mt-3 block rounded-xl bg-primary py-3 text-center font-bold text-lifitseg-dark"
          >
            Fale com a Lifitseg
          </Link>
        </nav>
      )}
    </header>
  )
}
