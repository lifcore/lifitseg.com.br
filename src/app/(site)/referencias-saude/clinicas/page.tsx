import type { Metadata } from 'next'
import { lifcoreApi } from '@/services/lifcoreApi'
import { REGIOES_SAUDE } from '@/config/referenciasSaude'
import { CategoriaHub } from '@/components/referencias-saude/CategoriaHub'

export const metadata: Metadata = {
  title: 'Clínicas de Referência',
  description: 'Clínicas e centros especializados privados de referência em Jundiaí, Campinas e São Paulo, organizados por região.',
}

export default async function ClinicasPage() {
  const resultado = await lifcoreApi.listarReferenciasSaude({ tipo: 'clinica' })
  const instituicoes = resultado?.data ?? []
  const contagemPorRegiao = Object.fromEntries(
    REGIOES_SAUDE.map((r) => [r.slug, instituicoes.filter((i: any) => i.regiao === r.slug).length])
  )

  return (
    <CategoriaHub
      categoriaSlug="clinicas"
      titulo="Clínicas de Referência"
      descricao="Clínicas e centros especializados privados de referência em Jundiaí, Campinas e São Paulo — organizados por região."
      contagemPorRegiao={contagemPorRegiao}
    />
  )
}
