import Breadcrumb from '@/components/common/Breadcrumb'
import { nomeDaRegiao } from '@/config/referenciasSaude'
import { InstituicaoCard } from './InstituicaoCard'
import { CtaConsultarCobertura } from './CtaConsultarCobertura'

type CategoriaRegiaoListagemProps = {
  categoriaSlug: string
  categoriaTitulo: string
  categoriaTituloMinusculo: string
  regiaoSlug: string
  instituicoes: any[]
}

/** Mesmo componente usado pelas 3 categorias (Hospitais/Laboratórios/Clínicas) — evita repetir a mesma listagem 3 vezes. */
export function CategoriaRegiaoListagem({
  categoriaSlug,
  categoriaTitulo,
  categoriaTituloMinusculo,
  regiaoSlug,
  instituicoes,
}: CategoriaRegiaoListagemProps) {
  const nomeRegiao = nomeDaRegiao(regiaoSlug)

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Referências em Saúde', href: '/referencias-saude' },
          { label: categoriaTitulo, href: `/referencias-saude/${categoriaSlug}` },
          { label: nomeRegiao },
        ]}
      />

      <section className="bg-lifitseg-offwhite py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4 text-3xl font-black text-lifitseg-dark sm:text-4xl">
            {categoriaTitulo} — {nomeRegiao}
          </h1>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {instituicoes.length === 0 ? (
            <p className="text-center text-lifitseg-dark/60">
              Ainda não temos {categoriaTituloMinusculo} catalogados nesta região.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {instituicoes.map((inst) => (
                <InstituicaoCard
                  key={inst.slug}
                  slug={inst.slug}
                  nome={inst.nome}
                  cidade={inst.cidade}
                  status={inst.status}
                  destaque={inst.destaque}
                  logoUrl={inst.logo_url}
                  especialidades={inst.especialidades}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaConsultarCobertura />
    </>
  )
}
