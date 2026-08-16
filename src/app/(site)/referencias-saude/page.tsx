// src/app/(site)/referencias-saude/page.tsx
//
// Hub do módulo Referências em Saúde (V1, doc do Chief). Server
// Component de propósito — o objetivo do documento é gerar páginas
// indexáveis pelo Google, e conteúdo buscado só no navegador
// (useEffect) não fica pronto a tempo do crawler ver. O resto do
// site usa 'use client'; esse módulo é a exceção justificada.
//
// ATUALIZADO (11/08, briefing do Chief): especialidade virou a
// entrada PRINCIPAL ("usuário entra por uma necessidade", doc
// original item 8) — região continua disponível como caminho
// alternativo, não removida.

import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/common/Breadcrumb'
import { StandardCard } from '@/components/common/StandardCard'
import { lifcoreApi } from '@/services/lifcoreApi'
import { REGIOES_SAUDE } from '@/config/referenciasSaude'
import { ESPECIALIDADES_SAUDE } from '@/config/referenciasSaudeEspecialidades'
import { CtaConsultarCobertura } from '@/components/referencias-saude/CtaConsultarCobertura'

export const metadata: Metadata = {
  title: 'Referências em Saúde',
  description:
    'Encontre hospitais, clínicas e laboratórios de referência por especialidade e região — em Jundiaí, Campinas e São Paulo.',
}

export default async function ReferenciasSaudePage() {
  const resultado = await lifcoreApi.listarReferenciasSaude()
  const instituicoes = resultado?.data ?? []

  const contagemPorRegiao = Object.fromEntries(
    REGIOES_SAUDE.map((r) => [r.slug, instituicoes.filter((i: any) => i.regiao === r.slug).length])
  )

  return (
    <>
      <Breadcrumb items={[{ label: 'Referências em Saúde' }]} />

      <section className="bg-lifitseg-offwhite py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
            Curadoria Privada
          </span>
          <h1 className="mb-6 text-3xl font-black text-lifitseg-dark sm:text-4xl lg:text-5xl">
            Encontre hospitais, clínicas e laboratórios de referência por especialidade
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-lifitseg-dark/70 sm:text-lg">
            Reunimos instituições privadas de referência em Jundiaí, Campinas e São Paulo — não é
            uma rede credenciada da LifitSeg. Encontre a especialidade que você precisa e consulte
            quais planos têm cobertura compatível.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold text-lifitseg-dark">
            O que você está procurando?
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {ESPECIALIDADES_SAUDE.map((esp) => (
              <Link
                key={esp.slug}
                href={`/referencias-saude/${esp.slug}`}
                className="flex flex-col items-center gap-2 rounded-2xl border border-lifitseg-dark/10 bg-lifitseg-offwhite p-6 text-center transition-all hover:border-primary/60"
              >
                <span className="text-3xl">{esp.icone}</span>
                <span className="text-sm font-bold text-lifitseg-dark">{esp.nome}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lifitseg-offwhite py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold text-lifitseg-dark">
            Ou prefere buscar por região?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {REGIOES_SAUDE.map((regiao) => (
              <Link key={regiao.slug} href={`/referencias-saude/regiao/${regiao.slug}`}>
                <StandardCard
                  title={regiao.nome}
                  description={`${contagemPorRegiao[regiao.slug] ?? 0} instituições privadas de referência catalogadas.`}
                  badge="Ver instituições"
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
