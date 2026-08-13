'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { LeadModal } from '@/components/forms/LeadModal'
import { ContatoForm } from '@/components/forms/ContatoForm'
import { FaqAccordion, FaqItem } from '@/components/common/FaqAccordion'
import { CategoriaConhecimentoCard } from '@/components/sobre/CategoriaConhecimentoCard'
import { TrabalheConoscoCTA } from '@/components/sobre/TrabalheConoscoCTA'
import { siteConfig } from '@/config/site'
import {
  Scale,
  Eye,
  BookOpen,
  Focus,
  TrendingUp,
  Handshake,
  ShieldCheck,
  CheckCircle2,
  Library,
  Building2,
  Home,
  ShieldAlert,
  Truck,
  LineChart,
  Cpu,
  HeartPulse,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
} from 'lucide-react'

export default function SobreEConhecimentoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOpenLeadModal = () => setIsModalOpen(true)

  const breadcrumbItems = [{ label: 'Sobre a LifitSeg' }]

  // Seção 03 — Nossos Valores
  const valores = [
    { label: 'Ética', icon: Scale },
    { label: 'Transparência', icon: Eye },
    { label: 'Conhecimento', icon: BookOpen },
    { label: 'Atenção', icon: Focus },
    { label: 'Evolução Contínua', icon: TrendingUp },
    { label: 'Relacionamento', icon: Handshake },
    { label: 'Responsabilidade', icon: ShieldCheck },
    { label: 'Compromisso', icon: CheckCircle2 },
  ]

  // Seção 04 — Centro de Conhecimento
  const categoriasConhecimento = [
    { label: 'Benefícios Corporativos', icon: HeartPulse },
    { label: 'Seguros Corporativos', icon: Building2 },
    { label: 'Seguros Pessoais', icon: Home },
    { label: 'Gestão de Riscos', icon: ShieldAlert },
    { label: 'Transporte & Logística', icon: Truck },
    { label: 'Responsabilidade Civil', icon: Scale },
    { label: 'Mercado Segurador', icon: LineChart },
    { label: 'Tecnologia e Inovação', icon: Cpu },
  ]

  // Seção 07 — Perguntas Frequentes
  const faqs: FaqItem[] = [
    {
      q: 'Como funciona o atendimento da LifitSeg?',
      a: 'Nosso atendimento começa pela compreensão da realidade de cada cliente. A partir disso, apresentamos soluções em benefícios, seguros e gestão de riscos alinhadas às necessidades identificadas.',
    },
    {
      q: 'A empresa atende todo o Brasil?',
      a: 'Sim, nosso atendimento é nacional, combinando consultoria próxima com estrutura preparada para diferentes regiões do país.',
    },
    {
      q: 'Como solicitar uma consultoria?',
      a: 'Basta entrar em contato pelos canais disponíveis nesta página ou falar diretamente com um de nossos especialistas.',
    },
    {
      q: 'Quais soluções fazem parte do portfólio?',
      a: 'Atuamos com Benefícios Corporativos, Seguros Corporativos e Seguros Pessoais, sempre com abordagem consultiva.',
    },
    {
      q: 'Como acompanhar novos conteúdos do Centro de Conhecimento?',
      a: 'Novos conteúdos serão publicados periodicamente nesta página, reunindo tendências e análises sobre o mercado de seguros e benefícios.',
    },
  ]

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      {/* 1. HERO (Verde institucional) */}
      <section className="relative bg-lifitseg-dark overflow-hidden border-b border-primary/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 max-w-[100vw]">
          <div className="lg:col-span-6 px-6 lg:px-16 py-20 lg:py-32 flex flex-col justify-center z-10 relative">
            <span className="inline-block px-4 py-1.5 rounded-full bg-lifitseg-surface text-primary text-[10px] font-bold uppercase tracking-widest mb-6 w-max border border-primary/30 shadow-sm">
              Sobre a LifitSeg
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-lifitseg-offwhite mb-8 leading-[1.15]">
              Conhecimento, relacionamento e compromisso com uma consultoria construída para pessoas e empresas.
            </h1>
            <p className="text-lifitseg-offwhite/80 text-base leading-relaxed mb-10 font-light">
              Ao longo da nossa trajetória buscamos construir relações duradouras, compartilhar conhecimento e apoiar nossos clientes na gestão de benefícios, seguros e riscos com responsabilidade e proximidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#quem-somos"
                className="bg-primary hover:bg-primary/80 text-lifitseg-dark font-bold px-8 py-3.5 rounded-xl transition-all shadow-xl text-sm text-center transform hover:-translate-y-0.5"
              >
                Conheça nossa história
              </a>
              <a
                href="#contato"
                className="bg-transparent border border-lifitseg-offwhite/20 hover:border-primary hover:text-primary text-lifitseg-offwhite font-bold px-8 py-3.5 rounded-xl transition-all text-sm text-center"
              >
                Entrar em contato
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[400px] lg:h-auto min-h-[450px]">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1600"
              alt="Equipe LifitSeg em reunião consultiva"
              className="absolute inset-0 w-full h-full object-cover lg:rounded-l-[100px]"
            />
            <div className="absolute inset-0 lg:rounded-l-[100px] bg-gradient-to-r from-lifitseg-dark via-transparent to-transparent opacity-90 lg:opacity-30"></div>
          </div>
        </div>
      </section>

      {/* 2. QUEM SOMOS (Off White) */}
      <section id="quem-somos" className="py-24 lg:py-32 bg-lifitseg-offwhite scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-lifitseg-dark/5 group order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
                alt="Equipe da LifitSeg em ambiente corporativo"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <span className="text-lifitseg-surface font-bold tracking-widest text-xs uppercase bg-lifitseg-surface/5 px-3 py-1 rounded-md">
                Quem Somos
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-lifitseg-dark leading-tight">
                Uma consultoria construída sobre confiança.
              </h2>
              <p className="text-lifitseg-dark/70 text-base leading-relaxed">
                A LifitSeg nasceu com o propósito de oferecer uma consultoria próxima, técnica e transparente. Ao longo dos anos ampliou sua atuação em benefícios corporativos, seguros para pessoas e empresas, mantendo como princípio compreender cada realidade antes de recomendar qualquer solução.
              </p>
              <p className="text-lifitseg-dark/60 text-base leading-relaxed">
                Não acreditamos em atendimentos padronizados. Cada cliente possui objetivos, necessidades e desafios próprios, e nossa consultoria procura respeitar essas particularidades em cada relacionamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 QUEM ESTÁ POR TRÁS DA LIFITSEG (Branco) */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-lifitseg-surface font-bold tracking-widest text-xs uppercase bg-lifitseg-surface/5 px-3 py-1 rounded-md">
              Quem está por trás da LifitSeg
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 bg-lifitseg-offwhite/40 rounded-3xl border border-lifitseg-dark/10 p-8 sm:p-10">
            {/* Avatar com iniciais — substituir por <img src="..." /> quando a foto profissional estiver pronta */}
            <div className="w-28 h-28 rounded-full bg-lifitseg-dark flex items-center justify-center text-2xl font-black text-primary shrink-0">
              RA
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-lifitseg-dark">Raphael Abaid</h3>
              <p className="text-sm font-semibold text-primary mb-3">Sócio Diretor</p>
              <p className="text-sm text-lifitseg-dark/70 leading-relaxed">
                Formado em Logística, com MBA em Gestão de Saúde pelo Centro Universitário São
                Camilo, certificação SUSEP e formação técnica em consultoria de negócios. Único
                fundador e responsável pela condução técnica da LifitSeg.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="https://share.google/lQoH1vfK1Kqz2W04m"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-white rounded-2xl border border-lifitseg-dark/10 px-6 py-4 shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
            >
              <span className="text-primary text-lg tracking-tight">★★★★★</span>
              <span className="text-sm font-bold text-lifitseg-dark">4.9</span>
              <span className="text-xs text-lifitseg-dark/60">· 41 avaliações no Google</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. NOSSOS VALORES (Branco) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-lifitseg-dark mb-4">Nossos Valores</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {valores.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.label}
                  className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-lifitseg-dark/10 hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-lifitseg-dark/5 flex items-center justify-center text-lifitseg-surface">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-bold text-lifitseg-dark">{v.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. CENTRO DE CONHECIMENTO (Off White) */}
      <section id="conhecimento" className="py-24 bg-lifitseg-offwhite scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="w-12 h-12 rounded-xl bg-lifitseg-surface/5 flex items-center justify-center text-lifitseg-surface mx-auto mb-6">
              <Library className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <span className="text-lifitseg-surface font-bold tracking-widest text-xs uppercase bg-lifitseg-surface/5 px-3 py-1 rounded-md mb-4 inline-block">
              Conteúdo técnico para decisões melhores.
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-lifitseg-dark mb-4">Conhecimento que acompanha a evolução do mercado.</h2>
            <p className="text-lifitseg-dark/60 text-base leading-relaxed">
              O mercado de benefícios e seguros está em constante transformação. Nosso Centro de Conhecimento reúne conteúdos desenvolvidos para apresentar tendências, esclarecer temas relevantes e compartilhar experiências que contribuam para decisões mais conscientes.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {categoriasConhecimento.map((c) => (
              <CategoriaConhecimentoCard key={c.label} label={c.label} icon={c.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRABALHE CONOSCO (Branco) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-lifitseg-dark/5">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200"
                alt="Equipe LifitSeg colaborando"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <span className="text-lifitseg-surface font-bold tracking-widest text-xs uppercase bg-lifitseg-surface/5 px-3 py-1 rounded-md">
                Trabalhe Conosco
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-lifitseg-dark leading-tight">
                Pessoas fazem parte da nossa evolução.
              </h2>
              <p className="text-lifitseg-dark/60 text-base leading-relaxed">
                Estamos sempre interessados em conhecer profissionais comprometidos com ética, aprendizado contínuo e atendimento de excelência.
              </p>
              <TrabalheConoscoCTA />
            </div>
          </div>
        </div>
      </section>

      {/* 6. FALE COM A LIFITSEG (Off White) */}
      <section id="contato" className="py-24 bg-lifitseg-offwhite scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-lifitseg-dark mb-4">Fale com a LifitSeg</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-lifitseg-surface shadow-sm flex-shrink-0">
                  <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-bold text-lifitseg-dark/50 uppercase tracking-wider mb-1">WhatsApp</p>
                  <p className="text-sm font-semibold text-lifitseg-dark">{siteConfig.contato.whatsappExibicao}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-lifitseg-surface shadow-sm flex-shrink-0">
                  <Mail className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-bold text-lifitseg-dark/50 uppercase tracking-wider mb-1">E-mail</p>
                  <p className="text-sm font-semibold text-lifitseg-dark">{siteConfig.contato.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-lifitseg-surface shadow-sm flex-shrink-0">
                  <MapPin className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-bold text-lifitseg-dark/50 uppercase tracking-wider mb-1">Endereço</p>
                  <p className="text-sm font-semibold text-lifitseg-dark leading-relaxed">{siteConfig.endereco.completo}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-lifitseg-surface shadow-sm flex-shrink-0">
                  <Clock className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-bold text-lifitseg-dark/50 uppercase tracking-wider mb-1">Horário de Atendimento</p>
                  {/* TODO: confirmar horário oficial com Raphael */}
                  <p className="text-sm font-semibold text-lifitseg-dark">Segunda a sexta, 9h às 18h</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-lifitseg-dark/10 p-8 shadow-sm">
              <ContatoForm />
            </div>
          </div>
        </div>
      </section>

      {/* 7. PERGUNTAS FREQUENTES (Branco) */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-lifitseg-dark mb-4">Perguntas Frequentes</h2>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* 8. CTA FINAL (Verde institucional) */}
      <section className="relative py-28 bg-lifitseg-dark overflow-hidden border-t border-primary/20">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600"
          alt="Ambiente corporativo institucional"
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lifitseg-dark via-lifitseg-dark/80 to-transparent opacity-95"></div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-lifitseg-offwhite mb-6 tracking-tight">
            Vamos iniciar uma conversa?
          </h2>
          <p className="text-lifitseg-offwhite/70 text-lg mb-10 leading-relaxed font-light">
            Se você deseja conhecer melhor nossas soluções, compreender determinado tema ou conversar sobre a realidade da sua empresa ou da sua família, teremos satisfação em atendê-lo.
          </p>
          <button
            onClick={handleOpenLeadModal}
            className="bg-primary hover:bg-primary/80 text-lifitseg-dark font-bold px-10 py-4 rounded-xl transition-all shadow-2xl shadow-primary/20 text-base transform hover:-translate-y-0.5"
          >
            Falar com um Especialista
          </button>
        </div>
      </section>

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        origem="sobre-e-conhecimento"
      />
    </>
  )
}
