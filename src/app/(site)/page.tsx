import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CardsFaixas } from '@/components/home/CardsFaixas'
import { DuvidasHome } from '@/components/home/DuvidasHome'
import { GradeMarcas } from '@/components/home/GradeMarcas'
import { FormularioEmpresarial } from '@/components/forms/FormularioEmpresarial'
import { LinkWhatsApp } from '@/components/common/LinkWhatsApp'
import { MetodoEtapas, FrentesGestao, ComplexidadeBloco, CriteriosComparacao, PerguntasDiagnostico, ExemplosEducativos, GuiasDestaque } from '@/components/atuacao/Blocos'
import { CARTEIRA, EQUIPE, FAQ_HOME, LINK_AVALIACOES_GOOGLE, POSICIONAMENTO } from '@/content/atuacao'
import { siteConfig } from '@/config/site'

// Home v3 (Chief Chat, M-21) com a profundidade da etapa 2 (M-27 / D-36):
// abertura · faixas · perguntas · método · critérios · gestão · complexidade
// · parceiros · exemplos educativos · experiência e equipe · guias · dúvidas
// · contato. Sem promessas de economia, resultado ou credenciais não
// comprovadas; Lifcore fora até o acesso do cliente ser confirmado.

export const metadata: Metadata = {
  title: { absolute: 'Plano de saúde empresarial com decisão bem orientada | Lifitseg' },
  description: siteConfig.descricao,
}

