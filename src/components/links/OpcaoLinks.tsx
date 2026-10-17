'use client'

import Link from 'next/link'
import { registrarEvento } from '@/utils/eventos'

// Opção do menu /links. Usa os eventos que o site já tem: whatsapp_click para
// o WhatsApp e cta_click para os caminhos internos, com rótulo links-<opção>.
// Nada novo vai para pixel: o registro segue o consentimento (eventos.ts).
export function OpcaoLinks({ href, rotulo, className, children }: { href: string; rotulo: string; className?: string; children: React.ReactNode }) {
  const whatsapp = href.startsWith('https://wa.me/')
  if (whatsapp) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={() => registrarEvento('whatsapp_click', rotulo)}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className} onClick={() => registrarEvento('cta_click', rotulo)}>
      {children}
    </Link>
  )
}
