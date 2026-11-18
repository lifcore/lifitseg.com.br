import type { Metadata } from 'next'
import { PaginaSegmento } from '@/components/premium/PaginaSegmento'
import { SEGMENTOS } from '@/content/segmentos'

const s = SEGMENTOS.mei

export const metadata: Metadata = {
  title: s.meta.titulo,
  description: s.meta.descricao,
  alternates: { canonical: s.rota },
}

export default function Pagina() {
  return <PaginaSegmento s={s} />
}
