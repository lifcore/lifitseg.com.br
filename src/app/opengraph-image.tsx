import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Imagem de compartilhamento (S-07, SITE_MESTRE): aparece quando o link do site é enviado no WhatsApp, LinkedIn etc.
// Vale para todas as páginas que não têm a própria. Visual premium: petróleo B1 com luz lateral, feixes finos e o
// logo B1 oficial para fundo escuro, sem alteração. Sem foto, sem número e sem promessa.

export const alt = 'Lifitseg — Plano empresarial, da escolha ao cuidado diário'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const logo = await readFile(join(process.cwd(), 'public/marca/Lifitseg_logo_transparente_para_escuro.svg'))
const logoUri = `data:image/svg+xml;base64,${logo.toString('base64')}`

export default async function ImagemCompartilhamento() {
  const feixes = Array.from({ length: 18 }, (_, i) => `M -60 ${380 + 6 * i} C ${120 + 2 * i} ${470 - 2 * i}, ${280 + 3 * i} ${600 - 2 * i}, ${520 + 12 * i} 700`)
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 76px',
          color: '#eeecea',
          background: 'radial-gradient(ellipse at 82% 25%, rgba(23,71,61,0.75) 0%, rgba(5,25,27,0) 55%), linear-gradient(123deg, #030f10, #05191b 50%, #0b2d29)',
          position: 'relative',
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: 'absolute', left: 0, top: 0 }}>
          {feixes.map((d) => <path key={d} d={d} fill="none" stroke="#acb894" strokeWidth="1" strokeOpacity="0.22" />)}
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 22px', border: '1px solid rgba(201,231,209,0.14)', borderRadius: 18, background: 'linear-gradient(135deg, rgba(32,74,62,0.35), rgba(18,44,40,0.2))', alignSelf: 'flex-start' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUri} width={300} height={77} alt="" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, letterSpacing: 4, color: '#a8d5be', textTransform: 'uppercase' }}>
            <div style={{ width: 36, height: 1, background: '#b99a60' }} />
            Consultoria em saúde e seguros
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 70, lineHeight: 1.06, letterSpacing: -2, marginTop: 22, fontWeight: 600 }}>
            <span>Plano empresarial, da escolha</span>
            <span style={{ color: '#a9edc8' }}>ao cuidado diário.</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#b7cbbd', borderTop: '1px solid rgba(214,231,219,0.12)', paddingTop: 22 }}>
          <span>www.lifitseg.com.br</span>
          <span>Jundiaí · SP · SUSEP 232149012</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
