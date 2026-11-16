// Ficha da empresa em dados estruturados (schema.org), para buscadores e assistentes (SITE_MESTRE, S-07).
// Só dados institucionais conferidos do siteConfig: nada de nota, número de clientes ou avaliação (D6).

type Config = {
  nome: string
  nomeCompleto: string
  descricao: string
  url: string
  contato: { email: string; whatsapp: string }
  endereco: { linha1: string; bairro: string; cidade: string; uf: string; cep: string }
  juridico: { razaoSocial: string; cnpj: string; registroSusep: string }
  redesSociais: Record<string, string>
}

export function fichaEmpresa(c: Config) {
  const telefone = `+${c.contato.whatsapp.replace(/\D/g, '')}`
  return {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    '@id': `${c.url}/#empresa`,
    name: c.nome,
    legalName: c.juridico.razaoSocial,
    alternateName: c.nomeCompleto,
    description: c.descricao,
    url: c.url,
    logo: `${c.url}/marca/Lifitseg_logo_transparente_para_claro.svg`,
    image: `${c.url}/opengraph-image`,
    email: c.contato.email,
    telephone: telefone,
    taxID: c.juridico.cnpj,
    identifier: [{ '@type': 'PropertyValue', propertyID: 'SUSEP', value: c.juridico.registroSusep }],
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.endereco.linha1,
      addressLocality: c.endereco.cidade,
      addressRegion: c.endereco.uf,
      postalCode: c.endereco.cep,
      addressCountry: 'BR',
    },
    areaServed: { '@type': 'State', name: 'São Paulo' },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:30' },
    ],
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer service', telephone: telefone, email: c.contato.email, availableLanguage: 'Portuguese' }],
    sameAs: Object.values(c.redesSociais).filter(Boolean),
  }
}

/** Texto seguro para <script type="application/ld+json"> (padrão da documentação do Next: escapa '<'). */
export function jsonLdSeguro(dados: unknown): string {
  return JSON.stringify(dados).replace(/</g, '\\u003c')
}
