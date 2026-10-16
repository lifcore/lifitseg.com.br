import Image from 'next/image'
import { LinkWhatsApp } from '@/components/common/LinkWhatsApp'
import { SEGURADORAS, type Solucao } from '@/content/seguros'
import { siteConfig } from '@/config/site'

// Blocos das páginas de seguros (etapa 3 do Chat). Fotos temáticas do site
// anterior, proporção 3:2 igual em todos os cartões, sem distorcer.

export function SolucoesSeguros({ itens }: { itens: Solucao[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {itens.map((s) => (
        <article key={s.id} id={s.id} className="flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-lifitseg-line bg-white">
          {s.imagem && (
            <Image src={s.imagem} alt={s.alt ?? ''} width={900} height={600} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="aspect-[3/2] w-full object-cover" />
          )}
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-lifitseg-dark" style={{ fontSize: '1.15rem' }}>{s.titulo}</h3>
            <p className="mt-3 text-sm text-lifitseg-text-soft">{s.texto}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

/** Caminho próprio para sinistro e atendimento: não manda quem está em dificuldade para o formulário comercial. */
export function AtendimentoSinistro({ texto, rotulo }: { texto: string; rotulo: string }) {
  return (
    <section aria-labelledby={`titulo-sinistro-${rotulo}`} className="bg-lifitseg-dark py-16 text-lifitseg-offwhite">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8">
        <div>
          <h2 id={`titulo-sinistro-${rotulo}`} className="text-white">Quando acontece um sinistro</h2>
          <p className="mt-4 text-sm text-lifitseg-offwhite/70">Já é cliente e precisa de orientação sobre uma ocorrência? Use o canal de atendimento, não o formulário de contato comercial.</p>
        </div>
        <div>
          <p className="text-lifitseg-offwhite/85">{texto}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <LinkWhatsApp rotulo={`sinistro-${rotulo}`} className="rounded-xl bg-primary px-5 py-3 font-bold text-lifitseg-dark hover:opacity-90">
              Atendimento pelo WhatsApp
            </LinkWhatsApp>
            <a href={`mailto:${siteConfig.contato.email}`} className="rounded-xl border border-white/20 px-5 py-3 font-semibold hover:border-lifitseg-mint">
              {siteConfig.contato.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function GradeSeguradoras() {
  return (
    <section aria-labelledby="titulo-seguradoras" className="bg-lifitseg-paper py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="titulo-seguradoras" className="text-lifitseg-dark">Seguradoras parceiras.</h2>
        <p className="mt-3 max-w-3xl text-sm text-lifitseg-text-soft">
          Trabalhamos com seguradoras parceiras para avaliar alternativas pertinentes a cada necessidade. Uma marca na lista não significa disponibilidade de todo produto: aceitação e condições dependem da análise de cada seguradora.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {SEGURADORAS.map((s) => (
            <li key={s.arquivo} className="flex h-20 items-center justify-center rounded-2xl border border-lifitseg-line bg-white p-4">
              <Image src={`/seguradoras/${s.arquivo}.png`} alt={s.nome} width={120} height={44} className="max-h-10 w-auto object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
