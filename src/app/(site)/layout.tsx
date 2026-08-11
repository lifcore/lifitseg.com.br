import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingActionButtons } from '@/components/layout/FloatingActionButtons'

// Layout do grupo (site) — carrega Header/Footer/FAB só pras páginas
// institucionais (Home, Soluções, Sobre, etc). Route Group do Next.js:
// o "(site)" no nome da pasta NÃO aparece na URL, é só organização —
// /seguros-corporativos continua sendo /seguros-corporativos.
//
// /lp/* fica FORA deste grupo de propósito — não herda Header/Footer
// institucional, só o layout raiz (html/body/fontes).
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActionButtons />
    </>
  )
}
