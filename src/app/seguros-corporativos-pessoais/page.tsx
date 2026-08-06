'use client'

import { useState } from 'react'
import Breadcrumb from '@/components/common/Breadcrumb'
import { LeadModal } from '@/components/forms/LeadModal'

export default function SolucoesSegurosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenLeadModal = () => {
    setIsModalOpen(true);
  };

  const breadcrumbItems = [
    { label: 'Soluções', href: '/#solucoes' },
    { label: 'Seguros Corporativos e Pessoais' }
  ];

  // Dados da Seção 3 - Especialidades (Cards 3x2)
  const especialidades = [
    {
      id: 1,
      title: 'Seguro Auto',
      description: 'Proteção sob medida para seu veículo, com coberturas adaptadas ao seu perfil de uso.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16a2 2 0 11-4 0 2 2 0 014 0zm12 0a2 2 0 11-4 0 2 2 0 014 0zM3 8h14.5a2.5 2.5 0 012.4 3l-1.4 5M3 8l1.4-4a2.5 2.5 0 012.4-1.7h5.4a2.5 2.5 0 012.4 1.7l1.4 4M3 8v8m13.5-3H21" />,
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'Seguro Frota',
      description: 'Gestão de riscos para a frota da sua empresa, garantindo continuidade e eficiência operacional.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16a2 2 0 11-4 0 2 2 0 014 0zm12 0a2 2 0 11-4 0 2 2 0 014 0zM3 8h14.5M3 8v8m17-8l-1.5-4a2.5 2.5 0 00-2.3-1.7H8m12 5.7V16" />,
      image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'Seguro Empresarial',
      description: 'Blindagem do seu patrimônio físico contra incidentes, focado na continuidade do seu negócio.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1z" />,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      title: 'Responsabilidade Civil',
      description: 'Proteção jurídica e patrimonial para executivos (D&O) e profissionais contra processos e falhas.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l9-4 9 4-9 4-9-4zm0 0v6l9 4 9-4V6m-9 4v10" />,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 5,
      title: 'Seguro de Vida',
      description: 'Sucessão patrimonial, proteção familiar e modelos corporativos (Keyman) para retenção de talentos.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 6,
      title: 'Outras Soluções',
      description: 'Riscos cibernéticos, engenharia, garantia contratual e transportes. Soluções de nicho para desafios complexos.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
    }
  ];

  // Dados da Seção 4 - Timeline
  const timelineSteps = [
    { title: 'Entendimento', desc: 'Mapeamos sua realidade e riscos atuais.' },
    { title: 'Análise', desc: 'Avaliamos tecnicamente o cenário.' },
    { title: 'Estudo Técnico', desc: 'Desenhamos a estrutura ideal de cobertura.' },
    { title: 'Recomendação', desc: 'Apresentamos opções com transparência.' },
    { title: 'Implantação', desc: 'Cuidamos da burocracia e ativação.' },
    { title: 'Relacionamento', desc: 'Suporte e gestão contínua durante a vigência.' }
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      {/* 1. HERO (40% Verde - Layout Dividido) */}
      <section className="relative bg-[#05191b] overflow-hidden border-b border-[#E0A63D]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 max-w-[100vw]">
          {/* Coluna Texto */}
          <div className="lg:col-span-5 px-6 lg:px-16 py-20 lg:py-32 flex flex-col justify-center z-10 relative">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#0b3337] text-[#E0A63D] text-[10px] font-bold uppercase tracking-widest mb-6 w-max border border-[#E0A63D]/30 shadow-sm">
              Soluções em Seguros
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F7F4EF] mb-8 leading-[1.15]">
              Proteção para pessoas, patrimônios e empresas, com uma consultoria construída sobre análise e relacionamento.
            </h1>
            <p className="text-[#F7F4EF]/80 text-base leading-relaxed mb-10 font-light">
              Cada seguro possui características próprias e objetivos diferentes. Nossa atuação começa pela compreensão da realidade de cada cliente para recomendar soluções alinhadas às suas necessidades, respeitando seu patrimônio, sua atividade e seus objetivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleOpenLeadModal}
                className="bg-[#E0A63D] hover:bg-[#c99333] text-[#05191b] font-bold px-8 py-3.5 rounded-xl transition-all shadow-xl text-sm transform hover:-translate-y-0.5"
              >
                Falar com um Especialista
              </button>
              <a
                href="#especialidades"
                className="bg-transparent border border-[#F7F4EF]/20 hover:border-[#E0A63D] hover:text-[#E0A63D] text-[#F7F4EF] font-bold px-8 py-3.5 rounded-xl transition-all text-sm text-center flex items-center justify-center"
              >
                Conheça nossas especialidades
              </a>
            </div>
          </div>
          
          {/* Coluna Imagem */}
          <div className="lg:col-span-7 relative h-[400px] lg:h-auto min-h-[450px]">
            <img 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=1600" 
              alt="Empresário e consultor em reunião moderna" 
              className="absolute inset-0 w-full h-full object-cover lg:rounded-l-[100px]"
            />
            <div className="absolute inset-0 lg:rounded-l-[100px] bg-gradient-to-r from-[#05191b] via-transparent to-transparent opacity-90 lg:opacity-30"></div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUÇÃO (Off White) */}
      <section className="py-24 lg:py-32 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-[#05191b]/5 group">
              <img 
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200" 
                alt="Mesa de trabalho com documentos e café" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="space-y-6">
              <span className="text-[#0b3337] font-bold tracking-widest text-xs uppercase bg-[#0b3337]/5 px-3 py-1 rounded-md">Visão Consultiva</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#05191b] leading-tight">
                Mais do que apólices, entregamos decisões conscientes.
              </h2>
              <p className="text-[#05191b]/70 text-lg leading-relaxed border-l-2 border-[#E0A63D] pl-6 py-1 font-medium">
                Os seguros fazem parte da gestão de riscos de empresas e pessoas.
              </p>
              <p className="text-[#05191b]/60 text-base leading-relaxed">
                Acreditamos na importância de compreender o contexto de cada cliente para que as decisões sejam tomadas de forma estruturada, com transparência técnica e total alinhamento às suas necessidades de longo prazo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ESPECIALIDADES (Branco) */}
      <section id="especialidades" className="py-24 bg-white scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-[#05191b] mb-4">Nossas Especialidades</h2>
            <p className="text-[#05191b]/60 text-base">Coberturas desenhadas para os desafios da sua empresa e da sua vida.</p>
          </div>

          {/* Grid 3x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {especialidades.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl border border-[#05191b]/10 overflow-hidden hover:border-[#E0A63D]/50 hover:shadow-2xl hover:shadow-[#05191b]/5 transition-all duration-300 group flex flex-col h-full">
                <div className="h-52 overflow-hidden relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05191b]/80 via-[#05191b]/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#E0A63D] shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#05191b] mb-3">{item.title}</h3>
                    <p className="text-[#05191b]/60 text-sm leading-relaxed mb-6">{item.description}</p>
                  </div>
                  <button 
                    onClick={handleOpenLeadModal}
                    className="flex items-center gap-2 text-[#E0A63D] text-sm font-bold hover:text-[#0b3337] transition-colors w-max group-hover:translate-x-1 duration-300"
                  >
                    Saiba Mais
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMO TRABALHAMOS (Off White - Timeline) */}
      <section className="py-24 bg-[#F7F4EF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-black text-[#05191b] mb-4">Como Trabalhamos</h2>
            <p className="text-[#05191b]/60 text-base">Um fluxo claro, desde o diagnóstico até a gestão do contrato.</p>
          </div>

          <div className="relative">
            {/* Linha conectora (Desktop) */}
            <div className="hidden lg:block absolute top-6 left-0 w-full h-[2px] bg-[#E0A63D]/30 z-0"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4 relative z-10">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="relative pt-2 lg:pt-0 bg-white/50 lg:bg-transparent p-6 lg:p-0 rounded-2xl border border-[#05191b]/5 lg:border-none">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-[#E0A63D] flex items-center justify-center mb-6 shadow-md text-[#05191b] font-bold z-10 relative">
                    <svg className="w-5 h-5 text-[#E0A63D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-[#05191b] mb-2">{step.title}</h3>
                  <p className="text-xs text-[#05191b]/60 leading-relaxed pr-2">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SEGURADORAS (Branco) */}
      <section className="py-20 bg-white border-b border-[#05191b]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#05191b]/40 mb-10">
            Relacionamento com as principais seguradoras do mercado
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-2xl font-black text-[#05191b]">Porto Seguro</span>
            <span className="text-2xl font-black text-[#05191b]">Allianz</span>
            <span className="text-2xl font-black text-[#05191b]">SulAmérica</span>
            <span className="text-2xl font-black text-[#05191b]">Tokyo Marine</span>
            <span className="text-2xl font-black text-[#05191b]">Sompo</span>
          </div>
        </div>
      </section>

      {/* 6. DIFERENCIAIS (Verde Claro) */}
      <section className="py-24 bg-[#0b3337]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Grid de Cards (2x2) */}
            <div className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#05191b]/40 border border-[#E0A63D]/20 p-8 rounded-2xl hover:border-[#E0A63D]/50 transition-all">
                <svg className="w-8 h-8 text-[#E0A63D] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                <h3 className="text-lg font-bold text-[#F7F4EF] mb-2">Atendimento Próximo</h3>
                <p className="text-xs text-[#F7F4EF]/60 leading-relaxed">Sua empresa possui um executivo dedicado conhecedor da sua operação.</p>
              </div>
              <div className="bg-[#05191b]/40 border border-[#E0A63D]/20 p-8 rounded-2xl hover:border-[#E0A63D]/50 transition-all">
                <svg className="w-8 h-8 text-[#E0A63D] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <h3 className="text-lg font-bold text-[#F7F4EF] mb-2">Consultoria Técnica</h3>
                <p className="text-xs text-[#F7F4EF]/60 leading-relaxed">Avaliação baseada em engenharia de riscos e conformidade securitária.</p>
              </div>
              <div className="bg-[#05191b]/40 border border-[#E0A63D]/20 p-8 rounded-2xl hover:border-[#E0A63D]/50 transition-all">
                <svg className="w-8 h-8 text-[#E0A63D] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                <h3 className="text-lg font-bold text-[#F7F4EF] mb-2">Relacionamento Contínuo</h3>
                <p className="text-xs text-[#F7F4EF]/60 leading-relaxed">Gestão ativa durante toda a vigência, não apenas na renovação.</p>
              </div>
              <div className="bg-[#05191b]/40 border border-[#E0A63D]/20 p-8 rounded-2xl hover:border-[#E0A63D]/50 transition-all">
                <svg className="w-8 h-8 text-[#E0A63D] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                <h3 className="text-lg font-bold text-[#F7F4EF] mb-2">Visão Multissegmento</h3>
                <p className="text-xs text-[#F7F4EF]/60 leading-relaxed">Sinergia entre seguros patrimoniais, frotas e pacotes de benefícios.</p>
              </div>
            </div>

            {/* Imagem */}
            <div className="order-1 lg:order-2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-[#E0A63D]/10">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" 
                alt="Equipe em atendimento e consultoria" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#05191b]/10 mix-blend-multiply"></div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CTA (Verde com Fundo Institucional) */}
      <section className="relative py-28 bg-[#05191b] overflow-hidden border-t border-[#E0A63D]/20">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600" 
          alt="Prédio corporativo institucional" 
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05191b] via-[#05191b]/80 to-transparent opacity-95"></div>
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-[#F7F4EF] mb-6 tracking-tight">
            Sua empresa está com a cobertura correta?
          </h2>
          <p className="text-[#F7F4EF]/70 text-lg mb-10 leading-relaxed font-light">
            Agende uma reunião com nossos consultores e faremos uma análise técnica sem compromisso da sua atual estrutura de seguros.
          </p>
          <button
            onClick={handleOpenLeadModal}
            className="bg-[#E0A63D] hover:bg-[#c99333] text-[#05191b] font-bold px-10 py-4 rounded-xl transition-all shadow-2xl shadow-[#E0A63D]/20 text-base transform hover:-translate-y-0.5"
          >
            Falar com um Especialista
          </button>
        </div>
      </section>

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        origem="seguros-corporativos-pessoais"
      />
    </>
  );
}