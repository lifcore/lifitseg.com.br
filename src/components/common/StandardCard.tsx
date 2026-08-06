import type { ReactNode } from 'react'

type StandardCardProps = {
  icon?: ReactNode
  title: string
  description: string
  badge?: string
}

export function StandardCard({ icon, title, description, badge }: StandardCardProps) {
  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-primary/20 bg-lifitseg-dark/80 p-8 transition-all hover:border-primary/60">
      <div>
        {badge && (
          <span className="mb-4 inline-block rounded-md border border-primary/30 bg-lifitseg-surface px-2.5 py-1 text-[10px] font-bold tracking-wider text-primary uppercase">
            {badge}
          </span>
        )}
        {icon && <div className="mb-4 text-3xl text-primary">{icon}</div>}
        <h3 className="mb-3 text-xl font-bold text-lifitseg-offwhite transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-lifitseg-offwhite/70">{description}</p>
      </div>
    </div>
  )
}

type ReusableCtaSectionProps = {
  title?: string
  subtitle?: string
  buttonText?: string
  onOpenLeadModal: () => void
}

export function ReusableCtaSection({ title, subtitle, buttonText, onOpenLeadModal }: ReusableCtaSectionProps) {
  return (
    <section className="border-t border-primary/20 bg-gradient-to-b from-lifitseg-dark-deep to-lifitseg-dark py-20 text-center text-lifitseg-offwhite">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title ?? 'Pronto para elevar o nível de gestão da sua empresa?'}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-base text-lifitseg-offwhite/80 sm:text-lg">
          {subtitle ??
            'Conte com nossa consultoria técnica para blindar sua operação e otimizar custos com inteligência de dados.'}
        </p>
        <button
          onClick={onOpenLeadModal}
          className="rounded-xl bg-primary px-8 py-4 text-base font-bold text-lifitseg-dark shadow-xl transition-all hover:opacity-90"
        >
          {buttonText ?? 'Agendar Diagnóstico Gratuito'}
        </button>
      </div>
    </section>
  )
}
