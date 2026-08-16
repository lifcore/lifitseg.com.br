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
    title: `Laboratórios de Referência — ${nome}`,
    description: `Laboratórios e centros de diagnóstico de referência em ${nome}.`,
  }
}

export default async function LaboratoriosRegiaoPage({ params }: PageProps) {
  const { regiao } = await params
  if (!REGIOES_SAUDE.some((r) => r.slug === regiao)) notFound()

  const resultado = await lifcoreApi.listarReferenciasSaude({ tipo: 'laboratorio', regiao })
  const instituicoes = resultado?.data ?? []

  return (
    <CategoriaRegiaoListagem
      categoriaSlug="laboratorios"
      categoriaTitulo="Laboratórios de Referência"
      categoriaTituloMinusculo="laboratórios"
      regiaoSlug={regiao}
      instituicoes={instituicoes}
    />
  )
}
