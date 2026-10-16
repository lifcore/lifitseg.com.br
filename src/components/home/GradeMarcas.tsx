import Image from 'next/image'
import { OPERADORAS_SAUDE, PORTFOLIO_HOME_CONFIRMADO } from '@/config/operadoras'

/**
 * Parceiros de saúde (redação da etapa 2 do Chat, bloco H-07): apoio à
 * decisão, sem dominar a marca e sem hierarquia que pareça recomendação.
 * Logos originais, mesma altura óptica. Uso das imagens confirmado por
 * Raphael (ver src/config/operadoras.ts).
 */
export function GradeMarcas() {
  if (!PORTFOLIO_HOME_CONFIRMADO && process.env.NODE_ENV === 'production') return null

  return (
    <section id="operadoras" aria-labelledby="titulo-operadoras" className="scroll-mt-20 bg-lifitseg-paper py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="titulo-operadoras" className="text-lifitseg-dark">Parceiros de mercado e análise centrada na sua empresa.</h2>
        <p className="mt-3 max-w-3xl text-lifitseg-text-soft">
          Trabalhamos com parceiros credenciados para avaliar alternativas pertinentes ao cenário empresarial. A comparação considera as condições dos produtos disponíveis, a localização e os requisitos da contratação.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {OPERADORAS_SAUDE.map((m) => (
            <li key={m.file} className="flex flex-col items-start gap-3 rounded-2xl border border-lifitseg-line bg-white p-4">
              <div className="flex h-12 w-full items-center">
                <Image src={`/seguradoras/${m.file}.png`} alt={m.name} width={140} height={48} className="max-h-10 w-auto object-contain" />
              </div>
              <span className="text-xs text-lifitseg-text-soft">{m.name}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-lifitseg-text-soft">Disponibilidade, rede e condições dependem do produto e da análise comercial.</p>
      </div>
    </section>
  )
}
