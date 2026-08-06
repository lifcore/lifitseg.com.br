import { Users } from 'lucide-react'

export function TrabalheConoscoCTA() {
  return (
    <div className="flex flex-col items-start gap-4">
      <button
        type="button"
        disabled
        title="Em breve — integração com nosso módulo de recrutamento"
        className="inline-flex items-center gap-2 bg-[#05191b]/10 text-[#05191b]/40 font-bold px-8 py-3.5 rounded-xl text-sm cursor-not-allowed"
      >
        <Users className="w-4 h-4" strokeWidth={1.5} />
        Enviar Currículo
      </button>
      <p className="text-xs text-[#05191b]/50">
        Em breve — integração com nosso módulo de recrutamento.
      </p>
    </div>
  )
}
