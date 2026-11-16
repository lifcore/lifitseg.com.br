// Redirecionamentos permanentes do site (SITE_MESTRE, frentes S-01 e S-02). Lidos pelo next.config.ts.
//
// S-02: lifitseg.com.br (sem www) leva ao mesmo caminho em www.lifitseg.com.br, o endereço oficial (siteConfig.url).
// S-01: endereços do site antigo (WordPress) que hoje dão 404 e têm equivalente claro. Só os conferidos em
// 15/11/2026 (relatório do Claude e complemento do Chief); a lista completa depende do Search Console (D1).
// Cada um vai para a página equivalente, nunca tudo para a home. Código 301, como pede o aceite da S-01.

export type Redirecionamento = {
  source: string
  destination: string
  statusCode: 301
  has?: { type: 'host'; value: string }[]
}

export const DOMINIO_OFICIAL = 'https://www.lifitseg.com.br'

const ANTIGOS: [string, string][] = [
  ['/contato', '/#contato'],
  ['/sobre', '/sobre-e-conhecimento#sobre'],
  ['/quem-somos', '/sobre-e-conhecimento#quem-somos'],
  ['/blog', '/conhecimento'],
  ['/blog/:caminho*', '/conhecimento'],
  ['/plano-de-saude-empresarial', '/beneficios-corporativos'],
  ['/seguro-de-vida', '/seguros-pessoais'],
]

export function redirecionamentos(): Redirecionamento[] {
  return [
    // Primeiro o domínio: sem www vai direto ao endereço final em www (um salto só, já no caminho novo).
    ...ANTIGOS.map(([source, destination]) => ({
      source,
      destination: `${DOMINIO_OFICIAL}${destination}`,
      statusCode: 301 as const,
      has: [{ type: 'host' as const, value: 'lifitseg.com.br' }],
    })),
    { source: '/:caminho*', destination: `${DOMINIO_OFICIAL}/:caminho*`, statusCode: 301, has: [{ type: 'host', value: 'lifitseg.com.br' }] },
    ...ANTIGOS.map(([source, destination]) => ({ source, destination, statusCode: 301 as const })),
  ]
}
