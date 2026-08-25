'use client';

import { useState } from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import { LeadModal } from '@/components/forms/LeadModal';

export default function SolucoesBeneficiosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
  // grupo: 'planos' | 'gestao' | 'bemestar' — separação visual pedida na spec WEB-002 (seção 5)
  const especialidades = [
    {
      id: 1,
      grupo: 'planos',
      title: 'Plano de Saúde Empresarial',
      description: 'Assistência médica de excelência para sua equipe, com ampla rede credenciada e modelos sob medida para o RH.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      ),
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      grupo: 'planos',
      title: 'Seguro Saúde',
      description: 'Diferente do plano de saúde tradicional: flexibilidade de reembolso e atendimento diferenciado para executivos e colaboradores-chave.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      ),
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      grupo: 'planos',
      title: 'Seguro Odontológico',
      description: 'Planos completos que garantem a saúde bucal dos colaboradores com excelente custo-benefício para a empresa.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      grupo: 'planos',
      title: 'Seguro de Vida em Grupo',
      description: 'Proteção financeira robusta para a família do colaborador, agregando valor real ao pacote de benefícios.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      ),
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 5,
      grupo: 'gestao',
      title: 'Gestão de Sinistralidade',
      description: 'Análise técnica de dados da população exposta, auditoria de faturas e negociação de reajustes para sustentabilidade do contrato.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      ),
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 6,
      grupo: 'bemestar',
      title: 'Programas de Bem-Estar',
      description: 'Iniciativas de medicina preventiva e qualidade de vida focadas em reduzir o absenteísmo e engajar o time.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const GRUPOS_ESPECIALIDADES = [
    { chave: 'planos', titulo: 'Planos e Benefícios', subtitulo: 'Saúde, odontológico e vida em grupo.' },
    { chave: 'gestao', titulo: 'Gestão', subtitulo: 'Sinistralidade, auditoria e reajustes.' },
    { chave: 'bemestar', titulo: 'Bem-Estar', subtitulo: 'Programas preventivos e qualidade de vida.' },
  ] as const;

  // Dores prioritárias (spec WEB-002 seção 4) — cada uma pode levar ao mesmo diagnóstico
  const dores = [
    { pergunta: 'Seu plano está com custos crescentes a cada renovação?', resposta: 'Analisamos sua carteira e comparamos alternativas reais de mercado.' },
    { pergunta: 'Os reajustes são difíceis de controlar ou contestar?', resposta: 'Atuamos na negociação técnica com dados de sinistralidade.' },
    { pergunta: 'A rede assistencial não atende o que sua equipe precisa?', resposta: 'Avaliamos cobertura real vs. necessidade antes de qualquer troca.' },
    { pergunta: 'Seu RH está gastando tempo demais resolvendo problemas do plano?', resposta: 'A LifitSeg pode assumir a operação e organizar o atendimento.' },
    { pergunta: 'Falta suporte técnico quando surgem casos complexos?', resposta: 'Temos canal direto, sem depender de central de atendimento genérica.' },
    { pergunta: 'A comunicação com o intermediador atual é difícil?', resposta: 'Assumimos esse relacionamento como parte da gestão contínua.' },
  ];

  // Vitrine seletiva de operadoras de Saúde (spec WEB-002 seção 8) — não mistura seguradoras de Auto/Frota/Empresarial
  const operadorasSaude = [
    { nome: 'Bradesco Saúde', arquivo: 'bradesco' },
    { nome: 'SulAmérica', arquivo: 'sulamerica' },
    { nome: 'Amil', arquivo: 'amil' },
    { nome: 'Porto Seguro', arquivo: 'porto' },
    { nome: 'Unimed', arquivo: 'unimed' },
    { nome: 'Hapvida', arquivo: 'hapvida' },
    { nome: 'Omint', arquivo: 'omint' },
    { nome: 'Care Plus', arquivo: 'careplus' },
  ];

  const timelineSteps = [
    { title: 'Diagnóstico', desc: 'Entendemos sua estrutura de benefícios e custos atuais, sem compromisso.' },
    { title: 'Análise de Dados', desc: 'Olhamos para a utilização real do plano, não só para o preço.' },
    { title: 'Desenho Estratégico', desc: 'Comparamos operadoras e propomos o que realmente cabe na sua empresa.' },
    { title: 'Negociação', desc: 'Buscamos as melhores condições comerciais com argumentos técnicos.' },
    { title: 'Implantação', desc: 'Cuidamos da comunicação e inclusão de vidas junto ao seu RH.' },
    { title: 'Gestão Contínua', desc: 'Acompanhamos o dia a dia para que o RH não precise resolver tudo sozinho.' }
  ];

  const faqItems = [
    {
      question: 'Como a consultoria atua na gestão da sinistralidade do plano de saúde?',
      answer: 'Analisamos mensalmente os relatórios de utilização da massa de beneficiários. Com base nesses dados, implementamos campanhas de medicina preventiva e ajustamos estratégias para conter o reajuste anual sem perder a qualidade do benefício.'
    },
    {
      question: 'É possível reduzir ou contestar o reajuste anual da operadora?',
      answer: 'É possível construir um dossiê técnico com dados de sinistralidade para negociar o reajuste. O resultado final depende da política comercial de cada operadora e das condições contratuais vigentes.'
    },
    {
      question: 'Como funciona a troca de operadora de plano de saúde?',
      answer: 'Avaliamos alternativas de mercado compatíveis com o perfil da sua empresa e conduzimos a transição. Prazos, condições e aproveitamento de carência variam de acordo com a operadora de origem e de destino.'
    },
    {
      question: 'É possível fazer a migração de apólices e planos sem carência?',
      answer: 'Depende do número de vidas e das regras da operadora de destino. Buscamos aproveitamento de prazos de carência e negociações de portabilidade sempre que o contrato permitir.'
    },
    {
      question: 'A rede credenciada muda quando trocamos de operadora?',
      answer: 'Sim, cada operadora tem sua própria rede. Antes de qualquer recomendação, comparamos a rede assistencial disponível com o que a sua equipe efetivamente utiliza.'
    },
    {
      question: 'Como funciona a implantação para uma empresa nova cliente?',
      answer: 'Conduzimos a inclusão de vidas junto ao seu RH, organizamos a documentação necessária e acompanhamos o início de vigência para reduzir ruídos na comunicação com os colaboradores.'
    },
    {
      question: 'Como a consultoria apoia o departamento de RH no dia a dia?',
      answer: 'Atuamos como um braço estratégico do RH, desonerando a equipe de rotinas operacionais burocráticas e prestando assessoria direta em inclusões, exclusões e atendimento a executivos.'
    },
    {
      question: 'Como comparar diferentes propostas de operadoras?',
      answer: 'Analisamos cobertura, rede, coparticipação e histórico de reajuste de cada proposta lado a lado, para que a decisão considere o custo total e não apenas o valor da mensalidade.'
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      {/* 1. HERO */}
      <section className="relative bg-lifitseg-dark overflow-hidden border-b border-primary/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 max-w-[100vw]">
          <div className="lg:col-span-6 px-6 lg:px-16 py-20 lg:py-32 flex flex-col justify-center z-10 relative">
            <span className="inline-block px-4 py-1.5 rounded-full bg-lifitseg-surface text-primary text-[10px] font-bold uppercase tracking-widest mb-6 w-max border border-primary/30 shadow-sm">
              Benefícios Corporativos
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-lifitseg-offwhite mb-8 leading-[1.15]">
              Seu plano de saúde empresarial está custando mais do que deveria? Ou entregando menos do que sua empresa precisa?
            </h1>
            <p className="text-lifitseg-offwhite/80 text-base leading-relaxed mb-10 font-light">
              A LifitSeg analisa sua carteira, compara alternativas, atua na negociação e assume parte relevante da gestão operacional do benefício para que o RH tenha mais controle e menos fricção.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleOpenLeadModal}
                className="bg-primary hover:bg-primary/80 text-lifitseg-dark font-bold px-8 py-3.5 rounded-xl transition-all shadow-xl text-sm"
              >
                Avaliar minha carteira
              </button>
              <a
                href="#especialidades"
                className="bg-transparent border border-lifitseg-offwhite/20 hover:border-primary hover:text-primary text-lifitseg-offwhite font-bold px-8 py-3.5 rounded-xl transition-all text-sm text-center flex items-center justify-center"
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
            <div className="absolute inset-0 lg:rounded-l-[100px] bg-gradient-to-r from-lifitseg-dark to-transparent opacity-80 lg:opacity-30"></div>
          </div>
        </div>
      </section>

      {/* BARRA DE INDICADORES */}
      <section className="bg-lifitseg-surface border-b border-primary/20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl lg:text-4xl font-black text-primary mb-1">Sinistralidade</p>
              <p className="text-xs text-lifitseg-offwhite/70 uppercase tracking-wider font-medium">Gestão e Controle Ativo</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-primary mb-1">Redução</p>
              <p className="text-xs text-lifitseg-offwhite/70 uppercase tracking-wider font-medium">Otimização de Custos</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-primary mb-1">Retenção</p>
              <p className="text-xs text-lifitseg-offwhite/70 uppercase tracking-wider font-medium">Valorização de Talentos</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-primary mb-1">Suporte RH</p>
              <p className="text-xs text-lifitseg-offwhite/70 uppercase tracking-wider font-medium">Desoneração Operacional</p>
            </div>
          </div>
        </div>
      </section>

      {/* DORES — bloco dor → solução (spec WEB-002 seção 6) */}
      <section className="py-20 bg-white border-b border-lifitseg-dark/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-lifitseg-surface font-bold tracking-widest text-xs uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/30">Reconhece isso?</span>
            <h2 className="text-3xl font-black text-lifitseg-dark mt-4">Os problemas que mais custam caro costumam passar despercebidos</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dores.map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-lifitseg-dark/10 bg-lifitseg-offwhite p-6">
                <p className="text-sm font-bold text-lifitseg-dark mb-1">{item.pergunta}</p>
                <p className="text-xs text-lifitseg-dark/60 leading-relaxed">{item.resposta}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button
              onClick={handleOpenLeadModal}
              className="bg-primary hover:bg-primary/80 text-lifitseg-dark font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm"
            >
              Avaliar minha carteira
            </button>
          </div>
        </div>
      </section>

      {/* 2. INTRODUÇÃO */}
      <section className="py-24 lg:py-32 bg-lifitseg-offwhite border-b border-lifitseg-dark/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-lifitseg-dark/5 group">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200" 
                alt="Profissional de RH avaliando planos corporativos" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="space-y-6">
              <span className="text-lifitseg-surface font-bold tracking-widest text-xs uppercase bg-lifitseg-surface/5 px-3 py-1 rounded-full border border-lifitseg-surface/10">Visão Estratégica</span>
              <h2 className="text-3xl sm:text-4xl font-black text-lifitseg-dark leading-tight">
                Equilíbrio entre cuidado com pessoas e saúde financeira da empresa.
              </h2>
              <p className="text-lifitseg-dark/70 text-lg leading-relaxed border-l-2 border-primary pl-6 py-1 font-medium">
                Benefícios corporativos não devem ser apenas um custo fixo irreprimível.
              </p>
              <p className="text-lifitseg-dark/60 text-base leading-relaxed">
                Através de uma consultoria baseada em dados, monitoramos indicadores de utilização e sinistralidade para desenhar pacotes que atraiam os melhores profissionais sem comprometer o orçamento corporativo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ESPECIALIDADES */}
      <section id="especialidades" className="py-24 bg-white border-b border-lifitseg-dark/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-lifitseg-surface font-bold tracking-widest text-xs uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/30">Portfólio de Benefícios</span>
            <h2 className="text-3xl font-black text-lifitseg-dark mt-4 mb-3">Nossas Soluções</h2>
            <p className="text-lifitseg-dark/60 text-sm">Opções desenhadas para atender desde pequenas equipes até grandes corporações.</p>
          </div>

          {GRUPOS_ESPECIALIDADES.map((grupo) => (
            <div key={grupo.chave} className="mb-16 last:mb-0">
              <div className="mb-8">
                <h3 className="text-xl font-black text-lifitseg-dark">{grupo.titulo}</h3>
                <p className="text-lifitseg-dark/50 text-xs mt-1">{grupo.subtitulo}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {especialidades.filter((item) => item.grupo === grupo.chave).map((item) => (
                  <div key={item.id} className="bg-white rounded-3xl border border-lifitseg-dark/10 overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-lifitseg-dark/5 transition-all group flex flex-col h-full">
                    <div className="h-48 overflow-hidden relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-lifitseg-dark/80 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {item.icon}
                        </svg>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-lifitseg-dark mb-3">{item.title}</h3>
                        <p className="text-lifitseg-dark/60 text-sm leading-relaxed mb-6">{item.description}</p>
                      </div>
                      <button
                        onClick={handleOpenLeadModal}
                        className="flex items-center gap-2 text-primary text-sm font-bold hover:text-lifitseg-surface transition-colors w-max"
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
          ))}
        </div>
      </section>

      {/* REFERÊNCIAS EM SAÚDE — entrada estratégica pro módulo (spec WEB-002 seção 7) */}
      <section className="py-20 bg-lifitseg-dark border-b border-primary/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-lifitseg-surface text-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-primary/30">
            Referências em Saúde
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-lifitseg-offwhite mb-4">
            Já sabe qual hospital, laboratório ou clínica você precisa ter acesso?
          </h2>
          <p className="text-lifitseg-offwhite/70 text-base leading-relaxed mb-10 max-w-2xl mx-auto font-light">
            Pesquise instituições de referência por região e especialidade. Quando encontrar a que você precisa,
            a LifitSeg identifica quais planos oferecem acesso a ela e compara as alternativas para a sua empresa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/referencias-saude"
              className="bg-primary hover:bg-primary/80 text-lifitseg-dark font-bold px-8 py-3.5 rounded-xl transition-all shadow-xl text-sm"
            >
              Quero um plano com acesso a esta referência
            </a>
            <button
              onClick={handleOpenLeadModal}
              className="bg-transparent border border-lifitseg-offwhite/20 hover:border-primary hover:text-primary text-lifitseg-offwhite font-bold px-8 py-3.5 rounded-xl transition-all text-sm"
            >
              Encontrar meu plano
            </button>
          </div>
        </div>
      </section>

      {/* VITRINE DE OPERADORAS DE SAÚDE — apenas Saúde, sem misturar seguradoras de Auto/Frota (spec WEB-002 seção 8) */}
      <section className="py-14 bg-lifitseg-offwhite border-b border-lifitseg-dark/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold tracking-widest text-lifitseg-dark/50 uppercase mb-8">
            Operadoras de Saúde com as quais trabalhamos
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {operadorasSaude.map((op, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center rounded-2xl border border-lifitseg-dark/10 bg-white px-5 py-4 text-center shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="relative mb-3 flex h-10 w-24 items-center justify-center">
                  <img
                    src={`/seguradoras/${op.arquivo}.png`}
                    alt={op.nome}
                    className="max-h-10 w-auto object-contain"
                  />
                </div>
                <span className="text-xs font-bold tracking-tight text-lifitseg-dark/80">{op.nome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMO TRABALHAMOS */}
      <section className="py-24 bg-lifitseg-offwhite border-b border-lifitseg-dark/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-lifitseg-surface font-bold tracking-widest text-xs uppercase bg-lifitseg-surface/5 px-3 py-1 rounded-full border border-lifitseg-surface/10">Metodologia</span>
            <h2 className="text-3xl font-black text-lifitseg-dark mt-4 mb-3">Como Trabalhamos</h2>
            <p className="text-lifitseg-dark/60 text-sm">Um fluxo estruturado para garantir a melhor entrega para o seu RH.</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-0 w-full h-[2px] bg-primary/30 z-0"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4 relative z-10">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="relative pt-2 lg:pt-0">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-primary flex items-center justify-center mb-6 shadow-md text-lifitseg-dark font-bold z-10 relative">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-lifitseg-dark mb-2">{step.title}</h3>
                  <p className="text-xs text-lifitseg-dark/60 leading-relaxed pr-4">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. DIFERENCIAIS */}
      <section className="py-24 bg-lifitseg-surface border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-lifitseg-dark/40 border border-primary/20 p-8 rounded-2xl shadow-sm">
                <svg className="w-8 h-8 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                <h3 className="text-lg font-bold text-lifitseg-offwhite mb-2">Análise de Sinistralidade</h3>
                <p className="text-xs text-lifitseg-offwhite/60">Monitoramento contínuo dos índices de utilização para prever e mitigar reajustes.</p>
              </div>
              <div className="bg-lifitseg-dark/40 border border-primary/20 p-8 rounded-2xl shadow-sm">
                <svg className="w-8 h-8 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <h3 className="text-lg font-bold text-lifitseg-offwhite mb-2">Suporte Operacional ao RH</h3>
                <p className="text-xs text-lifitseg-offwhite/60">Retiramos o peso operacional do seu departamento de recursos humanos no dia a dia.</p>
              </div>
              <div className="bg-lifitseg-dark/40 border border-primary/20 p-8 rounded-2xl shadow-sm">
                <svg className="w-8 h-8 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3 className="text-lg font-bold text-lifitseg-offwhite mb-2">Poder de Negociação</h3>
                <p className="text-xs text-lifitseg-offwhite/60">Relacionamento sólido com operadoras para conseguir as melhores taxas e condições.</p>
              </div>
              <div className="bg-lifitseg-dark/40 border border-primary/20 p-8 rounded-2xl shadow-sm">
                <svg className="w-8 h-8 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3 className="text-lg font-bold text-lifitseg-offwhite mb-2">Consultoria Preventiva</h3>
                <p className="text-xs text-lifitseg-offwhite/60">Programas ativos de saúde e bem-estar para promover qualidade de vida na equipe.</p>
              </div>
              <div className="bg-lifitseg-dark/40 border border-primary/20 p-8 rounded-2xl shadow-sm">
                <svg className="w-8 h-8 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                <h3 className="text-lg font-bold text-lifitseg-offwhite mb-2">Comparação de Operadoras</h3>
                <p className="text-xs text-lifitseg-offwhite/60">Análise técnica e imparcial entre alternativas de mercado, sem vínculo que comprometa a recomendação.</p>
              </div>
              <div className="bg-lifitseg-dark/40 border border-primary/20 p-8 rounded-2xl shadow-sm">
                <svg className="w-8 h-8 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <h3 className="text-lg font-bold text-lifitseg-offwhite mb-2">Análise Contratual</h3>
                <p className="text-xs text-lifitseg-offwhite/60">Revisão de cláusulas, reajustes e coparticipação para identificar riscos antes da assinatura.</p>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-primary/20">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200" 
                alt="Equipe corporativa satisfeita com benefícios" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-lifitseg-dark/10 mix-blend-multiply"></div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-24 bg-lifitseg-offwhite border-b border-lifitseg-dark/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-lifitseg-surface font-bold tracking-widest text-xs uppercase bg-lifitseg-surface/5 px-3 py-1 rounded-full border border-lifitseg-surface/10">Esclarecimentos</span>
            <h2 className="text-3xl font-black text-lifitseg-dark mt-4 mb-3">Dúvidas Frequentes</h2>
            <p className="text-lifitseg-dark/60 text-sm">Respostas para as principais questões de RH sobre gestão de benefícios.</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-lifitseg-dark/10 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left font-bold text-lifitseg-dark flex justify-between items-center gap-4 hover:text-primary transition-colors"
                >
                  <span className="text-base">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-lifitseg-dark/70 text-sm leading-relaxed border-t border-lifitseg-dark/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="relative py-28 bg-lifitseg-dark overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600" 
          alt="Corporativo institucional" 
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lifitseg-dark to-transparent opacity-90"></div>
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-lifitseg-surface text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/30 shadow-sm">
            Próximo Passo
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-lifitseg-offwhite mb-6 tracking-tight">
            Pronto para otimizar os benefícios da sua empresa?
          </h2>
          <p className="text-lifitseg-offwhite/70 text-lg mb-10 leading-relaxed font-light">
            Agende uma reunião técnica com nossos consultores para avaliarmos o plano atual e a sinistralidade da sua carteira.
          </p>
          <button
            onClick={handleOpenLeadModal}
            className="bg-primary hover:bg-primary/80 text-lifitseg-dark font-bold px-10 py-4 rounded-xl transition-all shadow-2xl shadow-primary/20 text-base"
          >
            Avaliar minha carteira
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