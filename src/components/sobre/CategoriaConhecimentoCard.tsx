import { LucideIcon } from 'lucide-react'

type CategoriaConhecimentoCardProps = {
  label: string
  icon: LucideIcon
}

export function CategoriaConhecimentoCard({ label, icon: Icon }: CategoriaConhecimentoCardProps) {
  return (
    <div className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-white border border-[#05191b]/10 hover:border-[#E0A63D]/40 transition-all">
      <div className="w-12 h-12 rounded-xl bg-[#05191b]/5 flex items-center justify-center text-[#0b3337]">
        <Icon className="w-5 h-5" strokeWidth={1.5} />
      </div>
      <span className="text-xs font-bold text-[#05191b]">{label}</span>
    </div>
  )
}
