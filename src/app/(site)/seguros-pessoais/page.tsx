import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumb from '@/components/common/Breadcrumb'
import { DuvidasHome } from '@/components/home/DuvidasHome'
import { FormularioSeguros } from '@/components/forms/FormularioSeguros'
import { SolucoesSeguros, AtendimentoSinistro, GradeSeguradoras } from '@/components/seguros/BlocosSeguros'
import { GuiasDestaque } from '@/components/atuacao/Blocos'
import { PESSOAL } from '@/content/seguros'

// Seguros Pessoais — etapa 3 do Chief Chat (Lifitseg_Site_Seguros_Conteudo_v1.md).
// Formulário de pessoa física: sem empresa, CNPJ ou faixa de vidas.

export const metadata: Metadata = {
  title: { absolute: 'Seguros para você, sua família e seu patrimônio | Lifitseg' },
  description: 'Entenda seguros de auto, residência, vida, viagem e equipamentos com uma consultoria próxima e uma comparação clara das condições.',
}

const P = PESSOAL

export default function SegurosPessoaisPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Início', href: '/' }, { label: 'Seguros pessoais' }]} />

      <section className="bg-lifitseg-dark text-lifitseg-offwhite">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
          <div>
            <p className="text-xs font-bold tracking-widest text-lifitseg-mint uppercase">{P.abertura.sobretitulo}</p>
            <h1 className="mt-5 text-4xl text-white sm:text-5xl" style={{ lineHeight: 1.15 }}>{P.abertura.h1}</h1>
            <p className="mt-6 max-w-xl text-lg text-lifitseg-offwhite/80">{P.abertura.texto}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="#contato" className="rounded-xl bg-primary px-6 py-3.5 text-center text-sm font-bold text-lifitseg-dark hover:opacity-90">{P.abertura.ctaPrincipal}</a>
              <a href="#solucoes" className="text-sm font-semibold hover:text-lifitseg-mint">{P.abertura.ctaSecundario} <span aria-hidden="true">→</span></a>
            </div>
          </div>
          {/* Foto ilustrativa de banco (Canva, licença gratuita): não representa clientes. */}
          <Image
            src="/fotos/familia.png"
            alt="Família reunida na cozinha durante o café da manhã"
            width={1600}
            height={900}
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-video w-full rounded-3xl object-cover"
          />
        </div>
      </section>

      <section id="solucoes" aria-labelledby="titulo-solucoes-pes" className="scroll-mt-20 bg-lifitseg-paper py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-solucoes-pes" className="text-lifitseg-dark">Proteção conforme sua rotina.</h2>
          <div className="mt-10"><SolucoesSeguros itens={P.solucoes} /></div>
        </div>
      </section>

      <section aria-labelledby="titulo-como" className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 id="titulo-como" className="text-lifitseg-dark">Como ajudamos.</h2>
            <ol className="mt-6 space-y-3">
              {P.como.map((passo, i) => (
                <li key={passo} className="flex gap-4">
                  <span className="text-sm font-bold text-lifitseg-green">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-lifitseg-text">{passo}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="self-center rounded-2xl bg-lifitseg-paper p-6 text-sm text-lifitseg-text">{P.leve}</p>
        </div>
      </section>

      <AtendimentoSinistro texto="Priorize a segurança, utilize os canais indicados na apólice e reúna os documentos solicitados. A Lifitseg apoia a comunicação e o acompanhamento, sem antecipar a decisão da seguradora." rotulo="pessoal" />

      <GradeSeguradoras />

      <section aria-labelledby="titulo-faq-pes" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-faq-pes" className="mb-8 text-lifitseg-dark">Perguntas frequentes.</h2>
          <DuvidasHome itens={P.faq} />
        </div>
      </section>

      <section aria-labelledby="titulo-guias-pes" className="bg-lifitseg-paper py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-guias-pes" className="text-lifitseg-dark">Guias de seguros.</h2>
          <div className="mt-8"><GuiasDestaque area="seguros" /></div>
        </div>
      </section>

      <section id="contato" aria-labelledby="titulo-contato-pes" className="scroll-mt-24 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8">
          <div>
            <h2 id="titulo-contato-pes" className="text-lifitseg-dark">{P.encerramento}</h2>
            <p className="mt-4 max-w-md text-lifitseg-text-soft">{P.ctaFinal}: conte o que você quer proteger.</p>
          </div>
          <div className="rounded-3xl border border-lifitseg-line bg-lifitseg-paper p-6 sm:p-8">
            <FormularioSeguros variante="pessoal" pontoEntrada="seguros-pessoais" />
          </div>
        </div>
      </section>
    </>
  )
}
