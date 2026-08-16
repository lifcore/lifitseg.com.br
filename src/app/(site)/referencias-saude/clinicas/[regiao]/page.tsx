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
    title: `Clínicas de Referência — ${nome}`,
    description: `Clínicas e centros especializados de referência em ${nome}.`,
  }
}

export default async function ClinicasRegiaoPage({ params }: PageProps) {
  const { regiao } = await params
  if (!REGIOES_SAUDE.some((r) => r.slug === regiao)) notFound()

  const resultado = await lifcoreApi.listarReferenciasSaude({ tipo: 'clinica', regiao })
  const instituicoes = resultado?.data ?? []

  return (
    <CategoriaRegiaoListagem
      categoriaSlug="clinicas"
      categoriaTitulo="Clínicas de Referência"
      categoriaTituloMinusculo="clínicas"
      regiaoSlug={regiao}
      instituicoes={instituicoes}
    />
  )
}
