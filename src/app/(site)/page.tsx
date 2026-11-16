import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FormularioEmpresarial } from '@/components/forms/FormularioEmpresarial'
import { LinkWhatsApp } from '@/components/common/LinkWhatsApp'
import { Feixes, Fios } from '@/components/premium/Feixes'
import { CARTEIRA, LINK_AVALIACOES_GOOGLE, POSICIONAMENTO } from '@/content/atuacao'
import { GUIAS } from '@/content/guias'
import { CAPA_GUIA, IMAGENS } from '@/content/imagens'
import { OPERADORAS_SAUDE, PORTFOLIO_HOME_CONFIRMADO } from '@/config/operadoras'
import { slugDaFicha } from '@/config/fichaOperadora'
import { LogoParceiro } from '@/components/common/LogoParceiro'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { siteConfig } from '@/config/site'
import { fichaEmpresa, jsonLdSeguro } from '@/utils/fichaEmpresa'

// Home no visual premium (S-09; prévia aprovada por Raphael em 15/11/2026: "gostei, pode seguir").
// Narrativa da especificação do Chief (SITE_MESTRE 5.7): primeira tela → confiança → momento da empresa → método →
// tecnologia → pessoas → conhecimento → contato. Sem promessa de economia ou resultado; a tecnologia mostrada é a que
// existe (assistente do WhatsApp e registro das demandas), em representação conceitual identificada.

export const metadata: Metadata = {
  title: { absolute: 'Plano de saúde empresarial, da escolha ao cuidado diário | Lifitseg' },
  description: siteConfig.descricao,
  alternates: { canonical: '/' },
}

const MOMENTOS = [
  {
    numero: '01 / COMEÇAR',
    titulo: 'Primeira contratação',
    texto: 'Clareza para organizar necessidades e avaliar as alternativas da sua empresa.',
    acao: 'Quero entender as possibilidades',
    icone: 'M5 19V7h14v12M3 19h18M8 7V4h8v3M9 11h1m4 0h1m-6 4h1m4 0h1',
  },
  {
    numero: '02 / REAVALIAR',
    titulo: 'Revisão e renovação',
    texto: 'Critérios para compreender o contrato e preparar os próximos passos.',
    acao: 'Quero rever meu benefício',
    icone: 'M4 19h16M7 16V9m5 7V5m5 11v-5M4 5l3 1 5-3 5 4 3-2',
  },
  {
    numero: '03 / ACOMPANHAR',
    titulo: 'Apoio à gestão',
    texto: 'Organização e acompanhamento próximo para a rotina do benefício.',
    acao: 'Quero conhecer o acompanhamento',
    icone: 'M8 7h9v13H4V7h4m0-3h5v5H8zM8 13h5m-5 3h7M18 10h3v8h-3',
  },
]

// Parceiros de saúde (grade da home anterior, que Raphael preferia; uso das imagens confirmado em 16/10/2026,
// ver config/operadoras). Logos originais, em cor; só os que têm arquivo no site. A ordem não é ranking.
const PARCEIROS = OPERADORAS_SAUDE.filter((m) => existsSync(join(process.cwd(), 'public/seguradoras', `${m.file}.png`)))

const GUIAS_HOME = ['como-comparar-propostas-de-plano-empresarial', 'o-que-organizar-antes-da-renovacao', 'rede-assistencial-o-produto-importa']
  .map((slug) => GUIAS.find((g) => g.slug === slug))
  .filter((g): g is (typeof GUIAS)[number] => Boolean(g))

function Icone({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  )
}

