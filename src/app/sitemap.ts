import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import { GUIAS, DATA_REVISAO_GUIAS } from '@/content/guias'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.url}/links`,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/beneficios-corporativos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/seguros-corporativos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/seguros-pessoais`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/sobre-e-conhecimento`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    // Guias de conhecimento (M-27)
    {
      url: `${siteConfig.url}/conhecimento`,
      lastModified: new Date(DATA_REVISAO_GUIAS),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...GUIAS.map((g) => ({
      url: `${siteConfig.url}/conhecimento/${g.slug}`,
      lastModified: new Date(DATA_REVISAO_GUIAS),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
