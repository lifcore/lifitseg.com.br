// src/app/lp/saude-odonto/layout.tsx
import type { Metadata } from 'next'

// A página em si é Client Component (stepper interativo, useEffect de
// UTM) e por isso não pode exportar `metadata` — precisa deste layout
// Server Component por cima pra cumprir a convenção do layout raiz
// ("Título por página deve sobrescrever via seu próprio `export const
// metadata`"). Sem isso, aba do navegador, preview de compartilhamento
// no LinkedIn/WhatsApp e resultado de busca mostravam o título
// genérico do site — crítico pra uma LP alimentada por anúncio pago.
export const metadata: Metadata = {
  title: 'Gestão Inteligente do Plano de Saúde Empresarial',
  description:
    'Análise técnica de contrato, reajuste e sinistralidade do plano de saúde da sua empresa. Consultoria especializada em benefícios corporativos — sem custo para a empresa.',
  openGraph: {
    title: 'Gestão Inteligente do Plano de Saúde Empresarial | LifitSeg',
    description:
      'Análise técnica de contrato, reajuste e sinistralidade do plano de saúde da sua empresa. Consultoria especializada em benefícios corporativos.',
    type: 'website',
  },
}

export default function LayoutSaudeOdonto({ children }: { children: React.ReactNode }) {
  return children
}
