// Inventário das imagens do visual premium (S-10, SITE_MESTRE): fonte, licença e uso de cada uma.
// Fotos de banco representam uma situação; nunca são apresentadas como a equipe, o escritório ou clientes da
// Lifitseg (por isso a etiqueta "Imagem ilustrativa"). Foto real da equipe e do escritório depende de D3.

export type ImagemSite = { arquivo: string; alt: string; fonte: string; licenca: string; uso: string }

const UNSPLASH = 'Licença Unsplash (uso comercial gratuito, sem atribuição obrigatória): https://unsplash.com/license'

export const IMAGENS = {
  escritorio: {
    arquivo: '/fotos/premium/escritorio-reuniao.jpg',
    alt: 'Sala de reunião de escritório com cadeiras caramelo e planta, imagem ilustrativa',
    fonte: 'images.unsplash.com/photo-1571624436279-b272aff752b5 (trocada a pedido de Raphael em 15/11/2026)',
    licenca: UNSPLASH,
    uso: 'Home, painel "Escritório em Jundiaí" (ilustrativa, não é o escritório da Lifitseg)',
  },
  guiaComparacao: {
    arquivo: '/fotos/premium/guia-comparacao.jpg',
    alt: '',
    fonte: 'images.unsplash.com/photo-1762427354051-a9bdb181ae3b',
    licenca: UNSPLASH,
    uso: 'Capa do guia "Como comparar propostas de plano empresarial"',
  },
  guiaRenovacao: {
    arquivo: '/fotos/premium/guia-renovacao.jpg',
    alt: '',
    fonte: 'images.unsplash.com/photo-1435527173128-983b87201f4d',
    licenca: UNSPLASH,
    uso: 'Capa do guia "O que organizar antes da renovação"',
  },
  guiaRede: {
    arquivo: '/fotos/premium/guia-rede.jpg',
    alt: '',
    fonte: 'images.unsplash.com/photo-1764885517847-79d62138cc58',
    licenca: UNSPLASH,
    uso: 'Capa do guia "Rede assistencial: o produto importa"',
  },
} satisfies Record<string, ImagemSite>

/** Capa de guia por slug (decorativa: o título do guia está no card, em texto). */
export const CAPA_GUIA: Record<string, ImagemSite> = {
  'como-comparar-propostas-de-plano-empresarial': IMAGENS.guiaComparacao,
  'o-que-organizar-antes-da-renovacao': IMAGENS.guiaRenovacao,
  'rede-assistencial-o-produto-importa': IMAGENS.guiaRede,
}
