import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingActionButtons } from '@/components/layout/FloatingActionButtons'
import { siteConfig } from '@/config/site'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// SEO base (item 6 do Complemento Técnico) — estrutura mínima, mas já
// preparada. Título por página deve sobrescrever `title` via seu
// próprio `export const metadata`, o resto herda daqui.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.nome} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.nome}`,
  },
  description: siteConfig.descricao,
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.url,
    siteName: siteConfig.nome,
    title: `${siteConfig.nome} — ${siteConfig.tagline}`,
    description: siteConfig.descricao,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.nome} — ${siteConfig.tagline}`,
    description: siteConfig.descricao,
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActionButtons />
      </body>
    </html>
  )
}
