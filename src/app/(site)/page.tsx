import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CardsFaixas } from '@/components/home/CardsFaixas'
import { DuvidasHome } from '@/components/home/DuvidasHome'
import { GradeMarcas } from '@/components/home/GradeMarcas'
import { FormularioEmpresarial } from '@/components/forms/FormularioEmpresarial'
import { LinkWhatsApp } from '@/components/common/LinkWhatsApp'
import { siteConfig } from '@/config/site'

// Home completa v3 (Chief Chat, M-21), produzida no plano M-24.
// Ordem: abertura · três faixas · contratação → gestão · institucional ·
// operadoras · dúvidas · contato · rodapé (no layout do grupo).
// Sem alegações de economia, prazos, resultados ou credenciais não
// comprovadas (Diretriz Central do Chat).

export const metadata: Metadata = {
  title: { absolute: 'Plano de saúde empresarial com decisão bem orientada | Lifitseg' },
  description: siteConfig.descricao,
}

const FRENTES = [
  { n: '01', titulo: 'Contratação', texto: 'Entender objetivos e critérios.' },
  { n: '02', titulo: 'Revisão do benefício', texto: 'Organizar alternativas e condições.' },
  { n: '03', titulo: 'Gestão e acompanhamento', texto: 'Alinhar necessidades e escopo de apoio.' },
]

export default function HomePage() {
  return (
    <>
      {/* 1. Abertura */}
      <section className="bg-lifitseg-dark text-lifitseg-offwhite">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8 lg:pt-20">
          <div>
            <p className="text-xs font-bold tracking-widest text-lifitseg-mint uppercase">Planos de saúde empresariais</p>
            <h1 className="mt-5 text-4xl text-white sm:text-5xl" style={{ lineHeight: 1.15 }}>
              Plano de saúde empresarial com uma decisão bem orientada.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-lifitseg-offwhite/80">
              Conhecimento técnico para compreender alternativas, contratar e planejar a gestão do benefício da sua empresa.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="#contato" className="rounded-xl bg-primary px-6 py-3.5 text-center text-sm font-bold text-lifitseg-dark hover:opacity-90">
                Conversar sobre minha empresa
              </a>
              <a href="#por-porte" className="text-sm font-semibold text-lifitseg-offwhite hover:text-lifitseg-mint">
                Conhecer opções por porte <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="mt-8 text-sm text-lifitseg-offwhite/60">2 a 29 vidas / 30 a 99 vidas / 100+ vidas</p>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-lifitseg-surface p-8">
            <Image src="/marca/Lifitseg_icone_escuro.svg" alt="" width={120} height={120} className="h-24 w-24 rounded-xl" />
            <div className="my-6 h-px bg-white/10" />
            <p className="text-xs font-bold tracking-widest text-lifitseg-offwhite uppercase">Cuidado na escolha.<br />Clareza na gestão.</p>
            <p className="mt-3 text-sm text-lifitseg-offwhite/70">Perfil • Condições • Planejamento</p>
            <a href="#como-atuamos" className="mt-5 inline-block text-sm font-semibold text-lifitseg-mint hover:underline">
              Conheça a abordagem Lifitseg <span aria-hidden="true">→</span>
            </a>
          </aside>
        </div>
      </section>

      {/* 2. Três faixas */}
      <section id="por-porte" aria-labelledby="titulo-porte" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-porte" className="text-lifitseg-dark">O ponto de partida é a realidade da sua empresa.</h2>
          <p className="mt-3 text-lifitseg-text-soft">Três caminhos para orientar a conversa inicial.</p>
          <div className="mt-10">
            <CardsFaixas />
          </div>
        </div>
      </section>

      {/* 3. Contratação → gestão */}
      <section id="como-atuamos" aria-labelledby="titulo-atuacao" className="scroll-mt-20 bg-lifitseg-paper py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-bold tracking-widest text-lifitseg-green uppercase">Da contratação à gestão</p>
            <h2 id="titulo-atuacao" className="mt-4 text-lifitseg-dark">O benefício continua depois da escolha.</h2>
            <p className="mt-5 max-w-md text-lifitseg-text-soft">
              A conversa também considera o acompanhamento que sua empresa precisa ao longo do contrato. O escopo de apoio é definido conforme os serviços contratados.
            </p>
            <Link href="/beneficios-corporativos" className="mt-8 inline-block text-sm font-bold text-lifitseg-green hover:underline">
              Conheça como atuamos <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ol className="divide-y divide-lifitseg-line border-y border-lifitseg-line">
            {FRENTES.map((f) => (
              <li key={f.n} className="flex gap-6 py-6">
                <span className="text-sm font-bold text-lifitseg-green">{f.n}</span>
                <div>
                  <p className="text-lg font-bold text-lifitseg-dark">{f.titulo}</p>
                  <p className="mt-1 text-sm text-lifitseg-text-soft">{f.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Institucional (sem foto até haver imagem real autorizada) */}
      <section id="sobre" aria-labelledby="titulo-sobre" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
          <div>
            <h2 id="titulo-sobre" className="text-lifitseg-dark">Quem está ao lado da sua empresa.</h2>
            <p className="mt-4 text-lifitseg-text-soft">Conheça a Lifitseg, sua equipe e sua forma de trabalhar.</p>
            <Link href="/sobre-e-conhecimento#quem-somos" className="mt-6 inline-block text-sm font-bold text-lifitseg-green hover:underline">
              Conhecer a Lifitseg <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="flex items-center justify-center rounded-3xl bg-lifitseg-paper p-10">
            <div className="rounded-xl bg-white px-6 py-5">
              <Image src="/marca/Lifitseg_logo_transparente_para_claro.svg" alt="Lifitseg" width={260} height={67} className="h-14 w-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Operadoras (bloqueada em produção até confirmação do portfólio) */}
      <GradeMarcas />

      {/* 6. Dúvidas */}
      <section id="duvidas" aria-labelledby="titulo-duvidas" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-duvidas" className="mb-8 text-lifitseg-dark">Dúvidas que ajudam a começar.</h2>
          <DuvidasHome />
        </div>
      </section>

      {/* 7. Contato */}
      <section id="contato" aria-labelledby="titulo-contato" className="scroll-mt-24 bg-lifitseg-paper py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8">
          <div>
            <h2 id="titulo-contato" className="text-lifitseg-dark">Conte o momento da sua empresa.</h2>
            <p className="mt-4 max-w-md text-lifitseg-text-soft">
              Você está contratando pela primeira vez ou revendo um benefício? Compartilhe as informações iniciais para orientar a conversa.
            </p>
            <LinkWhatsApp rotulo="home-contato" className="mt-8 inline-block text-sm font-bold text-lifitseg-green hover:underline">
              Prefere falar pelo WhatsApp? <span aria-hidden="true">→</span>
            </LinkWhatsApp>
          </div>
          <div className="rounded-3xl border border-lifitseg-line bg-white p-6 sm:p-8">
            <FormularioEmpresarial pontoEntrada="home-formulario" />
          </div>
        </div>
      </section>
    </>
  )
}
