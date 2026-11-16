import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { DuvidasHome } from '@/components/home/DuvidasHome'
import { FormularioEmpresarial } from '@/components/forms/FormularioEmpresarial'
import { LinkWhatsApp } from '@/components/common/LinkWhatsApp'
import { Feixes } from '@/components/premium/Feixes'
import { GuiasDestaque } from '@/components/atuacao/Blocos'
import { FAQ_BENEFICIOS } from '@/content/atuacao'
import { siteConfig } from '@/config/site'

// Benefícios corporativos / saúde no visual premium (S-09; prévia aprovada por Raphael em 15/11/2026).
// Mesma linguagem da home sem copiá-la (SITE_MESTRE 5.7): âncoras para contratação, revisão e gestão; momentos em
// composição editorial; serviços em cards; gestão com foto; dúvidas técnicas já publicadas (com a fonte da ANS);
// próximos passos depois do contato. Rota e âncoras antigas (#servicos, #contato) preservadas.

export const metadata: Metadata = {
  title: 'Plano de saúde empresarial: contratar, revisar e acompanhar',
  description:
    'Critérios para contratar, revisar e acompanhar o plano de saúde empresarial: comparação, renovação, gestão operacional, apoio ao beneficiário e indicadores, conforme o serviço contratado.',
  alternates: { canonical: '/beneficios-corporativos' },
}

const MOMENTOS = [
  {
    id: 'contratacao',
    numero: '01 · PRIMEIRA CONTRATAÇÃO',
    titulo: 'Começar com clareza',
    texto: 'A análise começa pelos requisitos do produto, pela localização e pelos objetivos da empresa. Comparar com clareza ajuda a decidir com segurança.',
    acao: 'Quero entender as possibilidades',
  },
  {
    id: 'revisao',
    numero: '02 · REVISÃO E RENOVAÇÃO',
    titulo: 'Rever com critério',
    texto: 'Com contrato em vigor, a conversa considera as condições atuais e as prioridades da empresa, e orienta as perguntas antes da renovação. Rever não pressupõe trocar.',
    acao: 'Quero rever meu benefício',
  },
  {
    id: 'odontologico',
    numero: '03 · SAÚDE E ODONTOLÓGICO',
    titulo: 'Complementar o benefício',
    texto: 'O odontológico pode entrar como frente complementar, quando fizer parte da necessidade da empresa e do portfólio disponível.',
    acao: 'Quero incluir o odontológico',
  },
]

const SERVICOS = [
  { rotulo: 'ANÁLISE', titulo: 'Análise e comparação', texto: 'Cenário da empresa, critérios das propostas e condições do contrato, com dúvidas esclarecidas antes da decisão.' },
  { rotulo: 'NEGOCIAÇÃO', titulo: 'Renovação e negociação', texto: 'Organização e avaliação de condições, apoio à negociação e planejamento dos próximos passos.' },
  { rotulo: 'INDICADORES', titulo: 'Indicadores e sinistralidade', texto: 'Leitura dos dados disponíveis e relatórios para apoiar a gestão, sempre com período e método informados.' },
  { rotulo: 'OPERAÇÃO', titulo: 'Gestão operacional', texto: 'Movimentações de beneficiários e conferência de faturas, com acompanhamento das divergências.' },
  { rotulo: 'RELACIONAMENTO', titulo: 'Relacionamento e apoio', texto: 'Canais com RH e beneficiários, orientação para reembolso, autorizações e dificuldades de atendimento.' },
  { rotulo: 'EDUCAÇÃO', titulo: 'In company', texto: 'Workshops e palestras para a equipe entender e usar melhor o benefício.' },
]

const GESTAO = [
  { titulo: 'Movimentações', texto: 'Inclusões e exclusões conduzidas com o RH, com prazo combinado.', icone: 'M12 5v14M5 12h14' },
  { titulo: 'Conferência de faturas', texto: 'Divergências apontadas e acompanhadas até a correção.', icone: 'M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6' },
  { titulo: 'Apoio aos beneficiários', texto: 'Orientação para reembolsos, autorizações e casos mais complexos.', icone: 'M4 5h16v11H8l-4 4z' },
]

