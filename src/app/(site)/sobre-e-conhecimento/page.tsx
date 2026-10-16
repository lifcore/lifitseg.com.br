import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/common/Breadcrumb'
import { LinkWhatsApp } from '@/components/common/LinkWhatsApp'
import { ContatoForm } from '@/components/forms/ContatoForm'
import { TrabalheConoscoCTA } from '@/components/sobre/TrabalheConoscoCTA'
import { GuiasDestaque } from '@/components/atuacao/Blocos'
import { SOBRE } from '@/content/seguros'
import { EQUIPE, LINK_AVALIACOES_GOOGLE } from '@/content/atuacao'
import { siteConfig } from '@/config/site'

// Sobre — etapa 3 do Chief Chat (Lifitseg_Site_Seguros_Conteudo_v1.md).
// Âncoras preservadas (#sobre, #quem-somos, #conhecimento, #contato): menu,
// rodapé e home apontam para elas. Sem data de fundação, número de
// colaboradores, certificações ou índices que não foram confirmados.

export const metadata: Metadata = {
  title: { absolute: 'Sobre a Lifitseg | Consultoria em benefícios e seguros' },
  description: SOBRE.texto,
}

export default function SobreEConhecimentoPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'A Lifitseg' }]} />

      <section id="sobre" className="scroll-mt-20 bg-lifitseg-dark text-lifitseg-offwhite">
        <div className="mx-auto max-w-7xl px-4 pt-14 pb-16 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest text-lifitseg-mint uppercase">A Lifitseg</p>
          <h1 className="mt-5 max-w-4xl text-4xl text-white sm:text-5xl" style={{ lineHeight: 1.15 }}>{SOBRE.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg text-lifitseg-offwhite/80">{SOBRE.texto}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#solucoes" className="rounded-xl bg-primary px-6 py-3.5 text-center text-sm font-bold text-lifitseg-dark hover:opacity-90">Conhecer as soluções</a>
            <a href="#conhecimento" className="text-sm font-semibold hover:text-lifitseg-mint">Acessar os guias <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section id="quem-somos" aria-labelledby="titulo-pilares" className="scroll-mt-20 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-pilares" className="text-lifitseg-dark">Como trabalhamos.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SOBRE.pilares.map((p) => (
              <article key={p.titulo} className="rounded-2xl border border-lifitseg-line p-6">
                <h3 className="text-lifitseg-dark" style={{ fontSize: '1.1rem' }}>{p.titulo}</h3>
                <p className="mt-3 text-sm text-lifitseg-text-soft">{p.texto}</p>
              </article>
            ))}
            <article className="rounded-2xl bg-lifitseg-paper p-6">
              <h3 className="text-lifitseg-dark" style={{ fontSize: '1.1rem' }}>{EQUIPE.titulo}</h3>
              <p className="mt-3 text-sm text-lifitseg-text-soft">{EQUIPE.texto}</p>
              <a href={LINK_AVALIACOES_GOOGLE} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-bold text-lifitseg-green hover:underline">
                Ver avaliações no Google <span aria-hidden="true">↗</span>
              </a>
            </article>
          </div>
        </div>
      </section>

      <section id="solucoes" aria-labelledby="titulo-solucoes-sobre" className="scroll-mt-20 bg-lifitseg-paper py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-solucoes-sobre" className="text-lifitseg-dark">Soluções.</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { href: '/beneficios-corporativos', titulo: 'Benefícios corporativos', texto: 'Plano de saúde e odontológico empresarial: contratação, renovação e gestão.' },
              { href: '/seguros-corporativos', titulo: 'Seguros corporativos', texto: 'Patrimônio, responsabilidades, transporte, frota, garantias e riscos específicos.' },
              { href: '/seguros-pessoais', titulo: 'Seguros pessoais', texto: 'Auto e moto, residência, vida, viagem e equipamentos.' },
            ].map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="flex h-full flex-col rounded-2xl border border-lifitseg-line bg-white p-6 hover:border-lifitseg-green">
                  <span className="font-bold text-lifitseg-dark">{s.titulo}</span>
                  <span className="mt-2 flex-1 text-sm text-lifitseg-text-soft">{s.texto}</span>
                  <span className="mt-4 text-sm font-bold text-lifitseg-green">Conhecer <span aria-hidden="true">→</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="conhecimento" aria-labelledby="titulo-conhecimento" className="scroll-mt-20 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-conhecimento" className="text-lifitseg-dark">Conhecimento para decidir.</h2>
          <p className="mt-3 max-w-2xl text-sm text-lifitseg-text-soft">Guias educativos com autoria institucional e fontes públicas quando aplicáveis.</p>
          <div className="mt-8"><GuiasDestaque area="saude" limite={3} /></div>
          <div className="mt-4"><GuiasDestaque area="seguros" limite={3} /></div>
          <Link href="/conhecimento" className="mt-6 inline-block text-sm font-bold text-lifitseg-green hover:underline">Ver todos os guias <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      {/* Parcerias e vagas: canal próprio (`receber-trabalhe-conosco` → People),
          fora do funil comercial e do filtro anti-corretor dos leads (D-16). */}
      <section id="trabalhe-conosco" aria-labelledby="titulo-parcerias" className="scroll-mt-20 bg-lifitseg-dark py-16 text-lifitseg-offwhite">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
          <div>
            <h2 id="titulo-parcerias" className="text-white">Faça parte da Lifitseg.</h2>
            <p className="mt-4 max-w-2xl text-lifitseg-offwhite/80">
              Corretores que queiram desenvolver uma parceria e profissionais interessados em integrar a equipe podem se apresentar por aqui. Este canal é separado do atendimento a clientes.
            </p>
          </div>
          <TrabalheConoscoCTA />
        </div>
      </section>

      <section id="contato" aria-labelledby="titulo-contato-sobre" className="scroll-mt-20 bg-lifitseg-paper py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8">
          <div>
            <h2 id="titulo-contato-sobre" className="text-lifitseg-dark">Fale com a Lifitseg.</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <p className="text-xs font-bold tracking-wide text-lifitseg-text-soft uppercase">WhatsApp</p>
                <LinkWhatsApp rotulo="sobre" className="font-semibold text-lifitseg-dark hover:text-lifitseg-green">{siteConfig.contato.whatsappExibicao}</LinkWhatsApp>
              </li>
              <li>
                <p className="text-xs font-bold tracking-wide text-lifitseg-text-soft uppercase">E-mail</p>
                <a href={`mailto:${siteConfig.contato.email}`} className="font-semibold text-lifitseg-dark hover:text-lifitseg-green">{siteConfig.contato.email}</a>
              </li>
              <li>
                <p className="text-xs font-bold tracking-wide text-lifitseg-text-soft uppercase">Endereço</p>
                <p className="font-semibold text-lifitseg-dark">{siteConfig.endereco.completo}</p>
              </li>
              <li>
                <p className="text-xs font-bold tracking-wide text-lifitseg-text-soft uppercase">Horário de atendimento</p>
                <p className="font-semibold text-lifitseg-dark">{siteConfig.contato.horario}</p>
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-lifitseg-line bg-white p-6 sm:p-8">
            <ContatoForm />
          </div>
        </div>
      </section>
    </>
  )
}
