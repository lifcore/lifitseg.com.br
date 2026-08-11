'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { LeadModal } from '@/components/forms/LeadModal'
import {
  Truck,
  Factory,
  ShoppingBag,
  Briefcase,
  HardHat,
  UserCheck,
  Building2,
  Scale,
  Landmark,
  ShieldAlert,
  CarFront,
  Search,
  BarChart3,
  LayoutGrid,
  Users,
  HeartPulse,
  Cpu,
  ArrowRight,
} from 'lucide-react'

export default function SegurosCorporativosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenLeadModal = () => setIsModalOpen(true)

  const breadcrumbItems = [
    { label: 'Soluções', href: '/#solucoes' },
    { label: 'Seguros Corporativos' },
  ]

  // Seção 02 — Segmentos de Atuação
  const segmentos = [
    {
      title: 'Transporte & Logística',
      description: 'Consultoria voltada às necessidades do transporte de cargas, operadores logísticos e empresas com operações rodoviárias.',
      icon: Truck,
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Indústria',
      description: 'Proteção para operações industriais, patrimônio e responsabilidades inerentes ao setor.',
      icon: Factory,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Comércio',
      description: 'Soluções destinadas à continuidade operacional e proteção dos ativos empresariais.',
      icon: ShoppingBag,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Serviços',
      description: 'Consultoria para empresas prestadoras de serviços, escritórios e organizações de diferentes segmentos.',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Construção & Engenharia',
      description: 'Proteção para obras, equipamentos, responsabilidades e operações específicas.',
      icon: HardHat,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Profissionais Liberais',
      description: 'Soluções voltadas à proteção patrimonial e responsabilidades profissionais.',
      icon: UserCheck,
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
    },
  ]

  // Seção 03 — Portfólio Corporativo
  const portfolio = [
    {
      title: 'Transporte & Logística',
      description: 'A operação logística envolve diferentes responsabilidades e modalidades de proteção. Nossa atuação contempla empresas que buscam uma consultoria alinhada às necessidades de suas operações.',
      icon: Truck,
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=900',
      solucoes: ['Transporte Nacional', 'Transporte Internacional', 'RCTR-C', 'RC-DC', 'Gerenciamento de Riscos', 'Averbação Eletrônica'],
    },
    {
      title: 'Patrimônio Empresarial',
      description: 'Proteção destinada à continuidade das operações e preservação dos ativos da empresa.',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=900',
      solucoes: ['Seguro Empresarial', 'Condomínio', 'Equipamentos', 'Engenharia', 'Lucros Cessantes'],
    },
    {
      title: 'Responsabilidade Civil',
      description: 'Apoiamos empresas e profissionais na avaliação de modalidades destinadas à proteção frente às responsabilidades decorrentes de suas atividades.',
      icon: Scale,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=900',
      solucoes: ['RC Geral', 'RC Profissional', 'RC Operações', 'RC Produtos', 'D&O'],
    },
    {
      title: 'Garantias Financeiras',
      description: 'Consultoria em soluções voltadas ao cumprimento de obrigações contratuais e garantias empresariais.',
      icon: Landmark,
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=900',
      solucoes: ['Seguro Garantia', 'Seguro Fiança', 'Crédito'],
    },
    {
      title: 'Riscos Corporativos',
      description: 'Proteções voltadas a riscos específicos presentes em diferentes operações empresariais.',
      icon: ShieldAlert,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=900',
      solucoes: ['Cyber', 'Equipamentos', 'Riscos Diversos', 'Danos Elétricos'],
    },
    {
      title: 'Gestão de Frotas',
      description: 'Consultoria destinada à proteção de veículos corporativos e gestão de operações de frota.',
      icon: CarFront,
      image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=900',
      solucoes: ['Frota Leve', 'Frota Pesada', 'Gestão de Frotas'],
    },
  ]

  // Seção 04 — Como Desenvolvemos Nossa Consultoria
  const timelineSteps = [
    { title: 'Conhecemos a operação', desc: 'Entendemos o contexto e os desafios da empresa.', icon: Search },
    { title: 'Analisamos os riscos', desc: 'Avaliamos características operacionais e necessidades específicas.', icon: BarChart3 },
    { title: 'Estruturamos as soluções', desc: 'Selecionamos alternativas compatíveis com cada realidade.', icon: LayoutGrid },
    { title: 'Acompanhamos continuamente', desc: 'Mantemos um relacionamento próximo durante toda a vigência.', icon: Users },
  ]

  // Seção 05 — Mercados que Conhecemos
  const mercados = [
    { label: 'Logística', icon: Truck },
    { label: 'Indústria', icon: Factory },
    { label: 'Comércio', icon: ShoppingBag },
    { label: 'Serviços', icon: Briefcase },
    { label: 'Saúde', icon: HeartPulse },
    { label: 'Tecnologia', icon: Cpu },
    { label: 'Construção', icon: HardHat },
  ]



  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      {/* 1. HERO (Verde institucional) */}
      <section className="relative bg-[#00393f] overflow-hidden border-b border-[#e2a535]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 max-w-[100vw]">
          <div className="lg:col-span-6 px-6 lg:px-16 py-20 lg:py-32 flex flex-col justify-center z-10 relative">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#094448] text-[#e2a535] text-[10px] font-bold uppercase tracking-widest mb-6 w-max border border-[#e2a535]/30 shadow-sm">
              Seguros Corporativos
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#e1e7e1] mb-8 leading-[1.15]">
              Especialidades corporativas para empresas que valorizam decisões bem fundamentadas.
            </h1>
            <p className="text-[#e1e7e1]/80 text-base leading-relaxed mb-10 font-light">
              Cada empresa possui desafios, responsabilidades e riscos próprios. A LifitSeg atua de forma consultiva, apoiando organizações na avaliação de soluções em seguros corporativos, gestão de riscos e proteção patrimonial conforme a realidade de cada operação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#segmentos"
                className="bg-[#e2a535] hover:bg-[#c9932f] text-[#00393f] font-bold px-8 py-3.5 rounded-xl transition-all shadow-xl text-sm text-center transform hover:-translate-y-0.5"
              >
                Conheça nossas especialidades
              </a>
              <button
                onClick={handleOpenLeadModal}
                className="bg-transparent border border-[#e1e7e1]/20 hover:border-[#e2a535] hover:text-[#e2a535] text-[#e1e7e1] font-bold px-8 py-3.5 rounded-xl transition-all text-sm"
              >
                Falar com um Especialista
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[400px] lg:h-auto min-h-[450px]">
            <img
              src="https://images.unsplash.com/photo-1554774853-b415df9eeb92?auto=format&fit=crop&q=80&w=1600"
              alt="Ambiente corporativo moderno combinando logística e indústria"
              className="absolute inset-0 w-full h-full object-cover lg:rounded-l-[100px]"
            />
            <div className="absolute inset-0 lg:rounded-l-[100px] bg-gradient-to-r from-[#00393f] via-transparent to-transparent opacity-90 lg:opacity-30"></div>
          </div>
        </div>
      </section>

      {/* 2. SEGMENTOS DE ATUAÇÃO (Off White) */}
      <section id="segmentos" className="py-24 lg:py-32 bg-[#e1e7e1] scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-[#00393f] mb-4">Conhecemos diferentes realidades empresariais.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {segmentos.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-3xl border border-[#00393f]/10 overflow-hidden hover:border-[#e2a535]/50 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00393f]/70 via-[#00393f]/10 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#e2a535] shadow-lg">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-bold text-[#00393f] mb-2">{item.title}</h3>
                    <p className="text-[#00393f]/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. NOSSO PORTFÓLIO CORPORATIVO (Branco) */}
      <section id="portfolio" className="py-24 bg-white scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-[#00393f] mb-4">Especialidades que fazem parte da nossa atuação.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolio.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="bg-[#e1e7e1]/50 rounded-3xl border border-[#00393f]/10 overflow-hidden hover:border-[#e2a535]/50 hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00393f]/80 via-[#00393f]/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#e2a535] shadow-lg">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-[#00393f] mb-3">{item.title}</h3>
                    <p className="text-[#00393f]/60 text-sm leading-relaxed mb-5">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.solucoes.map((s) => (
                        <span
                          key={s}
                          className="text-[11px] font-medium text-[#00393f]/70 bg-[#00393f]/5 border border-[#00393f]/10 px-3 py-1 rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={handleOpenLeadModal}
                      className="mt-auto flex items-center gap-2 text-[#e2a535] text-sm font-bold hover:text-[#094448] transition-colors w-max group-hover:translate-x-1 duration-300"
                    >
                      Saiba Mais
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. COMO DESENVOLVEMOS NOSSA CONSULTORIA (Off White - Timeline) */}
      <section className="py-24 bg-[#e1e7e1] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-[#00393f] mb-4">Como Desenvolvemos Nossa Consultoria</h2>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-0 w-full h-[2px] bg-[#e2a535]/30 z-0"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
              {timelineSteps.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="relative">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-[#e2a535] flex items-center justify-center mb-6 shadow-md relative z-10">
                      <Icon className="w-5 h-5 text-[#e2a535]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-bold text-[#00393f] mb-2">{step.title}</h3>
                    <p className="text-xs text-[#00393f]/60 leading-relaxed pr-2">{step.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. MERCADOS QUE CONHECEMOS (Branco) */}
      <section className="py-24 bg-white border-b border-[#00393f]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-[#00393f] mb-4">Experiência em diferentes segmentos.</h2>
            <p className="text-[#00393f]/60 text-base leading-relaxed">
              Cada setor possui características próprias. Nossa atuação busca compreender essas particularidades para desenvolver uma consultoria alinhada às necessidades de cada empresa.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6">
            {mercados.map((m) => {
              const Icon = m.icon
              return (
                <div
                  key={m.label}
                  className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-[#00393f]/10 hover:border-[#e2a535]/40 hover:bg-[#e1e7e1] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00393f]/5 flex items-center justify-center text-[#094448]">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-bold text-[#00393f]">{m.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 7. CONVERSA CONSULTIVA / CTA (Verde institucional) */}
      <section className="relative py-28 bg-[#00393f] overflow-hidden border-t border-[#e2a535]/20">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600"
          alt="Ambiente corporativo institucional"
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00393f] via-[#00393f]/80 to-transparent opacity-95"></div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-[#e1e7e1] mb-6 tracking-tight">
            Vamos conhecer a realidade da sua empresa?
          </h2>
          <p className="text-[#e1e7e1]/70 text-lg mb-10 leading-relaxed font-light">
            Nossa equipe está preparada para compreender sua operação e apresentar como desenvolvemos nossa consultoria em seguros corporativos e gestão de riscos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleOpenLeadModal}
              className="bg-[#e2a535] hover:bg-[#c9932f] text-[#00393f] font-bold px-10 py-4 rounded-xl transition-all shadow-2xl shadow-[#e2a535]/20 text-base transform hover:-translate-y-0.5"
            >
              Falar com um Especialista
            </button>
            <button
              onClick={handleOpenLeadModal}
              className="bg-transparent border border-[#e1e7e1]/20 hover:border-[#e2a535] hover:text-[#e2a535] text-[#e1e7e1] font-bold px-10 py-4 rounded-xl transition-all text-base"
            >
              Entrar em Contato
            </button>
          </div>
        </div>
      </section>

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        origem="seguros-corporativos"
        produtos={[
          'Transporte & Logística',
          'Patrimônio Empresarial',
          'Responsabilidade Civil',
          'Garantias Financeiras',
          'Riscos Corporativos',
          'Gestão de Frotas',
        ]}
      />
    </>
  )
}
