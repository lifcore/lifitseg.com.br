import Image from 'next/image'
import { LOGOS_REFERENCIAS } from '@/config/logosReferencias'

type LogoOuPlaceholderProps = {
  nome: string
  logoUrl?: string | null
  /** Slug da instituição: sem logo_url no banco, usa o logo do mapa do site (src/config/logosReferencias.ts). */
  slug?: string
  tamanho?: 'sm' | 'lg'
}

/**
 * Doc de Codificação, seção 8: "Se não houver asset adequado, usar
 * placeholder tipográfico elegante. Não usar logo pra sugerir
 * parceria." Hoje nenhuma instituição tem `logo_url` preenchido — o
 * placeholder é o caso comum, não a exceção, então precisa ficar bom
 * sozinho, não parecer "quebrado".
 */
export function LogoOuPlaceholder({ nome, logoUrl, slug, tamanho = 'sm' }: LogoOuPlaceholderProps) {
  const dimensao = tamanho === 'lg' ? 'h-16 w-16 text-2xl' : 'h-12 w-12 text-lg'
  const doMapa = !logoUrl && slug ? LOGOS_REFERENCIAS[slug]?.arquivo : undefined

  if (doMapa) {
    // Logo horizontal: caixa mais larga, fundo branco; uso identificativo, sem sugerir parceria.
    const caixa = tamanho === 'lg' ? 'h-16 w-44' : 'h-12 w-28'
    return (
      <div className={`relative ${caixa} shrink-0 overflow-hidden rounded-xl border border-lifitseg-dark/10 bg-white`}>
        <Image src={doMapa} alt={`Logo — ${nome}`} fill sizes="176px" className="object-contain p-2" />
      </div>
    )
  }

  if (logoUrl) {
    return (
      <div className={`relative ${dimensao} shrink-0 overflow-hidden rounded-xl border border-lifitseg-dark/10 bg-white`}>
        <Image src={logoUrl} alt={`Logo — ${nome}`} fill className="object-contain p-1.5" />
      </div>
    )
  }

  const inicial = nome.replace(/^(Hospital|Clínica|Laboratório)\s+/i, '').charAt(0).toUpperCase()

  return (
    <div
      className={`flex ${dimensao} shrink-0 items-center justify-center rounded-xl border border-lifitseg-dark/10 bg-lifitseg-dark font-black text-primary`}
      aria-hidden="true"
    >
      {inicial}
    </div>
  )
}
