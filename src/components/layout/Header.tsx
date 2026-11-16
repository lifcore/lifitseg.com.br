'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_SOLUCOES, NAV_REFERENCIAS_SAUDE, type ItemNavegacao } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { registrarEvento } from '@/utils/eventos'

// Cabeçalho do visual premium (prévia S-09, aprovada por Raphael em 15/11/2026): logo B1 oficial sobre uma placa
// de degradê discreto (o degradê fica na placa, nunca no símbolo), navegação curta e uma chamada. Todas as rotas
// continuam acessíveis: Outras soluções e Referências em saúde mantêm os submenus.
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
    <div ref={ref} className="pm-sub" onMouseEnter={() => setAberto(true)} onMouseLeave={() => setAberto(false)} onKeyDown={(e) => e.key === 'Escape' && setAberto(false)}>
      <button type="button" aria-expanded={aberto} onClick={() => setAberto((a) => !a)} className="pm-sub-botao">
        {rotulo}
        <svg aria-hidden="true" className={aberto ? 'pm-girado' : undefined} width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {aberto && (
        <div className="pm-sub-painel">
          {href && <Link href={href} className="pm-sub-item"><b>Ver tudo</b></Link>}
          {itens.map((item) => (
            <Link key={item.href} href={item.href} className="pm-sub-item">
              <b>{item.label}</b>
              {item.descricao && <span>{item.descricao}</span>}
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
  const caminho = usePathname()
  const atual = (href: string) => (caminho === href ? 'page' : undefined)

  return (
    <header className="pm pm-topo">
      <div className="wrap nav">
        <Link href="/" aria-label={`${siteConfig.nome}, página inicial`} className="logo">
          {/* SVG B1 oficial para fundo escuro, sem alteração de desenho ou cor. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/marca/Lifitseg_logo_transparente_para_escuro.svg" alt={`${siteConfig.nome} — Inteligência em Saúde e Seguros`} width={192} height={50} />
        </Link>

        <nav aria-label="Principal" className="navlinks">
          <Link href="/beneficios-corporativos" aria-current={atual('/beneficios-corporativos')}>Plano empresarial</Link>
          <Link href="/#como-atuamos">Como atuamos</Link>
          <Submenu rotulo="Outras soluções" itens={OUTRAS_SOLUCOES} />
          <Submenu rotulo="Referências em saúde" itens={NAV_REFERENCIAS_SAUDE} href="/referencias-saude" />
          <Link href="/sobre-e-conhecimento#sobre">A Lifitseg</Link>
        </nav>

        <Link href="/#contato" className="navcta" onClick={() => registrarEvento('cta_click', 'header-vamos-conversar')}>
          Vamos conversar <span aria-hidden="true">↗</span>
        </Link>

        <button type="button" className="menu" onClick={() => setMenuAberto((a) => !a)} aria-expanded={menuAberto} aria-controls="menu-celular">
          <span className="sr-only">{menuAberto ? 'Fechar menu' : 'Abrir menu'}</span>
          <span aria-hidden="true">{menuAberto ? 'Fechar ✕' : 'Menu ☰'}</span>
        </button>
      </div>

      {menuAberto && (
        <nav id="menu-celular" aria-label="Principal" className="pm-menu-celular">
          <div className="wrap">
            <Link href="/beneficios-corporativos" onClick={fechar} className="pm-mc-link">Plano empresarial</Link>
            <Link href="/#como-atuamos" onClick={fechar} className="pm-mc-link">Como atuamos</Link>
            <p className="pm-mc-grupo">Outras soluções</p>
            {OUTRAS_SOLUCOES.map((i) => <Link key={i.href} href={i.href} onClick={fechar} className="pm-mc-sub">{i.label}</Link>)}
            <p className="pm-mc-grupo">Referências em saúde</p>
            {NAV_REFERENCIAS_SAUDE.map((i) => <Link key={i.href} href={i.href} onClick={fechar} className="pm-mc-sub">{i.label}</Link>)}
            <Link href="/sobre-e-conhecimento#sobre" onClick={fechar} className="pm-mc-link">A Lifitseg</Link>
            <Link href="/#contato" onClick={() => { fechar(); registrarEvento('cta_click', 'menu-vamos-conversar') }} className="primary pm-mc-cta">
              Vamos conversar <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
