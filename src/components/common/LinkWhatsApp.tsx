'use client'

import { siteConfig } from '@/config/site'
import { registrarEvento } from '@/utils/eventos'

/** Link oficial do WhatsApp (siteConfig). Conta o clique como intenção, não como conversa. */
export function LinkWhatsApp({ rotulo, className, children }: { rotulo: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      href={`https://wa.me/${siteConfig.contato.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => registrarEvento('whatsapp_click', rotulo)}
      className={className}
    >
      {children}
    </a>
  )
}