export default function BeneficiosCorporativosPage() {
  const { contato } = siteConfig
  return (
    <div className="pm">
      <section className="dark" aria-labelledby="titulo-beneficios">
        <Feixes variante="interna" opacidade={0.14} />
        <div className="wrap subhero">
          <p className="eyebrow">Plano de saúde empresarial</p>
          <h1 id="titulo-beneficios">Contratar, revisar<br />e <span>acompanhar.</span></h1>
          <p className="intro pm-intro-larga">Da primeira contratação à gestão do dia a dia, a Lifitseg organiza a análise e acompanha o benefício junto com o RH.</p>
          <div className="actions">
            <LinkWhatsApp rotulo="beneficios-primeira-tela" className="primary">
              Conversar com a Lifitseg <span aria-hidden="true">↗</span>
            </LinkWhatsApp>
          </div>
          <nav className="ancoras" aria-label="Nesta página">
            <a href="#contratacao">Primeira contratação</a>
            <a href="#revisao">Revisão e renovação</a>
            <a href="#servicos">Gestão do benefício</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
        </div>
      </section>

      <section className="sec papel" aria-labelledby="titulo-momentos-b">
        <div className="wrap">
          <p className="eyebrow claro">Em que momento a empresa está</p>
          <h2 id="titulo-momentos-b">Três momentos,<br />uma mesma análise criteriosa.</h2>
          <div className="momentos-b">
            {MOMENTOS.map((m) => (
              <div key={m.id} className="mb" id={m.id}>
                <div className="pm-num">{m.numero}</div>
                <h3>{m.titulo}</h3>
                <p>{m.texto}</p>
                <a href="#contato">{m.acao} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec pm-off" id="servicos" aria-labelledby="titulo-servicos">
        <div className="wrap">
          <p className="eyebrow claro">O que a Lifitseg faz</p>
          <h2 id="titulo-servicos">Da análise à rotina do benefício.</h2>
          <div className="servicos">
            {SERVICOS.map((s, i) => (
              <article key={s.titulo} className={`serv${i === 0 ? ' escuro' : ''}`}>
                <div className="num">{s.rotulo}</div>
                <h3>{s.titulo}</h3>
                <p>{s.texto}</p>
              </article>
            ))}
          </div>
          <p className="pm-nota">A combinação dos serviços, a frequência e os canais são definidos na proposta de atendimento.</p>
        </div>
      </section>

      <section className="sec tecno" id="gestao" aria-labelledby="titulo-gestao-b">
        <div className="wrap rotina-grid">
          <div className="foto-rel">
            {/* Foto ilustrativa de banco (licença gratuita): não representa a equipe nem clientes. */}
            <Image src="/fotos/consultoria.png" alt="Reunião de trabalho, imagem ilustrativa" fill sizes="(min-width: 700px) 50vw, 100vw" />
            <span>Imagem ilustrativa</span>
          </div>
          <div>
            <p className="eyebrow">Gestão do benefício</p>
            <h2 id="titulo-gestao-b">A contratação é o começo.<br />A gestão é todo dia.</h2>
            <p className="lead">Inclusões, exclusões, faturas, reembolsos e autorizações passam por um atendimento organizado, com responsável e retorno registrado.</p>
            <ul className="funcoes">
              {GESTAO.map((g) => (
                <li key={g.titulo}>
                  <span className="ic"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={g.icone} /></svg></span>
                  <div><b>{g.titulo}</b>{g.texto}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sec papel" id="duvidas" aria-labelledby="titulo-duvidas-b">
        <div className="wrap">
          <p className="eyebrow claro">Dúvidas</p>
          <h2 id="titulo-duvidas-b">Perguntas técnicas frequentes.</h2>
          <div className="pm-faq"><DuvidasHome itens={FAQ_BENEFICIOS} /></div>
          <p className="pm-nota">Regras citadas a partir de páginas públicas da ANS consultadas em 16/10/2026. Cada caso exige conferência das condições aplicáveis.</p>
        </div>
      </section>

      <section className="sec pm-off" aria-labelledby="titulo-guias-b">
        <div className="wrap">
          <p className="eyebrow claro">Conhecimento</p>
          <h2 id="titulo-guias-b">Guias para aprofundar.</h2>
          <div className="pm-guias-lista"><GuiasDestaque area="saude" /></div>
          <Link className="pm-link-verde" href="/conhecimento">Ver todos os guias <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="sec contato" id="contato" aria-labelledby="titulo-contato-b">
        <div className="wrap contato-grid">
          <div>
            <p className="eyebrow">Vamos conversar</p>
            <h2 id="titulo-contato-b">Conte o momento<br />da sua empresa.</h2>
            <p className="lead">O WhatsApp abre com uma mensagem pronta. O assistente virtual faz a primeira triagem e um consultor continua a conversa.</p>
            <div className="wa">
              <LinkWhatsApp rotulo="beneficios-contato" className="primary">
                Conversar com a Lifitseg no WhatsApp <span aria-hidden="true">↗</span>
              </LinkWhatsApp>
              <small>{contato.whatsappExibicao} · {contato.horario}. Primeiro atendimento automático, a qualquer hora.</small>
            </div>
            <div className="painel pm-passos" role="img" aria-label="Próximos passos depois do contato: triagem pelo WhatsApp, conversa com o consultor e estudo comparativo">
              <div className="painel-top">DEPOIS DO SEU CONTATO <i>Como funciona</i></div>
              <div className="reg on"><span className="pt">1</span><div><b>Triagem pelo WhatsApp</b><span>Algumas perguntas sobre a empresa</span></div><em>Na hora</em></div>
              <div className="reg"><span className="pt">2</span><div><b>Conversa com o consultor</b><span>Entendimento do cenário e dos critérios</span></div><em>Dia útil</em></div>
              <div className="reg"><span className="pt">3</span><div><b>Estudo comparativo</b><span>Propostas lado a lado, pelos mesmos critérios</span></div><em>Combinado</em></div>
            </div>
          </div>
          <div className="pm-form-card">
            <h3>Prefere deixar seus dados?</h3>
            <p>Primeira contratação, revisão ou renovação: um consultor retorna pelo canal que você indicar.</p>
            <FormularioEmpresarial pontoEntrada="beneficios-corporativos" />
          </div>
        </div>
      </section>
    </div>
  )
}
