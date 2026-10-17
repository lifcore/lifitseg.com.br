import { ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/config/site'

const networks = [
  { name: 'Instagram', href: siteConfig.redesSociais.instagram },
  { name: 'Facebook', href: siteConfig.redesSociais.facebook },
  { name: 'LinkedIn', href: siteConfig.redesSociais.linkedin },
]

export function SocialLinks() {
  return (
    <ul className="flex flex-wrap gap-3" aria-label="Redes sociais da Lifitseg">
      {networks.filter((network) => network.href).map(({ name, href }) => (
        <li key={name}>
          <a href={href} target="_blank" rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-current/20 px-4 py-2 text-sm transition-colors hover:text-lifitseg-mint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lifitseg-mint">
            {name}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (abre em nova aba)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
