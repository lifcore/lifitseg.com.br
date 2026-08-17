'use client'

import { useState } from 'react'
import Image from 'next/image'
import Breadcrumb from '@/components/common/Breadcrumb'
import { LeadModal } from '@/components/forms/LeadModal'
import {
  Car,
  Home,
  Heart,
  Plane,
  Smartphone,
  Sparkles,
  Search,
  UserCheck,
  LayoutGrid,
  Users,
  ArrowRight,
  ChevronDown,
} from 'lucide-react'

export default function SegurosPessoaisPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const handleOpenLeadModal = () => setIsModalOpen(true)

  const breadcrumbItems = [
    { label: 'Soluções', href: '/#solucoes' },
    { label: 'Seguros Pessoais' },
  ]

  // Seção 02 — Momentos da Vida
  const momentos = [
    { label: 'Mobilidade', icon: Car },
    { label: 'Patrimônio', icon: Home },
    { label: 'Família', icon: Heart },
    { label: 'Viagens', icon: Plane },
    { label: 'Tecnologia', icon: Smartphone },
  ]

  // Seção 03 — Nossas Soluções
  const solucoes = [
    {
      title: 'Seguro Auto',
      description: 'A mobilidade faz parte da rotina de milhões de pessoas. Nossa consultoria busca compreender o perfil de utilização do veículo para apresentar soluções compatíveis com cada realidade.',
      icon: Car,
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=900',
      itens: ['Auto', 'Moto', 'Frota Familiar'],
    },
    {
      title: 'Seguro Residencial',
      description: 'A proteção do patrimônio vai além da estrutura física do imóvel. Cada residência possui características e necessidades diferentes.',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=900',
      itens: ['Casa', 'Apartamento', 'Condomínio Residencial'],
    },
    {
      title: 'Seguro de Vida',
      description: 'Cada pessoa possui objetivos, responsabilidades e pessoas importantes para proteger.',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=900',
      itens: ['Vida Individual', 'Vida Familiar', 'Acidentes Pessoais'],
    },
    {
      title: 'Seguro Viagem',
      description: 'Proteção para viagens nacionais e internacionais.',
      icon: Plane,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=900',
      itens: ['Nacional', 'Internacional'],
    },
    {
      title: 'Equipamentos e Tecnologia',
      description: 'Soluções voltadas à proteção de bens utilizados no dia a dia.',
      icon: Smartphone,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=900',
      itens: ['Celular', 'Notebook', 'Equipamentos Portáteis'],
    },
  ]

  // Seção 04 — Como Atuamos
  const timelineSteps = [
    { title: 'Conhecemos sua necessidade', desc: 'Entendemos seu momento de vida e o que precisa ser protegido.', icon: Search },
    { title: 'Analisamos seu perfil', desc: 'Avaliamos características pessoais e familiares específicas.', icon: UserCheck },
    { title: 'Apresentamos alternativas', desc: 'Selecionamos opções compatíveis com sua realidade.', icon: LayoutGrid },
    { title: 'Acompanhamos continuamente', desc: 'Mantemos um relacionamento próximo durante toda a vigência.', icon: Users },
  ]

  // Seguradoras parceiras — mesmo cadastro/logos usados na Home e em Seguros Corporativos
  // (categoria 'seguros'); ainda não temos confirmação de quais atuam especificamente em
  // linhas pessoais vs corporativas, então por ora a lista é a mesma nas duas páginas.
  const seguradoras = [
    { nome: 'Bradesco Seguros', arquivo: 'bradesco' },
    { nome: 'Porto Seguro', arquivo: 'porto' },
    { nome: 'Seguros Unimed', arquivo: 'seguros_unimed' },
    { nome: 'Tokio Marine', arquivo: 'tokio' },
    { nome: 'Liberty Seguros', arquivo: 'liberty' },
    { nome: 'Mapfre', arquivo: 'mapfre' },
    { nome: 'Allianz', arquivo: 'allianz' },
    { nome: 'HDI Seguros', arquivo: 'hdi' },
    { nome: 'Yelum', arquivo: 'yelum' },
    { nome: 'Suhai', arquivo: 'suhai' },
    { nome: 'Zurich', arquivo: 'zurich' },
    { nome: 'Itaú Seguros', arquivo: 'itau' },
    { nome: 'Azul Seguros', arquivo: 'azul' },
    { nome: 'Mitsui Sumitomo', arquivo: 'mitsui' },
  ]

  // Seção 06 — FAQ
  const faqs = [
    {
      q: 'Como funciona a consultoria da LifitSeg para pessoa física?',
      a: 'Começamos entendendo sua rotina, seu patrimônio e o que é prioridade para você e sua família, para então apresentar as opções mais compatíveis com sua realidade.',
    },
    {
      q: 'Preciso já ter um seguro para conversar com um especialista?',
      a: 'Não. Podemos avaliar sua situação do zero ou revisar uma apólice que você já possui, sem compromisso.',
    },
    {
      q: 'A LifitSeg atende apenas empresas ou também pessoas físicas?',
      a: 'Atuamos tanto no mercado corporativo quanto junto a pessoas e famílias, com a mesma seriedade e qualidade consultiva.',
    },
    {
      q: 'É possível contratar mais de um seguro com acompanhamento único?',
      a: 'Sim. Nossa consultoria acompanha o conjunto das suas proteções, facilitando a gestão e a renovação de cada apólice.',
    },
    {
      q: 'Como recebo suporte em caso de sinistro?',
      a: 'Você conta com um relacionamento próximo durante toda a vigência do contrato, com orientação em cada etapa do processo.',
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
              Seguros Pessoais
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-lifitseg-offwhite mb-8 leading-[1.15]">
              Proteção para você, sua família e seu patrimônio, com uma consultoria construída sobre confiança e relacionamento.
            </h1>
            <p className="text-lifitseg-offwhite/80 text-base leading-relaxed mb-10 font-light">
              Cada momento da vida pede um tipo de cuidado diferente. Estamos aqui para entender o que importa para você e apresentar soluções que façam sentido para a sua realidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#momentos"
                className="bg-primary hover:bg-primary/80 text-lifitseg-dark font-bold px-8 py-3.5 rounded-xl transition-all shadow-xl text-sm text-center transform hover:-translate-y-0.5"
              >
                Conheça nossas soluções
              </a>
              <button
                onClick={handleOpenLeadModal}
                className="bg-transparent border border-lifitseg-offwhite/20 hover:border-primary hover:text-primary text-lifitseg-offwhite font-bold px-8 py-3.5 rounded-xl transition-all text-sm"
              >
                Encontrar a proteção ideal
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[400px] lg:h-auto min-h-[450px]">
            <img
              src="https://images.unsplash.com/photo-1541089404510-5c9a779841fc?auto=format&fit=crop&q=80&w=1600"
              alt="Família em ambiente doméstico acolhedor"
              className="absolute inset-0 w-full h-full object-cover lg:rounded-l-[100px]"
            />
            <div className="absolute inset-0 lg:rounded-l-[100px] bg-gradient-to-r from-lifitseg-dark via-transparent to-transparent opacity-90 lg:opacity-30"></div>
          </div>
        </div>
      </section>

      {/* 2. MOMENTOS DA VIDA (Off White) */}
      <section id="momentos" className="py-24 lg:py-32 bg-lifitseg-offwhite scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-lifitseg-dark mb-4">Momentos que merecem proteção.</h2>
            <p className="text-lifitseg-dark/60 text-base leading-relaxed">
              Cada fase da vida traz necessidades diferentes. Ajudamos você a identificar o que faz sentido em cada momento.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {momentos.map((m) => {
              const Icon = m.icon
              return (
                <div
                  key={m.label}
                  className="flex flex-col items-center text-center gap-4 p-8 rounded-3xl bg-white border border-lifitseg-dark/10 hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-lifitseg-dark/5 flex items-center justify-center text-lifitseg-surface">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-bold text-lifitseg-dark">{m.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. NOSSAS SOLUÇÕES (Branco) */}
      <section id="solucoes" className="py-24 bg-white scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-lifitseg-dark mb-4">Soluções pensadas para o seu dia a dia.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solucoes.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="bg-lifitseg-offwhite/50 rounded-3xl border border-lifitseg-dark/10 overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-lifitseg-dark/80 via-lifitseg-dark/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 w-11 h-11 rounded-xl bg-white flex items-center justify-center text-primary shadow-lg">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-lifitseg-dark mb-3">{item.title}</h3>
                    <p className="text-lifitseg-dark/60 text-sm leading-relaxed mb-5">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.itens.map((s) => (
                        <span
                          key={s}
                          className="text-[11px] font-medium text-lifitseg-dark/70 bg-lifitseg-dark/5 border border-lifitseg-dark/10 px-3 py-1 rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={handleOpenLeadModal}
                      className="mt-auto flex items-center gap-2 text-primary text-sm font-bold hover:text-lifitseg-surface transition-colors w-max group-hover:translate-x-1 duration-300"
                    >
                      Saiba Mais
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}

            {/* Bloco "Outras Soluções" — espaço preparado para expansão */}
            <div className="bg-lifitseg-offwhite/30 rounded-3xl border border-dashed border-lifitseg-dark/20 flex flex-col items-center justify-center text-center p-10 min-h-[220px]">
              <div className="w-11 h-11 rounded-xl bg-lifitseg-dark/5 flex items-center justify-center text-lifitseg-surface mb-4">
                <Sparkles className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-lifitseg-dark mb-2">Outras Soluções</h3>
              <p className="text-lifitseg-dark/60 text-sm leading-relaxed">
                Nossa consultoria está preparada para orientar você também em outras modalidades. Fale com um especialista para saber mais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMO ATUAMOS (Off White - Timeline) */}
      <section className="py-24 bg-lifitseg-offwhite overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-lifitseg-dark mb-4">Como Atuamos</h2>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-0 w-full h-[2px] bg-primary/30 z-0"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
              {timelineSteps.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="relative">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-primary flex items-center justify-center mb-6 shadow-md relative z-10">
                      <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-bold text-lifitseg-dark mb-2">{step.title}</h3>
                    <p className="text-xs text-lifitseg-dark/60 leading-relaxed pr-2">{step.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SEGURADORAS (Branco) */}
      <section className="py-20 bg-white border-b border-lifitseg-dark/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold tracking-widest text-lifitseg-dark/50 uppercase mb-10">
            Seguradoras parceiras
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {seguradoras.map((seg, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center rounded-2xl border border-lifitseg-dark/10 bg-lifitseg-offwhite px-5 py-4 text-center shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="relative mb-3 flex h-10 w-24 items-center justify-center">
                  <Image
                    src={`/seguradoras/${seg.arquivo}.png`}
                    alt={seg.nome}
                    width={96}
                    height={40}
                    className="max-h-10 w-auto object-contain"
                  />
                </div>
                <span className="text-xs font-bold tracking-tight text-lifitseg-dark/80">{seg.nome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PERGUNTAS FREQUENTES (Off White) */}
      <section className="py-24 bg-lifitseg-offwhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-lifitseg-dark mb-4">Perguntas Frequentes</h2>
            <p className="text-lifitseg-dark/60 text-base">As dúvidas mais comuns de quem busca proteção pessoal.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx
              return (
                <div key={item.q} className="bg-white rounded-2xl border border-lifitseg-dark/10 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-sm font-bold text-lifitseg-dark">{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5">
                      <p className="text-sm text-lifitseg-dark/60 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 7. CTA (Verde institucional) */}
      <section className="relative py-28 bg-lifitseg-dark overflow-hidden border-t border-primary/20">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1600"
          alt="Família em momento de tranquilidade"
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lifitseg-dark via-lifitseg-dark/80 to-transparent opacity-95"></div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-lifitseg-offwhite mb-6 tracking-tight">
            Vamos conversar sobre a proteção que faz sentido para você?
          </h2>
          <p className="text-lifitseg-offwhite/70 text-lg mb-10 leading-relaxed font-light">
            Nossa equipe está preparada para entender sua realidade e apresentar as soluções mais adequadas para você e sua família.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleOpenLeadModal}
              className="bg-primary hover:bg-primary/80 text-lifitseg-dark font-bold px-10 py-4 rounded-xl transition-all shadow-2xl shadow-primary/20 text-base transform hover:-translate-y-0.5"
            >
              Encontrar a proteção ideal
            </button>
            <button
              onClick={handleOpenLeadModal}
              className="bg-transparent border border-lifitseg-offwhite/20 hover:border-primary hover:text-primary text-lifitseg-offwhite font-bold px-10 py-4 rounded-xl transition-all text-base"
            >
              Entrar em Contato
            </button>
          </div>
        </div>
      </section>

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        origem="seguros-pessoais"
        mostrarDadosEmpresa={false}
        produtos={[
          'Seguro Auto',
          'Seguro Residencial',
          'Seguro de Vida',
          'Seguro Viagem',
          'Equipamentos e Tecnologia',
        ]}
      />
    </>
  )
}
