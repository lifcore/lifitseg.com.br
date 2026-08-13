import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/config/site'
import { NAV_SOLUCOES, NAV_INSTITUCIONAL } from '@/config/navigation'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-lifitseg-dark-deep text-lifitseg-offwhite">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <Image src="/logo.png" alt={siteConfig.nome} width={313} height={88} className="mb-4 h-[88px] w-auto" />
            <p className="text-sm leading-relaxed text-lifitseg-offwhite/60">
              Consultoria e Arquitetura de Riscos Corporativos. Transição da corretagem tradicional
              para a governança de alta autoridade.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">
              Soluções Corporativas
            </h4>
            <ul className="space-y-2.5">
              {NAV_SOLUCOES.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-lifitseg-offwhite/70 transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">
              Institucional
            </h4>
            <ul className="space-y-2.5">
              {NAV_INSTITUCIONAL.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-lifitseg-offwhite/70 transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#metodo" className="text-sm text-lifitseg-offwhite/70 transition-colors hover:text-primary">
                  Método de Trabalho
                </Link>
              </li>
              <li>
                <Link href="/#strategy" className="text-sm text-lifitseg-offwhite/70 transition-colors hover:text-primary">
                  Strategy Business
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">
              Contato &amp; Governança
            </h4>
            <p className="mb-3 text-sm text-lifitseg-offwhite/70">Atendimento Corporativo Nacional</p>
            <ul className="space-y-2 text-sm text-lifitseg-offwhite/70">
              <li>
                <a href={`mailto:${siteConfig.contato.email}`} className="transition-colors hover:text-primary">
                  {siteConfig.contato.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.contato.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  WhatsApp: {siteConfig.contato.whatsappExibicao}
                </a>
              </li>
              <li>{siteConfig.endereco.completo}</li>
              <li className="pt-1 text-xs text-lifitseg-offwhite/50">
                SUSEP {siteConfig.juridico.registroSusep}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-lifitseg-offwhite/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.nomeCompleto}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacidade" className="transition-colors hover:text-primary">
              Política de Privacidade
            </Link>
            <span>CNPJ {siteConfig.juridico.cnpj}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
