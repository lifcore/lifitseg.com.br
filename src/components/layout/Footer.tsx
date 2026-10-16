'use client'

import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/config/site'
import { abrirPreferencias } from '@/utils/consentimento'
import { registrarEvento } from '@/utils/eventos'

// Rodapé da home v3 (Chief Chat, M-21): logo B1, descrição curta,
// navegação, dados institucionais do siteConfig (fonte única), redes e
// acesso real às preferências de cookies (D-30).
const NAVEGACAO = [
  { label: 'Plano empresarial', href: '/beneficios-corporativos' },
  { label: 'Guias', href: '/conhecimento' },
  { label: 'Seguros corporativos', href: '/seguros-corporativos' },
  { label: 'Seguros pessoais', href: '/seguros-pessoais' },
  { label: 'Referências em saúde', href: '/referencias-saude' },
  { label: 'A Lifitseg', href: '/sobre-e-conhecimento#sobre' },
  { label: 'Faça parte', href: '/sobre-e-conhecimento#trabalhe-conosco' },
  { label: 'Contato', href: '/#contato' },
]

const REDES = [
  { label: 'Instagram', href: siteConfig.redesSociais.instagram },
  { label: 'LinkedIn', href: siteConfig.redesSociais.linkedin },
  { label: 'Facebook', href: siteConfig.redesSociais.facebook },
].filter((r) => r.href)

export function Footer() {
  return (
    <footer className="bg-lifitseg-dark text-lifitseg-offwhite">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image src="/marca/Lifitseg_logo_compacto_escuro.svg" alt={siteConfig.nome} width={190} height={45} className="h-11 w-auto" />
            <p className="mt-4 max-w-sm text-sm text-lifitseg-offwhite/70">Consultoria em benefícios e seguros.</p>
            {REDES.length > 0 && (
              <ul className="mt-6 flex gap-4 text-sm">
                {REDES.map((r) => (
                  <li key={r.label}>
                    <a href={r.href} target="_blank" rel="noopener noreferrer" className="text-lifitseg-offwhite/80 underline-offset-4 hover:text-lifitseg-mint hover:underline">
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Rodapé">
            <ul className="space-y-2.5 text-sm">
              {NAVEGACAO.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-lifitseg-offwhite/75 transition-colors hover:text-lifitseg-mint">{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-2 text-sm text-lifitseg-offwhite/75">
            <p>
              <a href={`mailto:${siteConfig.contato.email}`} className="hover:text-lifitseg-mint">{siteConfig.contato.email}</a>
            </p>
            <p>
              <a
                href={`https://wa.me/${siteConfig.contato.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => registrarEvento('whatsapp_click', 'rodape')}
                className="hover:text-lifitseg-mint"
              >
                WhatsApp {siteConfig.contato.whatsappExibicao}
              </a>
            </p>
            <p>{siteConfig.endereco.completo}</p>
            <p>{siteConfig.contato.horario}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-lifitseg-offwhite/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.nomeCompleto} · CNPJ {siteConfig.juridico.cnpj} · SUSEP {siteConfig.juridico.registroSusep}
          </p>
          <div className="flex gap-5">
            <Link href="/privacidade" className="hover:text-lifitseg-mint">Política de Privacidade</Link>
            <button type="button" onClick={abrirPreferencias} className="hover:text-lifitseg-mint">Alterar preferências de privacidade</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
