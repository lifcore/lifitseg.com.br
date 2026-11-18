import { DuvidasHome } from '@/components/home/DuvidasHome'
import { FormularioEmpresarial } from '@/components/forms/FormularioEmpresarial'
import { LinkWhatsApp } from '@/components/common/LinkWhatsApp'
import { Feixes } from '@/components/premium/Feixes'
import { siteConfig } from '@/config/site'
import type { Segmento } from '@/content/segmentos'

// Página por segmento empresarial (MEI, PME, RH), destino das campanhas aprovadas no Lifcore. Mesmo visual premium
// das páginas publicadas. Uma ideia por seção e um CTA principal (o formulário). CNPJ obrigatório (D-17: página de
// anúncio). A origem e o ponto de entrada vão ao Connect, que liga o contato ao resultado por campanha.
export function PaginaSegmento({ s }: { s: Segmento }) {
  const { contato } = siteConfig
  const p = s.pontoEntrada
  return (
    <div className="pm">
      <section className="dark" aria-labelledby={`titulo-${p}`}>
        <Feixes variante="interna" opacidade={0.14} />
        <div className="wrap subhero">
          <p className="eyebrow">{s.eyebrow}</p>
          <h1 id={`titulo-${p}`}>{s.titulo}<br /><span>{s.destaque}</span></h1>
          <p className="intro pm-intro-larga">{s.intro}</p>
          <div className="actions">
            <a className="primary" href="#contato">{s.cta} <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section className="sec papel" aria-labelledby={`criterios-${p}`}>
        <div className="wrap">
          <p className="eyebrow claro">Antes de comparar</p>
          <h2 id={`criterios-${p}`}>{s.tituloCriterios}</h2>
          <div className="momentos-b">
            {s.criterios.map((c, i) => (
              <div key={c.titulo} className="mb">
                <div className="pm-num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{c.titulo}</h3>
                <p>{c.texto}</p>
              </div>
            ))}
          </div>
          {s.linhaDoTempo && (
            <div className="pm-seg-linha">
              <h3>{s.linhaDoTempo.titulo}</h3>
              <ol className="linha-etapas pm-seg-etapas" aria-label={s.linhaDoTempo.passos.join(', ')}>
                {s.linhaDoTempo.passos.map((passo, i) => <li key={passo} className={i === 0 ? 'on' : undefined}>{passo}</li>)}
              </ol>
              <p className="pm-nota">{s.linhaDoTempo.nota}</p>
            </div>
          )}
        </div>
      </section>

      <section className="sec pm-off" aria-labelledby={`entrega-${p}`}>
        <div className="wrap">
          <p className="eyebrow claro">Como trabalhamos</p>
          <h2 id={`entrega-${p}`}>{s.entrega.titulo}</h2>
          <div className="servicos">
            {s.entrega.itens.map((item, i) => (
              <article key={item.titulo} className={`serv${i === 0 ? ' escuro' : ''}`}>
                <div className="num">{item.rotulo}</div>
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec papel" aria-labelledby={`duvidas-${p}`}>
        <div className="wrap">
          <p className="eyebrow claro">Dúvidas</p>
          <h2 id={`duvidas-${p}`}>Perguntas frequentes.</h2>
          <div className="pm-faq"><DuvidasHome itens={s.duvidas} /></div>
          <p className="pm-nota">Regras citadas a partir de páginas públicas da ANS consultadas em 18/11/2026. Cada caso exige conferência das condições do produto.</p>
        </div>
      </section>

      <section className="sec contato" id="contato" aria-labelledby={`contato-${p}`}>
        <div className="wrap contato-grid">
          <div>
            <p className="eyebrow">Próximo passo</p>
            <h2 id={`contato-${p}`}>{s.formulario.titulo}.</h2>
            <p className="lead">{s.formulario.texto}</p>
            <div className="wa">
              <LinkWhatsApp rotulo={`${p}-contato`} className="primary">
                Prefiro conversar pelo WhatsApp <span aria-hidden="true">↗</span>
              </LinkWhatsApp>
              <small>{contato.whatsappExibicao} · {contato.horario}. Primeiro atendimento automático, a qualquer hora.</small>
            </div>
          </div>
          <div className="pm-form-card">
            <h3>{s.formulario.titulo}</h3>
            <p>{s.formulario.texto}</p>
            <FormularioEmpresarial
              pontoEntrada={p}
              cnpjObrigatorio
              textoBotao={s.cta}
              objetivos={s.formulario.objetivos}
              mensagemSucesso={s.formulario.mensagemSucesso}
              mostrarMesRenovacao={s.formulario.mostrarMesRenovacao}
            />
            {s.formulario.semCnpj && (
              <p className="pm-seg-sem-cnpj">
                <LinkWhatsApp rotulo={`${p}-sem-cnpj`}>{s.formulario.semCnpj}</LinkWhatsApp>
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
