'use client'

import { linkWhatsApp } from '@/utils/whatsapp'
import { registrarEvento } from '@/utils/eventos'

/** Link oficial do WhatsApp, com a mensagem pronta e neutra (utils/whatsapp). Conta o clique como intenção, não como conversa. */
export function LinkWhatsApp({ rotulo, className, children, mensagem }: { rotulo: string; className?: string; children: React.ReactNode; mensagem?: string }) {
  return (
    <a
      href={linkWhatsApp(mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => registrarEvento('whatsapp_click', rotulo)}
      className={className}
    >
      {children}
    </a>
  )
}
