'use client'

import { useState } from 'react'
import Image from 'next/image'
import { LeadModal } from '@/components/forms/LeadModal'

// ==========================================
// MOCK DATA & CONSTANTS
// ==========================================
// NOTA: categoria/destaque abaixo é uma classificação nossa em cima do array já existente
// (spec WEB-001 pede separar Saúde/Benefícios de Seguros). Confirmar com Raphael se algum
// item ficou na categoria errada — em especial Sobam e Yelum, cuja atuação exata não temos
// 100% de certeza (assumimos Sobam como operador de saúde regional e Yelum como seguradora).
const OPERATORS = [
  { name: 'Bradesco Saúde', file: 'bradesco', categoria: 'saude', destaque: true },
  { name: 'SulAmérica', file: 'sulamerica', categoria: 'saude', destaque: true },
  { name: 'Amil', file: 'amil', categoria: 'saude', destaque: true },
  { name: 'Porto Seguro', file: 'porto', categoria: 'saude', destaque: true },
  { name: 'Omint', file: 'omint', categoria: 'saude', destaque: false },
  { name: 'Care Plus', file: 'careplus', categoria: 'saude', destaque: false },
  { name: 'Unimed', file: 'unimed', categoria: 'saude', destaque: true },
  { name: 'Seguros Unimed', file: 'seguros_unimed', categoria: 'seguros', destaque: false },
  { name: 'Tokio Marine', file: 'tokio', categoria: 'seguros', destaque: false },
  { name: 'Liberty Seguros', file: 'liberty', categoria: 'seguros', destaque: false },
  { name: 'Mapfre', file: 'mapfre', categoria: 'seguros', destaque: false },
  { name: 'Sobam', file: 'sobam', categoria: 'saude', destaque: false },
  { name: 'Hapvida', file: 'hapvida', categoria: 'saude', destaque: true },
  { name: 'Allianz', file: 'allianz', categoria: 'seguros', destaque: false },
  { name: 'HDI Seguros', file: 'hdi', categoria: 'seguros', destaque: false },
  { name: 'Yelum', file: 'yelum', categoria: 'seguros', destaque: false },
  { name: 'Suhai', file: 'suhai', categoria: 'seguros', destaque: false },
  { name: 'Alice', file: 'alice', categoria: 'saude', destaque: false },
  { name: 'Sami', file: 'sami', categoria: 'saude', destaque: false },
  { name: 'New Leader Saúde', file: 'new', categoria: 'saude', destaque: false },
  { name: 'Plena Saúde', file: 'plena', categoria: 'saude', destaque: false },
  { name: 'Única Saúde', file: 'unica', categoria: 'saude', destaque: false },
  { name: 'Zurich', file: 'zurich', categoria: 'seguros', destaque: false },
]

const DORES = [
  'Seu plano está ficando caro a cada renovação?',
  'Você sente que paga muito e recebe pouco?',
  'A rede assistencial atende realmente o que sua equipe precisa?',
  'Seu RH está absorvendo demandas que deveriam estar com a consultoria?',
  'Você tem dificuldade para falar com o intermediador quando surge um problema?',
  'Sua empresa não sabe exatamente o que está provocando a sinistralidade?',
]

const COMO_RESOLVEMOS = [
  {
    title: 'Comparação de Operadoras',
    description:
      'Análise técnica e imparcial entre as principais operadoras do mercado, sem vínculo que comprometa a recomendação.',
  },
  {
    title: 'Análise Contratual',
    description:
      'Revisão detalhada de cláusulas, reajustes e coparticipação para identificar riscos e oportunidades.',
  },
  {
    title: 'Negociação de Reajustes',
    description:
      'Dossiê técnico e argumentação baseada em dados para contestar aumentos desproporcionais na renovação.',
  },
  {
    title: 'Gestão do Benefício',
    description:
      'Acompanhamento contínuo da apólice, sinistralidade e utilização ao longo de todo o contrato.',
  },
  {
    title: 'Suporte ao RH',
    description:
      'Absorvemos as demandas operacionais do dia a dia: movimentações cadastrais, sinistros e reembolsos.',
  },
  {
    title: 'Acompanhamento Próximo',
    description:
      'Canal direto com a LifitSeg, sem depender de centrais de atendimento genéricas da operadora.',
  },
]

