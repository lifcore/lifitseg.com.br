type InternalBannerProps = {
  category?: string
  title: string
  description?: string
  onOpenLeadModal?: () => void
}

export function InternalBanner({ category, title, description, onOpenLeadModal }: InternalBannerProps) {
  return (
    <section className="relative overflow-hidden border-b border-primary/20 bg-gradient-to-b from-lifitseg-dark via-lifitseg-dark to-lifitseg-dark-deep py-20 text-lifitseg-offwhite lg:py-28">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        {category && (
          <span className="mb-6 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold tracking-wider text-primary uppercase">
            {category}
          </span>
        )}
        <h1 className="mb-6 text-3xl leading-tight font-black tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mb-8 text-base leading-relaxed text-lifitseg-offwhite/80 sm:text-lg">
            {description}
          </p>
        )}
        {onOpenLeadModal && (
          <button
            onClick={onOpenLeadModal}
            className="rounded-xl bg-primary px-8 py-3.5 font-bold text-lifitseg-dark shadow-lg transition-all hover:opacity-90"
          >
            Solicitar Análise Técnica
          </button>
        )}
      </div>
    </section>
  )
}
