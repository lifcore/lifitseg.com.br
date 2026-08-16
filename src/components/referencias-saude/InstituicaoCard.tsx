import Link from 'next/link'
import { LogoOuPlaceholder } from './LogoOuPlaceholder'
import { nomeDaRegiao, ROTULO_STATUS_REFERENCIA } from '@/config/referenciasSaude'

type InstituicaoCardProps = {
  slug: string
  nome: string
  cidade: string
  regiao?: string
  status: string
  destaque?: boolean
  logoUrl?: string | null
  especialidades?: string[]
  /** Se true, mostra "Cidade — Região" (útil na página de especialidade, que mistura regiões). Se false, só cidade. */
  mostrarRegiao?: boolean
}

const MAX_ESPECIALIDADES_NO_CARD = 5

/**
 * Doc de Codificação, seção 4 (UI — listagem): "Card com logo, nome,
 * cidade, selo de destaque/status e especialidades. Especialidades
 * devem usar chips/tags com contraste maior; não deixar o conteúdo
 * apagado. Mostrar no máximo 4-5 especialidades no card; demais ficam
 * no perfil. Card inteiro abre o perfil interno. Selo explícito para
 * 'Em implantação'."
 */
export function InstituicaoCard({
  slug,
  nome,
  cidade,
  regiao,
  status,
  destaque,
  logoUrl,
  especialidades = [],
  mostrarRegiao = false,
}: InstituicaoCardProps) {
  const visiveis = especialidades.slice(0, MAX_ESPECIALIDADES_NO_CARD)
  const restantes = especialidades.length - visiveis.length

  return (
    <Link
      href={`/referencias-saude/instituicao/${slug}`}
      className="flex flex-col gap-4 rounded-2xl border border-lifitseg-dark/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <LogoOuPlaceholder nome={nome} logoUrl={logoUrl} />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-1.5">
            {status === 'EM_IMPLANTACAO' && (
              <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                {ROTULO_STATUS_REFERENCIA[status]}
              </span>
            )}
            {destaque && (
              <span className="rounded-md border border-lifitseg-dark/20 bg-lifitseg-dark px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-lifitseg-offwhite">
                Destaque
              </span>
            )}
          </div>
          <h3 className="text-base font-bold leading-snug text-lifitseg-dark">{nome}</h3>
          <p className="text-sm text-lifitseg-dark/60">
            {mostrarRegiao && regiao ? `${cidade} — ${nomeDaRegiao(regiao)}` : cidade}
          </p>
        </div>
      </div>

      {visiveis.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {visiveis.map((e) => (
            <span
              key={e}
              className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-lifitseg-dark"
            >
              {e}
            </span>
          ))}
          {restantes > 0 && (
            <span className="rounded-full bg-lifitseg-dark/5 px-2.5 py-1 text-xs font-semibold text-lifitseg-dark/50">
              +{restantes}
            </span>
          )}
        </div>
      )}
    </Link>
  )
}