const AUDIENCES = [
  {
    title: 'Pessoa Física',
    description: 'Proteção para você, sua família, seu patrimônio e seus veículos.',
  },
  {
    title: 'Pequenas e Médias Empresas',
    description:
      'Benefícios e seguros alinhados ao momento e à realidade financeira da empresa.',
  },
  {
    title: 'Empresas',
    description: 'Gestão estruturada de benefícios, seguros e riscos corporativos.',
  },
  {
    title: 'Grandes Empresas',
    description:
      'Gestão estratégica de grandes contas, relacionamento, carteira, renovação e oportunidades.',
  },
]

const DIFFERENTIALS = [
  {
    number: '01',
    title: 'Consultoria de Alta Autoridade',
    description:
      'Superamos o modelo tradicional de corretagem reativa. Somos especialistas que ajudam você a entender, comparar e proteger o que importa para o seu negócio.',
    badge: 'Metodologia BMA',
  },
  {
    number: '02',
    title: 'Strategy Business & Sinistralidade',
    description:
      'Garantimos sustentabilidade financeira com auditoria contínua, análise preditiva de utilização e mitigação ativa de reajustes.',
    badge: 'Gestão Financeira',
  },
  {
    number: '03',
    title: 'Seu RH não deveria ser o SAC do plano de saúde',
    description:
      'Assumimos as demandas burocráticas: movimentações cadastrais, sinistros, reembolso e conciliação de faturas.',
    badge: 'Suporte ao RH',
  },
  {
    number: '04',
    title: 'Tecnologia Ecossistêmica LifCore',
    description:
      'Acompanhamento em tempo real, chamados centralizados e relatórios estratégicos integrados em nossa plataforma própria.',
    badge: 'Proprietary Tech',
  },
]

const SOLUTIONS = [
  {
    id: 'saude',
    category: 'Especialidade • Saúde & Odonto',
    title: 'Benefícios Corporativos & Saúde',
    description:
      'Planos de Saúde e Odontológicos PME e Corporativos. Redesenho de apólices, coparticipação inteligente e negociação técnica de reajustes.',
    metrics: 'Até 30% de otimização de custos sem perda de cobertura',
    cta: 'Avaliar minha carteira',
    featured: true,
  },
  {
    id: 'vida',
    category: 'Especialidade • Proteção de Pessoas',
    title: 'Seguro de Vida em Grupo & Keyman',
    description:
      'Proteção estratégica para sócios, executivos e colaboradores. Garantia de continuidade do negócio e alinhamento com convenções coletivas.',
    metrics: 'Planos customizados e isenção fiscal',
    cta: 'Proteger minha equipe executiva',
    featured: false,
  },
  {
    id: 'patrimonio',
    category: 'Especialidade • Riscos Corporativos',
    title: 'Riscos Patrimoniais & Empresariais',
    description:
      'Proteção integral de ativos físicos, responsabilidade civil executiva (D&O), seguros operacionais e garantias contratuais.',
    metrics: 'Análise de exposição tailor-made',
    cta: 'Avaliar a exposição da minha empresa',
    featured: false,
  },
  {
    id: 'frotas',
    category: 'Especialidade • Mobilidade & Logística',
    title: 'Gestão de Frotas & Automóvel',
    description:
      'Consultoria especializada para frotas leves e pesadas. Telemetria, controle de sinistralidade e apólices otimizadas por perfil.',
    metrics: 'Redução do TCO da frota corporativa',
    cta: 'Avaliar minha frota',
    featured: false,
  },
]