function Cabecalho({ rotulo, titulo, texto, id, claro = true }: { rotulo?: string; titulo: string; texto?: string; id: string; claro?: boolean }) {
  return (
    <div className="max-w-3xl">
      {rotulo && <p className={`text-xs font-bold tracking-widest uppercase ${claro ? 'text-lifitseg-green' : 'text-lifitseg-mint'}`}>{rotulo}</p>}
      <h2 id={id} className={`mt-3 ${claro ? 'text-lifitseg-dark' : 'text-white'}`}>{titulo}</h2>
      {texto && <p className={`mt-4 ${claro ? 'text-lifitseg-text-soft' : 'text-lifitseg-offwhite/80'}`}>{texto}</p>}
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      {/* H-01 Abertura */}
      <section className="bg-lifitseg-dark text-lifitseg-offwhite">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8 lg:pt-20">
          <div>
            <p className="text-xs font-bold tracking-widest text-lifitseg-mint uppercase">Planos de saúde empresariais</p>
            <h1 className="mt-5 text-4xl text-white sm:text-5xl" style={{ lineHeight: 1.15 }}>
              Plano de saúde empresarial com uma decisão bem orientada.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-lifitseg-offwhite/80">
              A Lifitseg ajuda sua empresa a compreender alternativas, comparar condições e planejar o benefício de saúde. O trabalho começa pela realidade da operação e pelos critérios que precisam sustentar a decisão.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="#contato" className="rounded-xl bg-primary px-6 py-3.5 text-center text-sm font-bold text-lifitseg-dark hover:opacity-90">
                Conversar sobre minha empresa
              </a>
              <a href="#como-atuamos" className="text-sm font-semibold text-lifitseg-offwhite hover:text-lifitseg-mint">
                Conhecer nosso método <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="mt-8 text-sm text-lifitseg-offwhite/60">PME 2–29 · PME 30–99 · PJ/Corporativo 100+ vidas</p>
          </div>

          <aside>
            {/* Foto ilustrativa de banco (Canva, licença gratuita): não representa a equipe nem clientes. */}
            <Image
              src="/fotos/consultoria.png"
              alt="Pessoas analisando documentos e informações em uma reunião de trabalho"
              width={1600}
              height={900}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-video w-full rounded-3xl object-cover"
            />
            <div className="mt-4 rounded-2xl border border-white/10 bg-lifitseg-surface p-5">
              <p className="text-sm font-bold tracking-wide text-white">{POSICIONAMENTO}</p>
              <p className="mt-2 text-sm text-lifitseg-offwhite/70">Mais de 100 empresas na carteira, de pequenas operações a organizações corporativas.</p>
              <a href="#gestao" className="mt-3 inline-block text-sm font-semibold text-lifitseg-mint hover:underline">
                Conhecer a gestão da Lifitseg <span aria-hidden="true">→</span>
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* H-02 Três cenários */}
      <section id="por-porte" aria-labelledby="titulo-porte" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Cabecalho id="titulo-porte" titulo="O ponto de partida é a realidade da sua empresa." texto="Três caminhos para orientar a conversa inicial." />
          <div className="mt-10"><CardsFaixas /></div>
        </div>
      </section>

      {/* H-03 Perguntas que orientam a análise */}
      <section aria-labelledby="titulo-perguntas" className="bg-lifitseg-paper py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Cabecalho id="titulo-perguntas" titulo="Antes de comparar propostas, precisamos compreender sua empresa." texto="Uma conversa técnica começa por perguntas concretas. Elas ajudam a separar necessidades, critérios e condições que precisam ser conferidas." />
          <div className="mt-10"><PerguntasDiagnostico /></div>
          <a href="#contato" className="mt-8 inline-block text-sm font-bold text-lifitseg-green hover:underline">Organizar minha avaliação <span aria-hidden="true">→</span></a>
        </div>
      </section>

      {/* H-04 Método */}
      <section id="como-atuamos" aria-labelledby="titulo-metodo" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Cabecalho id="titulo-metodo" rotulo="Como atuamos" titulo="Como transformamos informação em uma decisão mais clara." texto="Da análise inicial ao acompanhamento, organizamos informações e próximos passos para apoiar as decisões da empresa." />
          <div className="mt-10"><MetodoEtapas /></div>
        </div>
      </section>

      {/* H-05 Critérios técnicos */}
      <section id="criterios" aria-labelledby="titulo-criterios" className="scroll-mt-20 bg-lifitseg-paper py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Cabecalho id="titulo-criterios" rotulo="Conhecimento técnico" titulo="O que precisa entrar na comparação de um plano empresarial?" texto="A mensalidade é importante, mas não descreve sozinha o produto. A análise precisa explicar diferenças e verificar o que se aplica ao cenário da empresa." />
          <div className="mt-10"><CriteriosComparacao /></div>
        </div>
      </section>

      {/* H-06 Gestão */}
      <section id="gestao" aria-labelledby="titulo-gestao" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Cabecalho
            id="titulo-gestao"
            rotulo="Da contratação à gestão"
            titulo="A contratação é o começo. A gestão acontece todos os dias."
            texto="Um benefício de saúde envolve decisões, rotinas e pessoas. Nossa consultoria participa da contratação e acompanha a operação, com apoio ao RH, análise técnica e tratamento de demandas conforme o serviço contratado."
          />
          <div className="mt-12"><FrentesGestao /></div>
          <div className="mt-12 flex flex-col gap-4 rounded-2xl bg-lifitseg-paper p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm text-lifitseg-text">{CARTEIRA}</p>
            <Link href="/beneficios-corporativos#servicos" className="shrink-0 text-sm font-bold text-lifitseg-green hover:underline">
              Ver os serviços em detalhe <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Situações complexas */}
      <ComplexidadeBloco />

      {/* H-07 Parceiros */}
      <GradeMarcas />

      {/* Situações educativas */}
      <section aria-labelledby="titulo-exemplos" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Cabecalho id="titulo-exemplos" titulo="Situações que ajudam a entender nossa atuação." texto="Exemplos educativos mostram quais perguntas orientam a análise e como a consultoria pode apoiar. Cada contratação e demanda exige avaliação própria." />
          <div className="mt-10"><ExemplosEducativos /></div>
        </div>
      </section>

      {/* H-08 Experiência e equipe */}
      <section id="sobre" aria-labelledby="titulo-equipe" className="scroll-mt-20 bg-lifitseg-paper py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Cabecalho id="titulo-equipe" titulo={EQUIPE.titulo} texto={EQUIPE.texto} />
            <Link href="/sobre-e-conhecimento#quem-somos" className="mt-6 inline-block text-sm font-bold text-lifitseg-green hover:underline">
              Conhecer a Lifitseg <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="rounded-3xl bg-white p-8">
            <p className="text-lg font-bold text-lifitseg-dark">Experiências reais de quem se relaciona com a Lifitseg.</p>
            <p className="mt-3 text-sm text-lifitseg-text-soft">Conheça as avaliações publicadas por clientes e parceiros no Google.</p>
            <a href={LINK_AVALIACOES_GOOGLE} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-xl border border-lifitseg-line px-5 py-3 text-sm font-bold text-lifitseg-dark hover:border-lifitseg-green">
              Ver avaliações no Google <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* H-09 Conhecimento útil */}
      <section aria-labelledby="titulo-guias" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Cabecalho id="titulo-guias" rotulo="Guias" titulo="Entenda os critérios antes de tomar a decisão." texto="Conteúdos para apoiar a conversa entre RH, financeiro e direção: comparação de propostas, renovação e organização da rotina do benefício." />
          <div className="mt-10"><GuiasDestaque /></div>
          <Link href="/conhecimento" className="mt-8 inline-block text-sm font-bold text-lifitseg-green hover:underline">Ver todos os guias <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      {/* Dúvidas */}
      <section id="duvidas" aria-labelledby="titulo-duvidas" className="scroll-mt-20 bg-lifitseg-paper py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-duvidas" className="mb-8 text-lifitseg-dark">Dúvidas que ajudam a começar.</h2>
          <DuvidasHome itens={FAQ_HOME} />
        </div>
      </section>

      {/* Contato */}
      <section id="contato" aria-labelledby="titulo-contato" className="scroll-mt-24 bg-white py-20">
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
          <div className="rounded-3xl border border-lifitseg-line bg-lifitseg-paper p-6 sm:p-8">
            <FormularioEmpresarial pontoEntrada="home-formulario" />
          </div>
        </div>
      </section>
    </>
  )
}
