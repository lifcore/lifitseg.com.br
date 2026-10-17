import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Building2, HeartHandshake, ShieldCheck, BookOpen, MessageCircle, Headphones } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { SocialLinks } from '@/components/common/SocialLinks'

export const metadata: Metadata = {
  title: 'Comece por aqui',
  description: 'Encontre o caminho para saúde empresarial, seguros, atendimento e conteúdos da Lifitseg.',
  alternates: { canonical: '/links' },
  openGraph: { title: 'Lifitseg · Comece por aqui', description: 'Saúde e seguros, com orientação para cada decisão.', url: '/links' },
}

const whatsapp = `https://wa.me/${siteConfig.contato.whatsapp}`
const paths = [
  { title: 'Saúde para minha empresa', detail: 'Contratação e gestão do benefício.', href: '/beneficios-corporativos', Icon: HeartHandshake },
  { title: 'Seguros para minha empresa', detail: 'Proteção alinhada ao contexto da operação.', href: '/seguros-corporativos', Icon: Building2 },
  { title: 'Seguros para mim e minha família', detail: 'Conheça as soluções para cada momento.', href: '/seguros-pessoais', Icon: ShieldCheck },
  { title: 'Já sou cliente', detail: 'Preciso de atendimento da Lifitseg.', href: whatsapp, Icon: Headphones },
  { title: 'Quero falar com a Lifitseg', detail: 'Uma conversa para entender sua necessidade.', href: whatsapp, Icon: MessageCircle },
  { title: 'Guias para decidir melhor', detail: 'Conhecimento para orientar suas escolhas.', href: '/conhecimento', Icon: BookOpen },
]

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-lifitseg-dark px-5 py-12 text-lifitseg-offwhite sm:py-16">
      <div className="mx-auto max-w-xl">
        <header className="mb-10">
          <Link href="/" aria-label="Lifitseg, página inicial" className="inline-block rounded focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-lifitseg-mint">
            <Image src="/marca/Lifitseg_logo_compacto_escuro.svg" alt="Lifitseg" width={240} height={60} priority className="h-auto w-56" />
          </Link>
          <div className="mt-9 h-0.5 w-12 bg-lifitseg-primary" aria-hidden="true" />
          <h1 className="mt-5 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">Saúde e seguros,<br />com orientação para<br className="hidden sm:block" /> cada decisão.</h1>
          <p className="mt-4 text-base leading-relaxed text-lifitseg-offwhite/70">Escolha o caminho que faz sentido para você.</p>
        </header>

        <nav aria-label="Soluções e atendimento" className="space-y-3">
          {paths.map(({ title, detail, href, Icon }, index) => {
            const external = href.startsWith('https:')
            return (
              <Link key={title} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`group flex items-center gap-4 rounded-2xl border p-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lifitseg-mint ${index === 0 ? 'border-lifitseg-mint/40 bg-lifitseg-mint/10' : 'border-white/15 bg-white/[0.025] hover:border-lifitseg-mint/50 hover:bg-white/5'}`}>
                <Icon size={23} className="shrink-0 text-lifitseg-mint" aria-hidden="true" />
                <span className="min-w-0 flex-1"><span className="block text-base font-medium">{title}</span><span className="mt-1 block text-sm leading-relaxed text-lifitseg-offwhite/65">{detail}</span></span>
                <ArrowUpRight size={18} className="shrink-0 text-lifitseg-offwhite/50 group-hover:text-lifitseg-mint" aria-hidden="true" />
                {external && <span className="sr-only">Abre WhatsApp em nova aba</span>}
              </Link>
            )
          })}
        </nav>

        <section aria-labelledby="redes" className="mt-10 border-t border-white/15 pt-7">
          <h2 id="redes" className="mb-4 text-sm font-medium">Acompanhe a Lifitseg</h2>
          <SocialLinks />
        </section>
        <footer className="mt-9 space-y-3 text-sm leading-relaxed text-lifitseg-offwhite/60">
          <p>{siteConfig.contato.horario}.<br />No primeiro contato, não envie documentos ou dados de saúde.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
            <Link href="/" className="underline underline-offset-4 hover:text-lifitseg-mint">Conhecer o site</Link>
            <Link href="/privacidade" className="underline underline-offset-4 hover:text-lifitseg-mint">Privacidade</Link>
          </div>
        </footer>
      </div>
    </main>
  )
}
