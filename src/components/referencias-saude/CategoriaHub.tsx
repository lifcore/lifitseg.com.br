import Link from 'next/link'
import Breadcrumb from '@/components/common/Breadcrumb'
import { StandardCard } from '@/components/common/StandardCard'
import { REGIOES_SAUDE } from '@/config/referenciasSaude'
import { CtaConsultarCobertura } from './CtaConsultarCobertura'

type CategoriaHubProps = {
  categoriaSlug: string
  titulo: string
  descricao: string
  contagemPorRegiao: Record<string, number>
}

/**
 * Doc REFERENCIAS_SAUDE_003, seção 3: cada categoria principal
 * (Hospitais/Laboratórios/Clínicas) tem página própria com Hero,
 * breve explicação e seleção de regiões — mesmo comportamento que já
 * existia pras páginas de Exames de Imagem/Laboratoriais, reutilizado
 * aqui. Server Component puro (sem hooks) — pode ser chamado direto
 * de dentro de um `page.tsx` async.
 */
export function CategoriaHub({ categoriaSlug, titulo, descricao, contagemPorRegiao }: CategoriaHubProps) {
  return (
    <>
      <Breadcrumb items={[{ label: 'Referências em Saúde', href: '/referencias-saude' }, { label: titulo }]} />

      <section className="bg-lifitseg-offwhite py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4 text-3xl font-black text-lifitseg-dark sm:text-4xl">{titulo}</h1>
          <p className="mx-auto max-w-2xl text-base text-lifitseg-dark/70">{descricao}</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {REGIOES_SAUDE.map((regiao) => (
              <Link key={regiao.slug} href={`/referencias-saude/${categoriaSlug}/${regiao.slug}`}>
                <StandardCard
                  title={regiao.nome}
                  description={`${contagemPorRegiao[regiao.slug] ?? 0} catalogados nesta região.`}
                  badge="Ver lista"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaConsultarCobertura />
    </>
  )
}
