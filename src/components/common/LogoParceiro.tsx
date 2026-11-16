import Image from 'next/image'

// Logos de parceiros com o mesmo peso visual (16/11/2026, pedido de Raphael: estavam desalinhados e de tamanhos
// diferentes). Cópias com a margem vazia aparada em public/seguradoras/parceiros (os originais ficam como estão) e
// tamanho calculado para a mesma área visual, com limite de largura e altura. Para um logo novo: aparar a margem,
// salvar em parceiros/ e acrescentar o tamanho aqui (área ~3.300 px², largura até 128 e altura até 52).
const TAMANHOS: Record<string, [number, number]> = {
  "alice": [78, 42],
  "allianz": [51, 52],
  "amil": [96, 34],
  "beneficencia": [86, 38],
  "bradesco": [111, 30],
  "careplus": [119, 28],
  "gocare": [63, 52],
  "hapvida": [122, 27],
  "hdi": [81, 41],
  "liberty": [81, 41],
  "mapfre": [65, 51],
  "medsenior": [98, 34],
  "new": [85, 39],
  "notredame": [118, 28],
  "omint": [95, 35],
  "plena": [72, 46],
  "porto": [97, 34],
  "sami": [99, 33],
  "seguros_unimed": [81, 41],
  "sobam": [98, 34],
  "suhai": [105, 31],
  "sulamerica": [94, 35],
  "tokio": [128, 25],
  "unica": [77, 43],
  "unimed": [98, 34],
  "veracruz": [64, 52],
  "yelum": [100, 33],
  "zurich": [72, 46],
}

const ARQUIVO: Record<string, string> = { tokio: 'tokio-recortado' }

export function LogoParceiro({ file, nome, escala = 1 }: { file: string; nome: string; escala?: number }) {
  const [w, h] = TAMANHOS[file] ?? [96, 34]
  return (
    <Image
      src={`/seguradoras/parceiros/${ARQUIVO[file] ?? file}.png`}
      alt={nome}
      width={Math.round(w * escala)}
      height={Math.round(h * escala)}
      className="logo-parceiro"
      style={{ width: `${Math.round(w * escala)}px`, height: 'auto', maxWidth: '82%', objectFit: 'contain' }}
    />
  )
}
