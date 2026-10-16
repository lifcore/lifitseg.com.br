import Image from 'next/image'
import { OPERADORAS, MARCAS_HOME, PORTFOLIO_HOME_CONFIRMADO } from '@/config/operadoras'

/**
 * Operadoras na home v3: apoio à decisão, sem dominar a marca. Grade
 * estática, marcas originais, mesma altura óptica. Bloqueada em produção
 * até a confirmação do portfólio (PORTFOLIO_HOME_CONFIRMADO).
 */
export function GradeMarcas() {
  const emRevisao = !PORTFOLIO_HOME_CONFIRMADO
  if (emRevisao && process.env.NODE_ENV === 'production') return null

  const marcas = MARCAS_HOME.map((file) => OPERADORAS.find((o) => o.file === file)).filter((o) => o !== undefined)

  return (
    <section id="operadoras" aria-labelledby="titulo-operadoras" className="scroll-mt-20 bg-lifitseg-paper py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="titulo-operadoras" className="text-lifitseg-dark">Alternativas de mercado, com critérios para comparar.</h2>
        <p className="mt-3 text-sm text-lifitseg-text-soft">
          {emRevisao
            ? 'Seleção ilustrativa do cadastro atual · portfólio e uso das marcas em revisão (não publicado).'
            : 'Conheça algumas das marcas presentes no nosso portfólio comercial, sujeito à confirmação de disponibilidade para cada contratação.'}
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {marcas.map((m) => (
            <li key={m.file} className="flex flex-col items-start gap-3 rounded-2xl border border-lifitseg-line bg-white p-4">
              <div className="flex h-12 w-full items-center">
                <Image src={`/seguradoras/${m.file}.png`} alt={m.name} width={140} height={48} className="max-h-10 w-auto object-contain" />
              </div>
              <span className="text-xs text-lifitseg-text-soft">{m.name}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-lifitseg-text-soft">
          Disponibilidade, condições e rede dependem do produto e da análise comercial. A presença de uma marca não garante contratação ou cobertura.
        </p>
      </div>
    </section>
  )
}
