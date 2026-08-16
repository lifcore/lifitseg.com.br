import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { lifcoreApi } from '@/services/lifcoreApi'
import { REGIOES_SAUDE, nomeDaRegiao } from '@/config/referenciasSaude'
import { CategoriaRegiaoListagem } from '@/components/referencias-saude/CategoriaRegiaoListagem'

type PageProps = { params: Promise<{ regiao: string }> }

export async function generateStaticParams() {
  return REGIOES_SAUDE.map((r) => ({ regiao: r.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { regiao } = await params
  const nome = nomeDaRegiao(regiao)
  return {
    title: `Hospitais de Referência — ${nome}`,
    description: `Hospitais privados de referência em ${nome}.`,
  }
}

export default async function HospitaisRegiaoPage({ params }: PageProps) {
  const { regiao } = await params
  if (!REGIOES_SAUDE.some((r) => r.slug === regiao)) notFound()

  const resultado = await lifcoreApi.listarReferenciasSaude({ tipo: 'hospital', regiao })
  const instituicoes = resultado?.data ?? []

  return (
    <CategoriaRegiaoListagem
      categoriaSlug="hospitais"
      categoriaTitulo="Hospitais de Referência"
      categoriaTituloMinusculo="hospitais"
      regiaoSlug={regiao}
      instituicoes={instituicoes}
    />
  )
}