const METHOD_STEPS = [
  {
    step: '01',
    title: 'Diagnóstico & Auditoria',
    description:
      'Mapeamento rigoroso das apólices atuais, histórico de sinistralidade, faturamento e gargalos operacionais.',
  },
  {
    step: '02',
    title: 'Arquitetura de Riscos',
    description:
      'Desenho de estratégias sob medida, alinhando equilíbrio financeiro, cobertura abrangente e satisfação dos beneficiários.',
  },
  {
    step: '03',
    title: 'Implantação & Transição',
    description:
      'Migração e reestruturação conduzidas com fricção zero para a equipe, garantindo continuidade e conformidade jurídica.',
  },
  {
    step: '04',
    title: 'Gestão Contínua via LifCore',
    description:
      'Monitoramento ativo de indicadores, antecipação de reajustes e suporte full-service no dia a dia do seu RH.',
  },
]

const INSIGHTS = [
  {
    title: 'Como mitigar reajustes abusivos no Plano de Saúde Empresarial',
    category: 'Benefícios Corporativos',
    date: 'Maio 2026',
    readTime: '4 min de leitura',
    summary:
      'Entenda como o uso de inteligência de dados e a auditoria de sinistralidade evitam aumentos desproporcionais na renovação do contrato.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'A relevância do Seguro Keyman para a governança de startups e PMEs',
    category: 'Gestão de Riscos',
    date: 'Abril 2026',
    readTime: '6 min de leitura',
    summary:
      'Como proteger a continuidade das operações e o valor de mercado da sua empresa diante do afastamento involuntário de executivos-chave.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Gestão Operacional de Benefícios: Reduzindo o backlog do RH',
    category: 'Produtividade',
    date: 'Abril 2026',
    readTime: '5 min de leitura',
    summary:
      'Estratégias para terceirizar com segurança as rotinas de movimentação, inclusão e atendimento direto aos colaboradores.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
  },
]

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [produtoSelecionado, setProdutoSelecionado] = useState<string | undefined>(undefined)

  function abrirModal(produto?: string) {
    setProdutoSelecionado(produto)
    setIsModalOpen(true)
  }

  return (
    <div className="font-sans antialiased selection:bg-primary selection:text-lifitseg-dark">
      {/* HERO — bookend verde */}
      <section className="relative overflow-hidden bg-gradient-to-b from-lifitseg-dark via-lifitseg-dark to-lifitseg-dark-deep pt-16 pb-24 text-lifitseg-offwhite lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1800"
            alt="Consultora conversando com cliente em reunião"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="pointer-events-none absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span className="text-xs font-semibold tracking-wide text-lifitseg-offwhite/80 uppercase">
                Consultoria Estratégica em Seguros &amp; Benefícios
              </span>
            </div>

            <h1 className="mb-6 text-4xl leading-[1.1] font-black tracking-tight sm:text-5xl lg:text-6xl">
              Seu plano de saúde está custando mais do que deveria? Ou entregando menos do que
              você ou sua empresa precisa?
            </h1>

            <p className="mb-10 text-lg leading-relaxed font-normal text-lifitseg-offwhite/70 sm:text-xl">
              A LifitSeg compara operadoras, analisa contratos, negocia reajustes e assume a
              gestão do benefício para reduzir custos e diminuir o trabalho operacional do RH.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() => abrirModal('Diagnóstico de Plano')}
                className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-semibold text-lifitseg-dark shadow-xl transition-all hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0 sm:w-auto"
              >
                <span>Solicitar Diagnóstico</span>
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <a
                href="#operadoras"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 px-8 py-4 text-base font-semibold text-lifitseg-offwhite transition-all hover:border-white/25 hover:bg-white/5 sm:w-auto"
              >
                Comparar Operadoras
              </a>
            </div>

            {/* Prova real (não números fabricados) — mesma avaliação Google já publicada em Sobre e Conhecimento */}
            <div className="mt-14 flex flex-col items-center justify-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:gap-10">
              <a
                href="https://share.google/lQoH1vfK1Kqz2W04m"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-lifitseg-offwhite/80 transition-colors hover:text-lifitseg-offwhite"
              >
                <span className="flex text-primary">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </span>
                <span className="text-sm font-semibold">4.9 no Google</span>
                <span className="text-xs text-lifitseg-offwhite/50">(41 avaliações)</span>
              </a>
              <span className="hidden h-4 w-px bg-white/10 sm:block" />
              <span className="text-xs font-medium tracking-wider text-lifitseg-offwhite/50 uppercase">
                Consultor certificado SUSEP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* DORES — branco */}
      <section id="dores" className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-3 block text-xs font-bold tracking-widest text-primary uppercase">
            Reconhece isso?
          </span>
          <h2 className="mb-12 text-3xl font-extrabold tracking-tight text-lifitseg-dark sm:text-4xl">
            Os problemas que mais custam caro costumam passar despercebidos
          </h2>

          <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
            {DORES.map((dor, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-black/10 bg-lifitseg-offwhite p-5"
              >
                <span className="mt-0.5 text-primary">●</span>
                <p className="text-sm leading-relaxed text-lifitseg-dark/75">{dor}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-base font-semibold text-lifitseg-dark">
            É possível ter uma operação mais simples, com mais acompanhamento e menos fricção.
          </p>
        </div>
      </section>

      {/* COMO A LIFITSEG RESOLVE — off-white */}
      <section id="como-resolvemos" className="bg-lifitseg-offwhite py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-3 block text-xs font-bold tracking-widest text-primary uppercase">
              Como atuamos
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-lifitseg-dark sm:text-4xl">
              A LifitSeg assume o que hoje sobra para o seu RH
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COMO_RESOLVEMOS.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all hover:border-primary/40"
              >
                <h3 className="mb-2 text-base font-bold text-lifitseg-dark">{item.title}</h3>
                <p className="text-xs leading-relaxed text-lifitseg-dark/60">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => abrirModal('Diagnóstico de Plano')}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-lifitseg-dark shadow-lg transition-all hover:opacity-90"
            >
              Solicitar Diagnóstico
            </button>
          </div>
        </div>
      </section>

      {/* PROVA / AUTORIDADE — branco (prova real disponível hoje; cases de clientes entram aqui quando autorizados) */}
      <section id="prova" className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <a
              href="https://share.google/lQoH1vfK1Kqz2W04m"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between rounded-2xl border border-black/10 bg-lifitseg-offwhite p-8 transition-all hover:border-primary/40"
            >
              <div>
                <span className="flex text-lg text-primary">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </span>
                <p className="mt-3 text-2xl font-black text-lifitseg-dark">4.9 / 5.0</p>
                <p className="mt-1 text-sm text-lifitseg-dark/60">41 avaliações reais no Google</p>
              </div>
              <span className="mt-6 text-xs font-semibold text-primary group-hover:underline">
                Ver avaliações →
              </span>
            </a>

            <a
              href="/sobre-e-conhecimento#quem-somos"
              className="flex flex-col justify-between rounded-2xl border border-black/10 bg-lifitseg-offwhite p-8 transition-all hover:border-primary/40"
            >
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-lifitseg-dark text-sm font-bold text-lifitseg-offwhite">
                  RA
                </div>
                <p className="text-lg font-bold text-lifitseg-dark">Raphael Abaid</p>
                <p className="mt-1 text-sm text-lifitseg-dark/60">
                  Sócio Diretor · Certificação SUSEP · MBA em Gestão de Saúde
                </p>
              </div>
              <span className="mt-6 text-xs font-semibold text-primary">Conheça o fundador →</span>
            </a>
          </div>
        </div>
      </section>

      {/* PARA QUEM TRABALHAMOS — branco */}
      <section id="para-quem" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-lifitseg-dark sm:text-4xl">
              Soluções para diferentes momentos e necessidades
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map((aud, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-black/10 bg-lifitseg-offwhite p-6 text-center transition-all hover:border-primary/40"
              >
                <h3 className="mb-2 text-base font-bold text-lifitseg-dark">{aud.title}</h3>
                <p className="text-xs leading-relaxed text-lifitseg-dark/60">{aud.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => abrirModal()}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-sm font-semibold text-lifitseg-dark shadow-lg transition-all hover:opacity-90"
            >
              Encontrar a solução para o meu perfil
            </button>
          </div>
        </div>
      </section>

      {/* SAÚDE & BENEFÍCIOS — protagonismo + entrada para Referências em Saúde — branco */}
      <section id="saude-beneficios" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="mb-3 block text-xs font-bold tracking-widest text-primary uppercase">
                Nosso principal negócio
              </span>
              <h2 className="mb-6 text-3xl leading-tight font-extrabold tracking-tight text-lifitseg-dark sm:text-4xl">
                Saúde &amp; Benefícios Corporativos
              </h2>
              <p className="mb-6 text-base leading-relaxed text-lifitseg-dark/70">
                Planos de saúde e odontológicos PME e corporativos, com redesenho de apólices,
                coparticipação inteligente e negociação técnica de reajustes.
              </p>
              <a
                href="/beneficios-corporativos"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:opacity-80"
              >
                <span>Conhecer Benefícios Corporativos</span>
                <span>→</span>
              </a>
            </div>

            {/* Bloco de acesso a Referências em Saúde — entrada, não duplica o catálogo */}
            <div className="rounded-2xl border border-black/10 bg-lifitseg-offwhite p-8 lg:col-span-5">
              <h3 className="mb-2 text-lg font-bold text-lifitseg-dark">Referências em Saúde</h3>
              <p className="mb-6 text-sm leading-relaxed text-lifitseg-dark/60">
                Encontre hospitais, laboratórios e clínicas de referência, organizados por região
                e especialidade, para saber exatamente o que o seu plano precisa cobrir.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="/referencias-saude"
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-lifitseg-dark shadow-lg transition-opacity hover:opacity-90"
                >
                  Explorar Referências em Saúde
                </a>
                <button
                  onClick={() => abrirModal('Referência em Saúde')}
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 px-6 py-3.5 text-sm font-semibold text-lifitseg-dark transition-colors hover:border-primary"
                >
                  Encontrar um plano com acesso
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEGUROS — apresentação enxuta, aprofundamento nas páginas específicas — off-white */}
      <section id="seguros" className="bg-lifitseg-offwhite py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="mb-3 block text-xs font-bold tracking-widest text-primary uppercase">
              Além da saúde
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-lifitseg-dark sm:text-4xl">
              Seguros
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <a
              href="/seguros-corporativos"
              className="rounded-2xl border border-black/10 bg-white p-8 transition-all hover:border-primary/40"
            >
              <h3 className="mb-2 text-lg font-bold text-lifitseg-dark">Seguros Corporativos</h3>
              <p className="text-sm leading-relaxed text-lifitseg-dark/60">
                Patrimônio, frota, responsabilidade civil e garantias para o seu negócio.
              </p>
            </a>
            <a
              href="/seguros-pessoais"
              className="rounded-2xl border border-black/10 bg-white p-8 transition-all hover:border-primary/40"
            >
              <h3 className="mb-2 text-lg font-bold text-lifitseg-dark">Seguros Pessoais</h3>
              <p className="text-sm leading-relaxed text-lifitseg-dark/60">
                Auto, residencial, vida e proteção para você e sua família.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* FAIXA DE OPERADORAS — off-white, dividida Saúde/Benefícios vs Seguros */}
      <section id="operadoras" className="bg-lifitseg-offwhite py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-xs font-bold tracking-widest text-lifitseg-dark/50 uppercase">
            Independência técnica com acesso às principais seguradoras e operadoras do mercado
          </p>

          <p className="mb-4 text-xs font-bold tracking-wider text-primary uppercase">
            Saúde &amp; Benefícios
          </p>
          <div className="mb-10 flex flex-wrap items-center gap-4 sm:gap-6">
            {OPERATORS.filter((op) => op.categoria === 'saude').map((op, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center rounded-2xl border bg-white px-5 py-4 text-center shadow-sm transition-all hover:shadow-md ${
                  op.destaque ? 'border-primary/30 hover:border-primary/60' : 'border-black/10 hover:border-primary/40'
                }`}
              >
                <div className="relative mb-3 flex h-10 w-24 items-center justify-center">
                  <Image
                    src={`/seguradoras/${op.file}.png`}
                    alt={op.name}
                    width={96}
                    height={40}
                    className="max-h-10 w-auto object-contain"
                  />
                </div>
                <span className="text-xs font-bold tracking-tight text-lifitseg-dark/80">
                  {op.name}
                </span>
              </div>
            ))}
          </div>

          <p className="mb-4 text-xs font-bold tracking-wider text-primary uppercase">Seguros</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {OPERATORS.filter((op) => op.categoria === 'seguros').map((op, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-4 text-center shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="relative mb-3 flex h-10 w-24 items-center justify-center">
                  <Image
                    src={`/seguradoras/${op.file}.png`}
                    alt={op.name}
                    width={96}
                    height={40}
                    className="max-h-10 w-auto object-contain"
                  />
                </div>
                <span className="text-xs font-bold tracking-tight text-lifitseg-dark/80">
                  {op.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS — branco */}
      <section id="diferenciais" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-3 block text-xs font-bold tracking-widest text-primary uppercase">
              Por que a LifitSeg?
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-lifitseg-dark sm:text-4xl">
              Uma nova categoria na gestão corporativa de riscos
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-lifitseg-dark/60">
              Substituímos o papel de mero intermediário por uma verdadeira extensão estratégica do
              seu departamento financeiro e de recursos humanos.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {DIFFERENTIALS.map((item, idx) => (
              <div
                key={idx}
                className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-8 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-primary">{item.number}</span>
                    <span className="rounded-md border border-black/10 bg-lifitseg-offwhite px-2.5 py-1 text-[10px] font-bold tracking-wider text-lifitseg-dark/70 uppercase">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-lifitseg-dark">{item.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-lifitseg-dark/60">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUÇÕES — off-white */}
      <section id="solucoes" className="bg-lifitseg-offwhite py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-3 block text-xs font-bold tracking-widest text-primary uppercase">
              Ecossistema de Soluções
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-lifitseg-dark sm:text-4xl">
              Proteção completa para o capital humano e ativos do seu negócio
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-lifitseg-dark/60">
              Cada especialidade da LifitSeg com arquitetura de contratos customizada para o
              tamanho e momento da sua empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {SOLUTIONS.map((sol) => (
              <div
                key={sol.id}
                className={`flex flex-col justify-between rounded-2xl border bg-white p-8 shadow-sm transition-all sm:p-10 ${
                  sol.featured ? 'border-primary/40' : 'border-black/10 hover:border-black/20'
                }`}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-primary uppercase">
                      {sol.category}
                    </span>
                    {sol.featured && (
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        Maior Impacto
                      </span>
                    )}
                  </div>

                  <h3 className="mb-4 text-2xl font-bold text-lifitseg-dark">{sol.title}</h3>

                  <p className="mb-6 text-sm leading-relaxed text-lifitseg-dark/70">
                    {sol.description}
                  </p>
                </div>

                <div>
                  <div className="mb-6 flex items-center gap-2 rounded-xl border border-black/10 bg-lifitseg-offwhite px-4 py-3 text-xs font-semibold text-lifitseg-dark/70">
                    <span className="text-lifitseg-success">✓</span>
                    <span>{sol.metrics}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-black/10 pt-4">
                    <button
                      onClick={() => abrirModal(sol.title)}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:opacity-80"
                    >
                      <span>{sol.cta}</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MÉTODO DE TRABALHO — branco */}
      <section id="metodo" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-3 block text-xs font-bold tracking-widest text-primary uppercase">
              Engenharia de Processos
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-lifitseg-dark sm:text-4xl">
              Como atuamos na sua empresa
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-lifitseg-dark/60">
              Quatro etapas estruturadas para garantir previsibilidade financeira e paz de espírito.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {METHOD_STEPS.map((m, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm"
              >
                <span className="mb-4 block font-mono text-3xl font-black text-primary/70">
                  {m.step}
                </span>
                <h3 className="mb-2 text-lg font-bold text-lifitseg-dark">{m.title}</h3>
                <p className="text-xs leading-relaxed text-lifitseg-dark/60">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGY BUSINESS — off-white, com painel escuro de destaque */}
      <section id="strategy" className="bg-lifitseg-offwhite py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="mb-3 block text-xs font-bold tracking-widest text-primary uppercase">
                Metodologia Exclusiva
              </span>
              <h2 className="mb-6 text-3xl leading-tight font-extrabold tracking-tight text-lifitseg-dark sm:text-4xl">
                Strategy Business: Inteligência Técnica no Combate ao Reajuste
              </h2>
              <p className="mb-4 text-base leading-relaxed text-lifitseg-dark/70">
                O Strategy Business é a nossa abordagem de gestão estratégica para grandes contas
                — reunindo carteira, benefícios, seguros, riscos, renovação e relacionamento em um
                acompanhamento contínuo.
              </p>
              <p className="mb-6 text-base leading-relaxed text-lifitseg-dark/70">
                Um dos resultados mais concretos dessa gestão aparece no combate a reajustes: a
                maioria das empresas aceita passivamente os aumentos anuais das operadoras por
                falta de dados técnicos para contestação. Nossa abordagem muda essa lógica.
              </p>

              <ul className="mb-8 space-y-4 text-sm text-lifitseg-dark/70">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-lifitseg-success/15 text-xs font-bold text-lifitseg-success">
                    ✓
                  </span>
                  <span>
                    <strong className="text-lifitseg-dark">Auditoria de Faturas e Coparticipação:</strong>{' '}
                    Identificação de cobranças indevidas e distorções cadastrais.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-lifitseg-success/15 text-xs font-bold text-lifitseg-success">
                    ✓
                  </span>
                  <span>
                    <strong className="text-lifitseg-dark">Comitês de Sinistralidade:</strong>{' '}
                    Análise preditiva de casos de alto custo para prevenção e acompanhamento
                    assistencial.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-lifitseg-success/15 text-xs font-bold text-lifitseg-success">
                    ✓
                  </span>
                  <span>
                    <strong className="text-lifitseg-dark">Dossiê Técnico de Repactuação:</strong>{' '}
                    Negociação matemática baseada na margem real da seguradora.
                  </span>
                </li>
              </ul>

              <button
                onClick={() => abrirModal()}
                className="rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-lifitseg-dark shadow-lg transition-opacity hover:opacity-90"
              >
                Agendar Apresentação do Strategy Business
              </button>
            </div>

            {/* Painel escuro — destaque intencional dentro da seção clara */}
            <div className="relative overflow-hidden rounded-3xl bg-lifitseg-dark p-8 text-lifitseg-offwhite shadow-xl lg:col-span-5">
              <h3 className="mb-6 border-b border-white/10 pb-4 text-lg font-bold">
                Impacto Médio Obtido
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex justify-between text-xs font-semibold">
                    <span className="text-lifitseg-offwhite/60">Reajuste Médio de Mercado (PME)</span>
                    <span className="font-bold text-red-400">22% - 28%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[85%] bg-red-500/80" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-xs font-semibold">
                    <span className="text-lifitseg-offwhite/60">Com Gestão LifitSeg Strategy</span>
                    <span className="font-bold text-lifitseg-success">8% - 12%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[35%] bg-lifitseg-success" />
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-lifitseg-offwhite/60 italic">
                &ldquo;A negociação embasada em dados matemáticos elimina a assimetria de informação
                entre a empresa e a operadora.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIFCORE — branco, com painel escuro de destaque */}
      <section id="tecnologia" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-lifitseg-dark p-8 text-lifitseg-offwhite sm:p-14">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-6">
                <span className="inline-block rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold tracking-wider text-primary uppercase">
                  Ecossistema Proprietário
                </span>
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                  Conheça o LifCore: A inteligência por trás do nosso atendimento
                </h2>
                <p className="text-sm leading-relaxed text-lifitseg-offwhite/70 sm:text-base">
                  <strong className="text-lifitseg-offwhite">
                    Tecnologia para não deixar sua gestão parar.
                  </strong>{' '}
                  Não somos apenas consultores; desenvolvemos nossa própria plataforma técnica para
                  garantir rastreabilidade total, triagem ágil de chamados e pipeline unificado.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-lg font-bold text-primary">Centralizado</p>
                    <p className="mt-1 text-xs text-lifitseg-offwhite/60">
                      Todos os contatos e movimentações gravados em histórico único.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-lg font-bold text-primary">SLA Controlado</p>
                    <p className="mt-1 text-xs text-lifitseg-offwhite/60">
                      Atendimento ao cliente com acompanhamento de prazos rigorosos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-white/10 bg-lifitseg-dark-deep p-6 sm:p-8 lg:col-span-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-lifitseg-success" />
                    <span className="font-mono text-xs font-bold text-lifitseg-offwhite/70">
                      LIFCORE ENGINE v2.4
                    </span>
                  </div>
                  <span className="rounded bg-lifitseg-success/15 px-2 py-0.5 font-mono text-[10px] text-lifitseg-success">
                    ONLINE
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between rounded-lg border border-white/10 bg-white/5 p-3 text-lifitseg-offwhite/70">
                    <span>› Lead Routing Status:</span>
                    <span className="text-lifitseg-success">AUTOMATED</span>
                  </div>
                  <div className="flex justify-between rounded-lg border border-white/10 bg-white/5 p-3 text-lifitseg-offwhite/70">
                    <span>› Acompanhamento:</span>
                    <span className="text-primary">Contínuo</span>
                  </div>
                  <div className="flex justify-between rounded-lg border border-white/10 bg-white/5 p-3 text-lifitseg-offwhite/70">
                    <span>› Rastreabilidade:</span>
                    <span className="text-lifitseg-offwhite/50">Histórico completo e centralizado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHTS — off-white (Com cliques funcionais abrindo o modal com o tema) */}
      <section id="insights" className="bg-lifitseg-offwhite py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-col justify-between md:flex-row md:items-end">
            <div>
              <span className="mb-3 block text-xs font-bold tracking-widest text-primary uppercase">
                Inteligência de Mercado
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-lifitseg-dark">
                Insights Estratégicos LifitSeg
              </h2>
            </div>
            <p className="mt-4 max-w-md text-sm text-lifitseg-dark/60 md:mt-0">
              Artigos técnicos e orientações práticas produzidos pelos nossos especialistas em
              gestão de riscos.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {INSIGHTS.map((post, idx) => (
              <article
                key={idx}
                onClick={() => abrirModal(post.title)}
                className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  <div className="h-40 w-full overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between text-xs text-lifitseg-dark/50">
                      <span className="font-semibold text-primary">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="mb-3 text-lg font-bold text-lifitseg-dark transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="mb-6 text-xs leading-relaxed text-lifitseg-dark/60">
                      {post.summary}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-black/10 px-6 pb-6 pt-4 text-xs text-lifitseg-dark/50">
                  <span>{post.date}</span>
                  <span className="font-medium text-primary group-hover:underline">
                    Falar sobre o tema →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL — bookend verde */}
      <section className="relative overflow-hidden bg-gradient-to-b from-lifitseg-dark to-lifitseg-dark-deep py-24 text-lifitseg-offwhite">
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold tracking-wider text-primary uppercase">
            Diagnóstico de Risco sem Custo
          </span>
          <h2 className="mb-6 text-3xl leading-tight font-black tracking-tight sm:text-5xl">
            Pronto para transformar a gestão de benefícios e seguros da sua empresa?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-lifitseg-offwhite/70">
            Entre em contato com nossa equipe técnica para uma análise sem compromisso da sua
            apólice e estrutura atual.
          </p>
          <button
            onClick={() => abrirModal()}
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-10 py-5 text-base font-bold text-lifitseg-dark shadow-2xl transition-all hover:scale-105"
          >
            Falar com um Consultor Especialista
          </button>
        </div>
      </section>

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultProduto={produtoSelecionado}
        origem="home-hero"
      />
    </div>
  )
}