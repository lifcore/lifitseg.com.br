// Feixes de assinatura (acabamento aprovado das artes, levado ao site; SITE_MESTRE 5.3): linhas curvas finas, em grupo,
// presença parcial nas bordas e muita área livre. Mesmas curvas da prévia S-09, geradas por fórmula. Sem animação.

type Grupo = { n: number; caminho: (i: number) => string; opacidade?: number }

const r = (v: number) => Math.round(v * 100) / 100

const VARIANTES: Record<string, { viewBox: string; grupos: Grupo[] }> = {
  // Primeira tela: feixe largo no canto inferior esquerdo e um menor no canto superior direito.
  hero: {
    viewBox: '0 0 1440 800',
    grupos: [
      { n: 21, caminho: (i) => `M -70 ${r(500 + 4.5 * i)} C ${140 + 2 * i} ${r(620 - 1.5 * i)}, ${310 + 3 * i} ${760 - 2 * i}, ${r(560 + 10.5 * i)} 835` },
      { n: 15, opacidade: 0.6, caminho: (i) => `M ${r(1000 + (65 / 7) * i)} -65 C ${r(1190 + (20 / 7) * i)} 50, ${r(1390 + (20 / 7) * i)} 90, 1470 ${210 + 5 * i}` },
    ],
  },
  // Faixa de tecnologia: entra pela direita, embaixo.
  tecno: {
    viewBox: '0 0 1440 800',
    grupos: [{ n: 16, caminho: (i) => `M 1500 ${520 + 8 * i} C ${1240 + 4 * i} ${600 + 7 * i} ${1080 + 6 * i} ${700 + 6 * i} ${900 + 10 * i} 860` }],
  },
  // Primeira tela das páginas internas: canto superior direito.
  interna: {
    viewBox: '0 0 1440 600',
    grupos: [{ n: 16, caminho: (i) => `M ${980 + 10 * i} -40 C ${1150 + 5 * i} ${90 + 2 * i} ${1330 + 4 * i} ${120 + 4 * i} 1480 ${260 + 8 * i}` }],
  },
  // Capa do guia principal.
  capa: {
    viewBox: '0 0 600 250',
    grupos: [{ n: 5, caminho: (i) => `M-20 ${200 + 8 * i} C${150 + 2 * i} ${150 + 8 * i} ${300 + 4 * i} ${230 + 6 * i} 620 ${90 + 8 * i}` }],
  },
}

export function Feixes({ variante, opacidade, className = 'feixes', style }: { variante: keyof typeof VARIANTES; opacidade?: number; className?: string; style?: React.CSSProperties }) {
  const v = VARIANTES[variante]
  return (
    <svg className={className} viewBox={v.viewBox} preserveAspectRatio="none" aria-hidden="true" focusable="false" style={opacidade !== undefined ? { ...style, opacity: opacidade } : style}>
      {v.grupos.flatMap((g, gi) =>
        Array.from({ length: g.n }, (_, i) => <path key={`${gi}-${i}`} d={g.caminho(i)} strokeOpacity={g.opacidade} />),
      )}
    </svg>
  )
}

/** Fios finos em fundo claro (método): verde B1 em baixa opacidade. */
export function Fios({ style }: { style?: React.CSSProperties }) {
  return (
    <svg className="fios" viewBox="0 0 600 300" aria-hidden="true" focusable="false" style={style}>
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M0 ${40 + 12 * i} C${200 + 5 * i} ${60 + 12 * i} ${380 + 5 * i} ${160 + 10 * i} 600 ${300 + 8 * i}`} />
      ))}
    </svg>
  )
}
