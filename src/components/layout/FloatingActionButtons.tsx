'use client'

import { LinkWhatsApp } from '@/components/common/LinkWhatsApp'

// WhatsApp fixo do visual premium (prévia S-09): pílula com o rótulo escrito, para quem não reconhece só o ícone.
// No celular, sobe quando o aviso de cookies está aberto (html[data-aviso-cookies], ver premium.css), para não
// cobrir os botões Recusar e Aceitar.
export function FloatingActionButtons() {
  return (
    <div className="pm">
      <LinkWhatsApp rotulo="botao-flutuante" className="wa-fixo pm-wa-fixo">
        <i aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
          </svg>
        </i>
        Conversar no WhatsApp
      </LinkWhatsApp>
    </div>
  )
}
