'use client'

import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { abrirPreferencias } from '@/utils/consentimento'
import { SocialLinks } from '@/components/common/SocialLinks'
import { LinkWhatsApp } from '@/components/common/LinkWhatsApp'

// Rodapé do visual premium (prévia S-09): petróleo profundo, logo B1 oficial, dados institucionais do siteConfig
// (fonte única), navegação completa, redes e acesso real às preferências de cookies (D-30).
const NAVEGACAO = [
  { label: 'Plano empresarial', href: '/beneficios-corporativos' },
  { label: 'Seguros corporativos', href: '/seguros-corporativos' },
  { label: 'Seguros pessoais', href: '/seguros-pessoais' },
  { label: 'Referências em saúde', href: '/referencias-saude' },
  { label: 'Guias', href: '/conhecimento' },
  { label: 'A Lifitseg', href: '/sobre-e-conhecimento#sobre' },
  { label: 'Faça parte', href: '/sobre-e-conhecimento#trabalhe-conosco' },
  { label: 'Comece por aqui', href: '/links' },
]

export function Footer() {
  const { contato, endereco, juridico } = siteConfig
  return (
    <div className="pm">
    <footer className="rodape">
      <div className="wrap">
        <div className="rodape-grid pm-rodape-grid">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/marca/Lifitseg_logo_transparente_para_escuro.svg" alt={siteConfig.nome} width={170} height={44} />
            <div>Consultoria na contratação. Parceria na gestão.</div>
            <div className="pm-redes"><SocialLinks /></div>
          </div>
          <nav aria-label="Rodapé">
            <b>Navegação</b>
            <ul className="pm-rodape-nav">
              {NAVEGACAO.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}
            </ul>
          </nav>
          <div>
            <b>Atendimento</b>
            <LinkWhatsApp rotulo="rodape">WhatsApp {contato.whatsappExibicao}</LinkWhatsApp>
            <br />
            <a href={`mailto:${contato.email}`}>{contato.email}</a>
            <br />
            {contato.horario}
          </div>
          <div>
            <b>Endereço</b>
            {endereco.linha1.replace(' - ', ' · ')}
            <br />
            {endereco.bairro} · {endereco.cidade}/{endereco.uf}
            <br />
            CEP {endereco.cep}
          </div>
        </div>
        <div className="legal pm-legal">
          <span>
            © {new Date().getFullYear()} {juridico.razaoSocial} · CNPJ {juridico.cnpj} · SUSEP {juridico.registroSusep}
          </span>
          <span className="pm-legal-links">
            <Link href="/privacidade">Política de Privacidade</Link>
            <button type="button" onClick={abrirPreferencias}>Preferências de cookies</button>
          </span>
        </div>
      </div>
    </footer>
    </div>
  )
}