export default function HomePage() {
  const { contato, endereco, juridico } = siteConfig
  return (
    <div className="pm">
      {/* Ficha da empresa para buscadores (S-07): só dado institucional do siteConfig. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdSeguro(fichaEmpresa(siteConfig)) }} />
      {/* Primeira tela (Fundo A) */}
      <section className="dark pm-hero" aria-labelledby="titulo-home">
        <Feixes variante="hero" />
        <div className="wrap hero">
          <div className="copy">
            <p className="eyebrow">Consultoria em saúde e seguros</p>
            <h1 id="titulo-home">
              Plano empresarial,
              <br />
              da escolha ao
              <br />
              <span>cuidado diário.</span>
            </h1>
            <p className="intro">Consultoria para decidir com clareza. Tecnologia e acompanhamento próximo para cuidar da rotina do benefício.</p>
            <div className="actions">
              <LinkWhatsApp rotulo="home-primeira-tela" className="primary">
                Conversar com a Lifitseg <span aria-hidden="true">↗</span>
              </LinkWhatsApp>
              <a className="secondary" href="#momento">Conheça nossa atuação</a>
            </div>
            <div className="under">
              <span><i aria-hidden="true">✓</i> Análise criteriosa</span>
              <span><i aria-hidden="true">✓</i> Apoio ao RH</span>
              <span><i aria-hidden="true">✓</i> Relação próxima</span>
            </div>
          </div>
          <div className="visual">
            <div className="outline" aria-hidden="true" />
            <div className="photo">
              {/* Foto ilustrativa de banco (licença gratuita), já usada no site: não representa a equipe nem clientes. */}
              <Image src="/fotos/consultoria.png" alt="Reunião de trabalho, imagem ilustrativa" fill priority sizes="(min-width: 1050px) 600px, (min-width: 700px) 50vw, 100vw" />
              <span className="image-note">Decisões que começam pela sua realidade</span>
            </div>
            <div className="tiny-badge" aria-hidden="true"><b>◇</b> INTELIGÊNCIA &amp; CUIDADO</div>
            <div className="tech">
              <div className="tech-head"><p>TECNOLOGIA A SERVIÇO DO CUIDADO</p><span className="mini-icon" aria-hidden="true">⌁</span></div>
              <p className="tech-title">Organização em cada etapa.<br />Presença em cada retorno.</p>
              <div className="steps"><span className="dot" aria-hidden="true">✓</span>Solicitação recebida</div>
              <div className="steps active"><span className="dot" aria-hidden="true">·</span>Em acompanhamento<span className="pill">Continuidade</span></div>
              <div className="steps last"><span className="dot" aria-hidden="true">↗</span>Retorno registrado</div>
              <div className="concept">Representação conceitual do acompanhamento.</div>
            </div>
            <div className="photo-mark">Da contratação<br /><span>à gestão do benefício.</span></div>
          </div>
        </div>
        <div className="wrap ribbon">
          <span>SAÚDE EMPRESARIAL</span>
          <span>CONTRATAÇÃO E REVISÃO</span>
          <span>GESTÃO DO BENEFÍCIO</span>
          <span className="rh">RH, FINANCEIRO E DIREÇÃO</span>
        </div>
      </section>

      {/* Confiança compacta (Fundo C): só dado verificável e com fonte. */}
      <section className="confianca" aria-label="Dados institucionais">
        <div className="wrap conf-grid pm-conf-4">
          <div className="conf-item"><b>SUSEP {juridico.registroSusep}</b><span>Corretora registrada na Superintendência de Seguros Privados.</span></div>
          <div className="conf-item"><b>{endereco.cidade} · {endereco.uf}</b><span>Escritório próprio, com atendimento à região e ao estado de São Paulo.</span></div>
          <div className="conf-item">
            <b>Avaliações no Google</b>
            <span>Veja o que clientes e parceiros publicaram.</span>
            <a className="pm-conf-link" href={LINK_AVALIACOES_GOOGLE} target="_blank" rel="noopener noreferrer">Ver avaliações <span aria-hidden="true">↗</span><span className="sr-only"> (abre em nova aba)</span></a>
          </div>
          <div className="conf-item">
            <b>{PARCEIROS.length} operadoras de saúde</b>
            <span>Parceiras credenciadas da corretora; veja a lista completa.</span>
            <a className="pm-conf-link" href="#parceiros">Ver parceiros <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      {/* Momento da empresa */}
      <section className="momento" id="momento" aria-labelledby="titulo-momento">
        <div className="wrap">
          <div className="sectionhead">
            <div>
              <p className="eyebrow">O seu momento, o nosso ponto de partida</p>
              <h2 id="titulo-momento">Cada empresa tem uma realidade.<br />O cuidado começa por entendê-la.</h2>
            </div>
            <p>Uma conversa bem orientada considera o cenário da empresa e o apoio que ela precisa.</p>
          </div>
          <div className="cards">
            {MOMENTOS.map((m, i) => (
              <article key={m.titulo} className={`card${i === 0 ? ' featured' : ''}`}>
                <div className="cardtop"><span className="number">{m.numero}</span><span className="cardicon"><Icone d={m.icone} /></span></div>
                <h3>{m.titulo}</h3>
                <p>{m.texto}</p>
                <a href="#contato">{m.acao} <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
          <div className="foot"><b>{POSICIONAMENTO}</b><span>{endereco.cidade} · São Paulo<br />Atuação conforme o escopo de cada empresa.</span></div>
        </div>
      </section>

      {/* Método (Fundo B, cards editoriais) */}
      <section className="sec papel" id="como-atuamos" aria-labelledby="titulo-metodo">
        <Fios style={{ right: -120, top: -40, width: 620, stroke: '#087f6d', opacity: 0.07 }} />
        <div className="wrap">
          <p className="eyebrow claro">Como atuamos</p>
          <h2 id="titulo-metodo">Informação organizada<br />antes de qualquer decisão.</h2>
          <p className="lead">Cada proposta é lida pelos critérios que importam para a sua empresa, não só pelo preço.</p>
          <div className="metodo-grid">
            <article className="mcard grande">
              <div className="num">01 · DIAGNÓSTICO</div>
              <h3>Entender a empresa antes de comparar.</h3>
              <p>Quem são as pessoas, onde estão, o que o benefício precisa resolver e quem participa da decisão. É o que transforma uma cotação em uma recomendação.</p>
              <div className="criterios"><span>Localidades</span><span>Perfil da equipe</span><span>Contrato atual</span><span>Orçamento</span><span>Quem decide</span></div>
              <div className="diag">
                <div className="linha-etapas" aria-label="Etapas: diagnóstico, comparação, contratação e gestão">
                  <div className="on">Diagnóstico</div><div>Comparação</div><div>Contratação</div><div>Gestão</div>
                </div>
              </div>
            </article>
            <article className="mcard">
              <div className="num">02 · COMPARAÇÃO</div>
              <h3>Propostas lado a lado, pelos mesmos critérios.</h3>
              <div className="criterios"><span>Rede assistencial</span><span>Acomodação</span><span>Abrangência</span><span>Coparticipação</span><span>Reajuste</span><span>Carências</span></div>
            </article>
            <article className="mcard">
              <div className="num">03 · CONTRATAÇÃO</div>
              <h3>Documentos e prazos conduzidos com o RH.</h3>
              <p>Do aceite à implantação, com cada etapa combinada e registrada.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Tecnologia (Fundo A) */}
      <section className="sec tecno" id="acompanhamento" aria-labelledby="titulo-tecno">
        <Feixes variante="tecno" opacidade={0.12} />
        <div className="wrap tecno-grid">
          <div>
            <p className="eyebrow">Tecnologia a serviço do cuidado</p>
            <h2 id="titulo-tecno">Cada pedido registrado.<br />Cada retorno acompanhado.</h2>
            <p className="lead">A rotina do benefício passa por um sistema próprio de atendimento, que organiza as solicitações para que cada uma tenha responsável e retorno.</p>
            <ul className="funcoes">
              <li><span className="ic"><Icone d="M4 5h16v11H8l-4 4z" /></span><div><b>WhatsApp com triagem imediata</b>O assistente virtual recebe a mensagem a qualquer hora e encaminha ao consultor responsável.</div></li>
              <li><span className="ic"><Icone d="M6 4h12v16H6zM9 9h6M9 13h6M9 17h3" /></span><div><b>Demandas com responsável e prazo</b>Inclusões, exclusões, reembolsos e autorizações ficam registrados do pedido ao retorno.</div></li>
              <li><span className="ic"><Icone d="M4 19V9m6 10V5m6 14v-7m4 7H3" /></span><div><b>Histórico da empresa em um só lugar</b>Contrato, movimentações e conversas acessíveis ao consultor que atende.</div></li>
            </ul>
          </div>
          <div className="painel" role="img" aria-label="Representação conceitual do acompanhamento de uma solicitação">
            <div className="painel-top">ACOMPANHAMENTO DA SOLICITAÇÃO <i>Conceitual</i></div>
            <div className="reg"><span className="pt">✓</span><div><b>Solicitação recebida</b><span>Pelo WhatsApp da central</span></div><em>Registrada</em></div>
            <div className="reg"><span className="pt">✓</span><div><b>Encaminhada ao consultor</b><span>Responsável definido</span></div><em>Atribuída</em></div>
            <div className="reg on"><span className="pt">•</span><div><b>Em acompanhamento com a operadora</b><span>Prazo e próximos passos combinados</span></div><em>Em andamento</em></div>
            <div className="reg"><span className="pt">↗</span><div><b>Retorno ao RH</b><span>Resposta registrada no histórico</span></div><em>A seguir</em></div>
            <small>Representação conceitual, sem dados de clientes.</small>
          </div>
        </div>
      </section>

      {/* Parceiros de mercado (em cor, como a grade anterior) */}
      {(PORTFOLIO_HOME_CONFIRMADO || process.env.NODE_ENV !== 'production') && (
        <section className="sec pm-parceiros" id="parceiros" aria-labelledby="titulo-parceiros">
          <div className="wrap">
            <div className="pm-parceiros-topo">
              <div>
                <p className="eyebrow claro">Parceiros de mercado</p>
                <h2 id="titulo-parceiros">As principais operadoras,<br />analisadas para a sua empresa.</h2>
              </div>
              <p className="lead">Trabalhamos com parceiros credenciados para avaliar as alternativas pertinentes ao cenário da empresa, considerando produto, localização e requisitos da contratação.</p>
            </div>
            <ul className="pm-logos">
              {PARCEIROS.map((m) => {
                const ficha = slugDaFicha(m.name)
                const logo = <LogoParceiro file={m.file} nome={m.name} />
                return <li key={m.file}>{ficha ? <Link href={`/operadoras/${ficha}`} aria-label={`Ficha da ${m.name}`}>{logo}</Link> : logo}</li>
              })}
            </ul>
            <p className="pm-nota">Corretora autorizada a comercializar. Disponibilidade, rede e condições dependem do produto e da análise comercial; a ordem não é ranking nem endosso.</p>
          </div>
        </section>
      )}

      {/* Pessoas: sem foto da equipe até a sessão de fotos (D3); a foto do painel é ilustrativa, não o escritório. */}
      <section className="sec papel" id="pessoas" aria-labelledby="titulo-pessoas">
        <div className="wrap pessoas-grid">
          <div className="pm-escritorio">
            <Image src={IMAGENS.escritorio.arquivo} alt="" fill sizes="(min-width: 1050px) 620px, 100vw" className="pm-escritorio-foto" />
            <span className="pm-ilustrativa">Imagem ilustrativa</span>
            <Feixes variante="capa" opacidade={0.18} />
            <div className="pm-escritorio-conteudo">
              <p className="eyebrow">Escritório em {endereco.cidade}</p>
              <p className="pm-escritorio-endereco">{endereco.linha1.replace(' - ', ' · ')}<br />{endereco.bairro} · {endereco.cidade}/{endereco.uf}</p>
              <p className="pm-escritorio-horario">{contato.horario}</p>
            </div>
          </div>
          <div>
            <p className="eyebrow claro">Quem cuida do seu benefício</p>
            <h2 id="titulo-pessoas">Consultoria próxima,<br />com nome e rosto.</h2>
            <p className="lead">Atendimento por consultores que conhecem o contrato da sua empresa, e não por uma fila genérica.</p>
            <ul className="lista-pessoas">
              <li>Um consultor responsável por empresa, do estudo à gestão.</li>
              <li>Apoio direto ao RH nas movimentações e dúvidas dos beneficiários.</li>
              <li>{contato.horario}; fora do horário, o assistente registra e o consultor responde no próximo dia útil.</li>
            </ul>
            <p className="pm-carteira">{CARTEIRA}</p>
            <Link className="pm-link-verde" href="/sobre-e-conhecimento#sobre">Conhecer a Lifitseg <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      {/* Conhecimento */}
      <section className="sec pm-conhecimento" id="conhecimento" aria-labelledby="titulo-guias">
        <div className="wrap">
          <p className="eyebrow claro">Conhecimento</p>
          <h2 id="titulo-guias">Entenda os critérios<br />antes de decidir.</h2>
          <div className="guias">
            {GUIAS_HOME.map((g, i) => (
              <Link key={g.slug} className={`guia${i === 0 ? ' principal' : ''}`} href={`/conhecimento/${g.slug}`}>
                <div className="capa">
                  {CAPA_GUIA[g.slug] && <Image src={CAPA_GUIA[g.slug].arquivo} alt="" fill sizes={i === 0 ? '(min-width: 1050px) 700px, 100vw' : '(min-width: 1050px) 500px, 100vw'} className="pm-capa-foto" />}
                  <span className="tag">{g.tema}</span>
                  {i === 0 && <Feixes variante="capa" opacidade={0.25} />}
                </div>
                <div className="corpo">
                  <h3>{g.titulo}</h3>
                  {i === 0 && <p>{g.resumo}</p>}
                  <span className="pm-ler">Ler o guia →</span>
                </div>
              </Link>
            ))}
          </div>
          <Link className="pm-link-verde" href="/conhecimento">Ver todos os guias <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      {/* Contato (Fundo C, fechamento): WhatsApp como ação principal; formulário como alternativa. */}
      <section className="sec contato" id="contato" aria-labelledby="titulo-contato">
        <div className="wrap contato-grid">
          <div>
            <p className="eyebrow">Vamos conversar</p>
            <h2 id="titulo-contato">Conte o momento<br />da sua empresa.</h2>
            <p className="lead">O WhatsApp já abre com uma mensagem pronta. O assistente virtual faz a primeira triagem e um consultor continua a conversa.</p>
            <div className="wa">
              <LinkWhatsApp rotulo="home-contato" className="primary">
                Conversar com a Lifitseg no WhatsApp <span aria-hidden="true">↗</span>
              </LinkWhatsApp>
              <small>{contato.whatsappExibicao} · {contato.horario}. Primeiro atendimento automático, a qualquer hora.</small>
            </div>
          </div>
          <div className="pm-form-card">
            <h3>Prefere deixar seus dados?</h3>
            <p>Um consultor retorna pelo canal que você indicar.</p>
            <FormularioEmpresarial pontoEntrada="home-formulario" />
          </div>
        </div>
      </section>
    </div>
  )
}
