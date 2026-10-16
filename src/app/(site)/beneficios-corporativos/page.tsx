import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/common/Breadcrumb'
import { CardsFaixas } from '@/components/home/CardsFaixas'
import { DuvidasHome } from '@/components/home/DuvidasHome'
import { GradeMarcas } from '@/components/home/GradeMarcas'
import { FormularioEmpresarial } from '@/components/forms/FormularioEmpresarial'
import { MetodoEtapas, ComplexidadeBloco, CriteriosComparacao, GuiasDestaque } from '@/components/atuacao/Blocos'
import { CARTEIRA, FAQ_BENEFICIOS, POSICIONAMENTO } from '@/content/atuacao'

// Benefícios Corporativos / Saúde — segunda etapa do Chief Chat (M-27 /
// D-36): Lifitseg_Site_Etapa2_Conteudo_Tecnico_v1.md (seção 2) e
// Lifitseg_Site_Servicos_Confirmados_v1.md (bloco de serviços). Rota
// preservada. Aprofunda a home sem repetir todos os parágrafos dela.

export const metadata: Metadata = {
  title: 'Plano de saúde empresarial: contratar, revisar e acompanhar',
  description:
    'Critérios para contratar, revisar e acompanhar o plano de saúde empresarial: comparação, renovação, gestão operacional, apoio ao beneficiário e indicadores, conforme o serviço contratado.',
}

const MOMENTOS = [
  {
    titulo: 'Primeira contratação',
    texto: 'A análise começa pelos requisitos do produto, pela localização e pelos objetivos da empresa. Comparar condições com clareza ajuda a decidir com uma visão mais completa do benefício.',
  },
  {
    titulo: 'Revisão de alternativas',
    texto: 'Quando já existe contrato, a conversa precisa considerar condições atuais e prioridades da empresa. A revisão pode orientar perguntas, comparação de alternativas ou preparação da renovação; não pressupõe troca.',
  },
  {
    titulo: 'Renovação',
    texto: 'O entendimento da comunicação recebida e das condições contratuais vem antes da conclusão. A avaliação reúne contexto e informações pertinentes, sem prometer redução do reajuste.',
  },
  {
    titulo: 'Saúde e odontológico',
    texto: 'Benefícios odontológicos podem ser avaliados como frente complementar quando fizerem parte da necessidade da empresa e do portfólio disponível.',
  },
]

const SERVICOS = [
  { titulo: 'Análise e comparação', texto: 'Cenário empresarial, critérios de proposta e condições do contrato; dúvidas e pontos de atenção esclarecidos antes da decisão.' },
  { titulo: 'Gestão operacional', texto: 'Movimentações de beneficiários e conferência de faturas, com acompanhamento das divergências dentro do escopo do atendimento.' },
  { titulo: 'Relacionamento e apoio', texto: 'Canais de contato com RH e beneficiários, orientação para reembolso, autorizações e análise de dificuldades de atendimento ou recusas.' },
  { titulo: 'Indicadores e sinistralidade', texto: 'Leitura dos dados disponíveis, relatórios e comitês para apoiar a gestão do contrato. Indicadores apresentados com período e metodologia, sem atribuir publicamente condições de saúde a pessoas.' },
  { titulo: 'Renovação', texto: 'Organização e avaliação de condições, apoio à negociação e planejamento dos próximos passos.' },
  { titulo: 'In company e educação', texto: 'Workshops, palestras e acompanhamento próximo para orientar a empresa e melhorar a compreensão do benefício.' },
  { titulo: 'Complexidade', texto: 'Análise individualizada do encaminhamento e interlocução com as partes responsáveis, preservando informações sensíveis e os limites de atuação de cada participante.' },
]

