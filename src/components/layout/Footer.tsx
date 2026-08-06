import Link from 'next/link'
import { NAV_SOLUCOES, NAV_INSTITUCIONAL } from '@/config/navigation'
import { siteConfig } from '@/config/site'

export function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer className="border-t border-primary/20 bg-lifitseg-dark-deep py-16 text-xs text-lifitseg-offwhite/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-lifitseg-dark">
                L
              </div>
              <span className="text-lg font-black tracking-wider text-lifitseg-offwhite">
                {siteConfig.nome.toUpperCase()}
              </span>
            </div>
            <p className="leading-relaxed text-lifitseg-offwhite/60">
              Consultoria e Arquitetura de Riscos Corporativos. Transição da corretagem tradicional
              para a governança de alta autoridade.
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold text-lifitseg-offwhite">Soluções Corporativas</p>
            <ul className="space-y-2.5">
              {NAV_SOLUCOES.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold text-lifitseg-offwhite">Institucional</p>
            <ul className="space-y-2.5">
              {NAV_INSTITUCIONAL.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#metodo" className="transition-colors hover:text-primary">
                  Método de Trabalho
                </Link>
              </li>
              <li>
                <Link href="/#strategy" className="transition-colors hover:text-primary">
                  Strategy Business
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold text-lifitseg-offwhite">Contato &amp; Governança</p>
            <p className="mb-2">Atendimento Corporativo Nacional</p>
            <p className="mb-1 font-semibold text-lifitseg-offwhite">{siteConfig.contato.email}</p>
            <p className="mb-4">WhatsApp: {siteConfig.contato.whatsappExibicao}</p>
            <p className="mb-4 leading-relaxed">{siteConfig.endereco.completo}</p>
            <span className="inline-block rounded border border-primary/30 bg-lifitseg-surface px-3 py-1 font-mono text-[10px] text-primary">
              SUSEP {siteConfig.juridico.registroSusep}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-lifitseg-offwhite/50 sm:flex-row">
          <p>
            © {ano} {siteConfig.nomeCompleto}. Todos os direitos reservados.
          </p>
          <p className="font-mono text-[10px]">CNPJ {siteConfig.juridico.cnpj}</p>
        </div>
      </div>
    </footer>
  )
}
