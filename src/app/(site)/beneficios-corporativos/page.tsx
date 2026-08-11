'use client';

import { useState } from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import { LeadModal } from '@/components/forms/LeadModal';

export default function SolucoesBeneficiosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleOpenLeadModal = () => {
    setIsModalOpen(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const breadcrumbItems = [
    { label: 'Soluções', href: '/#solucoes' },
    { label: 'Benefícios Corporativos', href: null }
  ];

  // Especialidades focadas em Benefícios Corporativos
  const especialidades = [
    {
      id: 1,
      title: 'Plano de Saúde Empresarial',
      description: 'Assistência médica de excelência para sua equipe, com ampla rede credenciada e modelos sob medida para o RH.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      ),
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'Seguro Saúde',
      description: 'Flexibilidade de reembolso e atendimento diferenciado para executivos e colaboradores-chave.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      ),
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'Seguro Odontológico',
      description: 'Planos completos que garantem a saúde bucal dos colaboradores com excelente custo-benefício para a empresa.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      title: 'Seguro de Vida em Grupo',
      description: 'Proteção financeira robusta para a família do colaborador, agregando valor real ao pacote de benefícios.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      ),
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 5,
      title: 'Gestão de Sinistralidade',
      description: 'Análise técnica de dados da população exposta para controle de reajustes e sustentabilidade do contrato.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      ),
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 6,
      title: 'Programas de Bem-Estar',
      description: 'Iniciativas de medicina preventiva e qualidade de vida focadas em reduzir o absenteísmo e engajar o time.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const timelineSteps = [
    { title: 'Diagnóstico', desc: 'Mapeamos a estrutura de benefícios atual e custos.' },
    { title: 'Análise de Dados', desc: 'Estudamos a sinistralidade e o perfil demográfico.' },
    { title: 'Desenho Estratégico', desc: 'Estruturamos as melhores opções de operadoras.' },
    { title: 'Negociação', desc: 'Buscamos condições comerciais alinhadas ao orçamento.' },
    { title: 'Implantação', desc: 'Apoiamos o RH na comunicação e inclusão de vidas.' },
    { title: 'Gestão Contínua', desc: 'Monitoramento periódico e suporte ao RH no dia a dia.' }
  ];

  const faqItems = [
    {
      question: 'Como a consultoria atua na gestão da sinistralidade do plano de saúde?',
      answer: 'Analisamos mensalmente os relatórios de utilização da massa de beneficiários. Com base nesses dados, implementamos campanhas de medicina preventiva e ajustamos estratégias para conter o reajuste anual sem perder a qualidade do benefício.'
    },
    {
      question: 'É possível fazer a migração de apólices e planos sem carência?',
      answer: 'Sim, dependendo do número de vidas e das regras da operadora de destino, trabalhamos com aproveitamento de prazos de carência e negociações especiais para portabilidade corporativa.'
    },
    {
      question: 'Como a consultoria apoia o departamento de RH?',
      answer: 'Atuamos como um braço estratégico do RH, desonerando a equipe de rotinas operacionais burocráticas e prestando assessoria direta em inclusões, exclusões e atendimento a executivos.'
    }
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      {/* 1. HERO */}
      <section className="relative bg-[#00393f] overflow-hidden border-b border-[#e2a535]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 max-w-[100vw]">
          <div className="lg:col-span-6 px-6 lg:px-16 py-20 lg:py-32 flex flex-col justify-center z-10 relative">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#094448] text-[#e2a535] text-[10px] font-bold uppercase tracking-widest mb-6 w-max border border-[#e2a535]/30 shadow-sm">
              Benefícios Corporativos
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#e1e7e1] mb-8 leading-[1.15]">
              Atração, retenção de talentos e sustentabilidade financeira para o seu negócio através de benefícios estratégicos.
            </h1>
            <p className="text-[#e1e7e1]/80 text-base leading-relaxed mb-10 font-light">
              Plano de saúde, odontológico e seguro de vida estruturados com foco na gestão técnica da sinistralidade e no equilíbrio orçamentário da sua empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleOpenLeadModal}
                className="bg-[#e2a535] hover:bg-[#c9932f] text-[#00393f] font-bold px-8 py-3.5 rounded-xl transition-all shadow-xl text-sm"
              >
                Falar com um Especialista
              </button>
              <a
                href="#especialidades"
                className="bg-transparent border border-[#e1e7e1]/20 hover:border-[#e2a535] hover:text-[#e2a535] text-[#e1e7e1] font-bold px-8 py-3.5 rounded-xl transition-all text-sm text-center flex items-center justify-center"
              >
                Conheça nossos serviços
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-6 relative h-[400px] lg:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600" 
              alt="Reunião de RH e diretoria analisando benefícios" 
              className="absolute inset-0 w-full h-full object-cover lg:rounded-l-[100px]"
            />
            <div className="absolute inset-0 lg:rounded-l-[100px] bg-gradient-to-r from-[#00393f] to-transparent opacity-80 lg:opacity-30"></div>
          </div>
        </div>
      </section>

      {/* BARRA DE INDICADORES */}
      <section className="bg-[#094448] border-b border-[#e2a535]/20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl lg:text-4xl font-black text-[#e2a535] mb-1">Sinistralidade</p>
              <p className="text-xs text-[#e1e7e1]/70 uppercase tracking-wider font-medium">Gestão e Controle Ativo</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-[#e2a535] mb-1">Redução</p>
              <p className="text-xs text-[#e1e7e1]/70 uppercase tracking-wider font-medium">Otimização de Custos</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-[#e2a535] mb-1">Retenção</p>
              <p className="text-xs text-[#e1e7e1]/70 uppercase tracking-wider font-medium">Valorização de Talentos</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-[#e2a535] mb-1">Suporte RH</p>
              <p className="text-xs text-[#e1e7e1]/70 uppercase tracking-wider font-medium">Desoneração Operacional</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUÇÃO */}
      <section className="py-24 lg:py-32 bg-[#e1e7e1] border-b border-[#00393f]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-[#00393f]/5 group">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200" 
                alt="Profissional de RH avaliando planos corporativos" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="space-y-6">
              <span className="text-[#094448] font-bold tracking-widest text-xs uppercase bg-[#094448]/5 px-3 py-1 rounded-full border border-[#094448]/10">Visão Estratégica</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#00393f] leading-tight">
                Equilíbrio entre cuidado com pessoas e saúde financeira da empresa.
              </h2>
              <p className="text-[#00393f]/70 text-lg leading-relaxed border-l-2 border-[#e2a535] pl-6 py-1 font-medium">
                Benefícios corporativos não devem ser apenas um custo fixo irreprimível.
              </p>
              <p className="text-[#00393f]/60 text-base leading-relaxed">
                Através de uma consultoria baseada em dados, monitoramos indicadores de utilização e sinistralidade para desenhar pacotes que atraiam os melhores profissionais sem comprometer o orçamento corporativo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ESPECIALIDADES */}
      <section id="especialidades" className="py-24 bg-white border-b border-[#00393f]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#094448] font-bold tracking-widest text-xs uppercase bg-[#e2a535]/10 px-3 py-1 rounded-full border border-[#e2a535]/30">Portfólio de Benefícios</span>
            <h2 className="text-3xl font-black text-[#00393f] mt-4 mb-3">Nossas Soluções</h2>
            <p className="text-[#00393f]/60 text-sm">Opções desenhadas para atender desde pequenas equipes até grandes corporações.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {especialidades.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl border border-[#00393f]/10 overflow-hidden hover:border-[#e2a535]/50 hover:shadow-xl hover:shadow-[#00393f]/5 transition-all group flex flex-col h-full">
                <div className="h-48 overflow-hidden relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00393f]/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#e2a535] shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#00393f] mb-3">{item.title}</h3>
                    <p className="text-[#00393f]/60 text-sm leading-relaxed mb-6">{item.description}</p>
                  </div>
                  <button 
                    onClick={handleOpenLeadModal}
                    className="flex items-center gap-2 text-[#e2a535] text-sm font-bold hover:text-[#094448] transition-colors w-max"
                  >
                    Saiba Mais
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMO TRABALHAMOS */}
      <section className="py-24 bg-[#e1e7e1] border-b border-[#00393f]/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-[#094448] font-bold tracking-widest text-xs uppercase bg-[#094448]/5 px-3 py-1 rounded-full border border-[#094448]/10">Metodologia</span>
            <h2 className="text-3xl font-black text-[#00393f] mt-4 mb-3">Como Trabalhamos</h2>
            <p className="text-[#00393f]/60 text-sm">Um fluxo estruturado para garantir a melhor entrega para o seu RH.</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-0 w-full h-[2px] bg-[#e2a535]/30 z-0"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4 relative z-10">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="relative pt-2 lg:pt-0">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-[#e2a535] flex items-center justify-center mb-6 shadow-md text-[#00393f] font-bold z-10 relative">
                    <svg className="w-5 h-5 text-[#e2a535]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-[#00393f] mb-2">{step.title}</h3>
                  <p className="text-xs text-[#00393f]/60 leading-relaxed pr-4">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. DIFERENCIAIS */}
      <section className="py-24 bg-[#094448] border-b border-[#e2a535]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#00393f]/40 border border-[#e2a535]/20 p-8 rounded-2xl shadow-sm">
                <svg className="w-8 h-8 text-[#e2a535] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                <h3 className="text-lg font-bold text-[#e1e7e1] mb-2">Análise de Sinistralidade</h3>
                <p className="text-xs text-[#e1e7e1]/60">Monitoramento contínuo dos índices de utilização para prever e mitigar reajustes.</p>
              </div>
              <div className="bg-[#00393f]/40 border border-[#e2a535]/20 p-8 rounded-2xl shadow-sm">
                <svg className="w-8 h-8 text-[#e2a535] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <h3 className="text-lg font-bold text-[#e1e7e1] mb-2">Suporte Operacional ao RH</h3>
                <p className="text-xs text-[#e1e7e1]/60">Retiramos o peso operacional do seu departamento de recursos humanos no dia a dia.</p>
              </div>
              <div className="bg-[#00393f]/40 border border-[#e2a535]/20 p-8 rounded-2xl shadow-sm">
                <svg className="w-8 h-8 text-[#e2a535] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3 className="text-lg font-bold text-[#e1e7e1] mb-2">Poder de Negociação</h3>
                <p className="text-xs text-[#e1e7e1]/60">Relacionamento sólido com operadoras para conseguir as melhores taxas e condições.</p>
              </div>
              <div className="bg-[#00393f]/40 border border-[#e2a535]/20 p-8 rounded-2xl shadow-sm">
                <svg className="w-8 h-8 text-[#e2a535] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3 className="text-lg font-bold text-[#e1e7e1] mb-2">Consultoria Preventiva</h3>
                <p className="text-xs text-[#e1e7e1]/60">Programas ativos de saúde e bem-estar para promover qualidade de vida na equipe.</p>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-[#e2a535]/20">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200" 
                alt="Equipe corporativa satisfeita com benefícios" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#00393f]/10 mix-blend-multiply"></div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-24 bg-[#e1e7e1] border-b border-[#00393f]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#094448] font-bold tracking-widest text-xs uppercase bg-[#094448]/5 px-3 py-1 rounded-full border border-[#094448]/10">Esclarecimentos</span>
            <h2 className="text-3xl font-black text-[#00393f] mt-4 mb-3">Dúvidas Frequentes</h2>
            <p className="text-[#00393f]/60 text-sm">Respostas para as principais questões de RH sobre gestão de benefícios.</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-[#00393f]/10 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left font-bold text-[#00393f] flex justify-between items-center gap-4 hover:text-[#e2a535] transition-colors"
                >
                  <span className="text-base">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-[#e2a535] shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-[#00393f]/70 text-sm leading-relaxed border-t border-[#00393f]/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="relative py-28 bg-[#00393f] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600" 
          alt="Corporativo institucional" 
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00393f] to-transparent opacity-90"></div>
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#094448] text-[#e2a535] text-xs font-bold uppercase tracking-widest mb-6 border border-[#e2a535]/30 shadow-sm">
            Próximo Passo
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#e1e7e1] mb-6 tracking-tight">
            Pronto para otimizar os benefícios da sua empresa?
          </h2>
          <p className="text-[#e1e7e1]/70 text-lg mb-10 leading-relaxed font-light">
            Agende uma reunião técnica com nossos consultores para avaliarmos o plano atual e a sinistralidade da sua carteira.
          </p>
          <button
            onClick={handleOpenLeadModal}
            className="bg-[#e2a535] hover:bg-[#c9932f] text-[#00393f] font-bold px-10 py-4 rounded-xl transition-all shadow-2xl shadow-[#e2a535]/20 text-base"
          >
            Falar com um Especialista
          </button>
        </div>
      </section>

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        origem="beneficios-corporativos"
        produtos={[
          'Plano de Saúde Empresarial',
          'Seguro Saúde',
          'Seguro Odontológico',
          'Seguro de Vida em Grupo',
          'Gestão de Sinistralidade',
          'Programas de Bem-Estar',
        ]}
      />
    </>
  );
}