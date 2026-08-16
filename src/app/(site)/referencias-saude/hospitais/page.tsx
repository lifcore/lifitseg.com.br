import type { Metadata } from 'next'
import { lifcoreApi } from '@/services/lifcoreApi'
import { REGIOES_SAUDE } from '@/config/referenciasSaude'
import { CategoriaHub } from '@/components/referencias-saude/CategoriaHub'

export const metadata: Metadata = {
  title: 'Hospitais de Referência',
  description: 'Hospitais privados de referência em Jundiaí, Campinas e São Paulo, organizados por região.',
}

export default async function HospitaisPage() {
  const resultado = await lifcoreApi.listarReferenciasSaude({ tipo: 'hospital' })
  const instituicoes = resultado?.data ?? []
  const contagemPorRegiao = Object.fromEntries(
    REGIOES_SAUDE.map((r) => [r.slug, instituicoes.filter((i: any) => i.regiao === r.slug).length])
  )

  return (
    <CategoriaHub
      categoriaSlug="hospitais"
      titulo="Hospitais de Referência"
      descricao="Hospitais privados de referência em Jundiaí, Campinas e São Paulo — organizados por região."
      contagemPorRegiao={contagemPorRegiao}
    />
  )
}