export default function BeneficiosCorporativosPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Início', href: '/' }, { label: 'Plano de saúde empresarial' }]} />

      <section className="bg-lifitseg-dark text-lifitseg-offwhite">
        <div className="mx-auto max-w-7xl px-4 pt-14 pb-16 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest text-lifitseg-mint uppercase">{POSICIONAMENTO}</p>
          <h1 className="mt-5 max-w-4xl text-4xl text-white sm:text-5xl" style={{ lineHeight: 1.15 }}>
            Plano de saúde empresarial: critérios para contratar, revisar e acompanhar.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-lifitseg-offwhite/80">
            Cada empresa tem um cenário de contratação e uma rotina de benefício. A Lifitseg reúne orientação comercial e explicação técnica para ajudar RH, financeiro e direção a compreender alternativas e próximos passos.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#contato" className="rounded-xl bg-primary px-6 py-3.5 text-center text-sm font-bold text-lifitseg-dark hover:opacity-90">Conversar sobre minha empresa</a>
            <a href="#servicos" className="text-sm font-semibold hover:text-lifitseg-mint">Ver os serviços <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section aria-labelledby="titulo-faixas" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-faixas" className="text-lifitseg-dark">Três cenários empresariais.</h2>
          <p className="mt-3 max-w-3xl text-sm text-lifitseg-text-soft">As faixas organizam a conversa; não representam regimes regulatórios completos nem garantem condições específicas.</p>
          <div className="mt-8"><CardsFaixas /></div>
        </div>
      </section>

      <section aria-labelledby="titulo-momentos" className="bg-lifitseg-paper py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-momentos" className="text-lifitseg-dark">Em que momento sua empresa está?</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {MOMENTOS.map((m) => (
              <article key={m.titulo} className="rounded-2xl bg-white p-6">
                <h3 className="text-lifitseg-dark" style={{ fontSize: '1.1rem' }}>{m.titulo}</h3>
                <p className="mt-2 text-sm text-lifitseg-text-soft">{m.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="servicos" aria-labelledby="titulo-servicos" className="scroll-mt-20 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest text-lifitseg-green uppercase">Serviços</p>
          <h2 id="titulo-servicos" className="mt-3 max-w-3xl text-lifitseg-dark">O que sua empresa pode contar com a Lifitseg para organizar.</h2>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICOS.map((s) => (
              <article key={s.titulo}>
                <span aria-hidden="true" className="mb-3 block h-0.5 w-8 bg-lifitseg-green" />
                <h3 className="text-lifitseg-dark" style={{ fontSize: '1.1rem' }}>{s.titulo}</h3>
                <p className="mt-2 text-sm text-lifitseg-text-soft">{s.texto}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-sm text-lifitseg-text-soft">A combinação dos serviços, frequência e canais é definida na proposta de atendimento.</p>
          <p className="mt-2 max-w-3xl text-sm text-lifitseg-text">{CARTEIRA}</p>
        </div>
      </section>

      <section aria-labelledby="titulo-metodo" className="bg-lifitseg-paper py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-metodo" className="text-lifitseg-dark">Como transformamos informação em uma decisão mais clara.</h2>
          <div className="mt-8"><MetodoEtapas /></div>
        </div>
      </section>

      <section aria-labelledby="titulo-criterios" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-criterios" className="text-lifitseg-dark">O que precisa entrar na comparação.</h2>
          <p className="mt-3 max-w-3xl text-lifitseg-text-soft">A mensalidade é importante, mas não descreve sozinha o produto.</p>
          <div className="mt-8"><CriteriosComparacao /></div>
        </div>
      </section>

      <ComplexidadeBloco />

      <GradeMarcas />

      <section aria-labelledby="titulo-faq-beneficios" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-faq-beneficios" className="mb-8 text-lifitseg-dark">Perguntas técnicas frequentes.</h2>
          <DuvidasHome itens={FAQ_BENEFICIOS} />
          <p className="mt-4 text-xs text-lifitseg-text-soft">Regras citadas a partir de páginas públicas da ANS consultadas em 16/10/2026. Cada caso exige conferência das condições aplicáveis.</p>
        </div>
      </section>

      <section aria-labelledby="titulo-guias-beneficios" className="bg-lifitseg-paper py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-guias-beneficios" className="text-lifitseg-dark">Guias para aprofundar.</h2>
          <div className="mt-8"><GuiasDestaque area="saude" /></div>
          <Link href="/conhecimento" className="mt-8 inline-block text-sm font-bold text-lifitseg-green hover:underline">Ver todos os guias <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section id="contato" aria-labelledby="titulo-contato-beneficios" className="scroll-mt-24 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8">
          <div>
            <h2 id="titulo-contato-beneficios" className="text-lifitseg-dark">Conte o momento da sua empresa.</h2>
            <p className="mt-4 max-w-md text-lifitseg-text-soft">Primeira contratação, revisão ou renovação: compartilhe as informações iniciais para orientar a conversa.</p>
          </div>
          <div className="rounded-3xl border border-lifitseg-line bg-lifitseg-paper p-6 sm:p-8">
            <FormularioEmpresarial pontoEntrada="beneficios-corporativos" />
          </div>
        </div>
      </section>
    </>
  )
}
