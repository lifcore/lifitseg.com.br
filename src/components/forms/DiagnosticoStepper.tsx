'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, MessageCircle } from 'lucide-react'
import { useLifCoreLead } from '@/hooks/useLifCoreLead'
import { getStoredUtms } from '@/utils/tracking'
import { siteConfig } from '@/config/site'

type CampoEscolha = 'qtdVidas' | 'operadoraAtual' | 'vigencia' | 'valorMensal' | 'sinistralidade' | 'avaliacaoContrato'

type PassoEscolha = {
  tipo: 'escolha'
  campo: CampoEscolha
  pergunta: string
  opcoes: string[]
}

type PassoTexto = {
  tipo: 'texto'
  campo: 'planoAtual'
  pergunta: string
  placeholder: string
}

type Passo = PassoEscolha | PassoTexto

const PASSOS: Passo[] = [
  {
    tipo: 'escolha',
    campo: 'qtdVidas',
    pergunta: 'Quantas vidas sua empresa possui hoje?',
    opcoes: ['2 a 29', '30 a 99', '100 ou mais'],
  },
  {
    tipo: 'escolha',
    campo: 'operadoraAtual',
    pergunta: 'Qual operadora vocês têm atualmente?',
    opcoes: ['Amil', 'Bradesco Saúde', 'SulAmérica', 'Unimed', 'NotreDame Intermédica / Hapvida', 'Porto Seguro Saúde', 'Omint', 'Alice', 'Outra'],
  },
  {
    tipo: 'texto',
    campo: 'planoAtual',
    pergunta: 'Qual o nome do plano atual? (se souber)',
    placeholder: 'Ex: Nacional Flex, Enfermaria Nacional...',
  },
  {
    tipo: 'escolha',
    campo: 'vigencia',
    pergunta: 'Quando é a próxima vigência ou reajuste do contrato?',
    opcoes: ['Já passou recentemente', 'Nos próximos 3 meses', 'Daqui a mais de 6 meses', 'Não sei'],
  },
  {
    tipo: 'escolha',
    campo: 'valorMensal',
    pergunta: 'Qual o valor mensal aproximado da mensalidade hoje?',
    opcoes: ['Até R$ 5 mil', 'R$ 5 mil a R$ 15 mil', 'R$ 15 mil a R$ 50 mil', 'Acima de R$ 50 mil'],
  },
  {
    tipo: 'escolha',
    campo: 'sinistralidade',
    pergunta: 'Você conhece a sinistralidade do contrato?',
    opcoes: ['Abaixo de 70%', 'Entre 70% e 100%', 'Acima de 100%', 'Não sei'],
  },
  {
    tipo: 'escolha',
    campo: 'avaliacaoContrato',
    pergunta: 'Como você avalia o contrato atual?',
    opcoes: ['Satisfeito', 'Parcialmente satisfeito', 'Insatisfeito'],
  },
]

const TOTAL_PASSOS = PASSOS.length + 1 // +1 = etapa final de contato

type Respostas = Partial<Record<Passo['campo'], string>>

type ContatoForm = {
  nome: string
  empresa: string
  email: string
  telefone: string
}

const CONTATO_INICIAL: ContatoForm = { nome: '', empresa: '', email: '', telefone: '' }

const linkWhatsapp = `https://wa.me/${siteConfig.contato.whatsapp}?text=${encodeURIComponent(
  'Olá! Vim pela página de Plano de Saúde Empresarial e prefiro falar direto com um consultor.'
)}`

export function DiagnosticoStepper() {
  const [passoAtual, setPassoAtual] = useState(0)
  const [respostas, setRespostas] = useState<Respostas>({})
  const [contato, setContato] = useState<ContatoForm>(CONTATO_INICIAL)
  const [consentimento, setConsentimento] = useState(false)
  const { status, errorMessage, submit } = useLifCoreLead()

  const naEtapaDeContato = passoAtual === PASSOS.length
  const passo = !naEtapaDeContato ? PASSOS[passoAtual] : null

  function irParaProximo() {
    setPassoAtual((p) => Math.min(p + 1, PASSOS.length))
  }

  function irParaAnterior() {
    setPassoAtual((p) => Math.max(p - 1, 0))
  }

  function escolher(campo: CampoEscolha, valor: string) {
    setRespostas((prev) => ({ ...prev, [campo]: valor }))
    irParaProximo()
  }

  function handleContatoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setContato((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const utms = getStoredUtms()
    await submit({
      ...contato,
      produto: 'Plano de Saúde Empresarial',
      origem: 'lp-saude-odonto',
      utm: utms,
      diagnostico: respostas,
    })
  }

  if (status === 'SUCCESS') {
    return (
      <div className="rounded-3xl border border-white/10 bg-lifitseg-dark p-8 text-center shadow-2xl sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-2xl font-bold text-primary">
          ✓
        </div>
        <h3 className="mt-4 text-2xl font-bold text-lifitseg-offwhite">Diagnóstico recebido!</h3>
        <p className="mt-2 text-sm text-lifitseg-offwhite/70">
          Um especialista da LifitSeg vai analisar o cenário da sua empresa e entrar em contato em breve.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-lifitseg-dark p-6 shadow-2xl sm:p-10">
      {/* Progresso */}
      <div className="mb-6 flex items-center gap-3">
        {!naEtapaDeContato && passoAtual > 0 && (
          <button
            type="button"
            onClick={irParaAnterior}
            aria-label="Voltar para a pergunta anterior"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lifitseg-offwhite/60 hover:text-lifitseg-offwhite"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${((naEtapaDeContato ? PASSOS.length : passoAtual) / TOTAL_PASSOS) * 100}%` }}
          />
        </div>
        <span className="shrink-0 text-xs font-semibold text-lifitseg-offwhite/50">
          {(naEtapaDeContato ? PASSOS.length : passoAtual) + 1} de {TOTAL_PASSOS}
        </span>
      </div>

      {!naEtapaDeContato && passo?.tipo === 'escolha' && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-lifitseg-offwhite">{passo.pergunta}</h3>
          <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
            {passo.opcoes.map((opcao) => (
              <button
                key={opcao}
                type="button"
                onClick={() => escolher(passo.campo, opcao)}
                className="rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-left text-sm font-semibold text-lifitseg-offwhite transition-colors hover:border-primary/60 hover:text-primary cursor-pointer"
              >
                {opcao}
              </button>
            ))}
          </div>
        </div>
      )}

      {!naEtapaDeContato && passo?.tipo === 'texto' && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-lifitseg-offwhite">{passo.pergunta}</h3>
          <input
            type="text"
            value={respostas[passo.campo] ?? ''}
            onChange={(e) => setRespostas((prev) => ({ ...prev, [passo.campo]: e.target.value }))}
            placeholder={passo.placeholder}
            className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
          />
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={irParaProximo}
              className="text-xs font-semibold text-lifitseg-offwhite/50 hover:text-lifitseg-offwhite/80 cursor-pointer"
            >
              Não sei o nome exato / Pular
            </button>
            <button
              type="button"
              onClick={irParaProximo}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-lifitseg-dark hover:opacity-90 cursor-pointer"
            >
              Continuar <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {naEtapaDeContato && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-bold text-lifitseg-offwhite">Quase lá. Pra onde enviamos a análise?</h3>

          <input
            type="text"
            name="nome"
            required
            value={contato.nome}
            onChange={handleContatoChange}
            placeholder="Nome completo *"
            className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
          />
          <input
            type="text"
            name="empresa"
            value={contato.empresa}
            onChange={handleContatoChange}
            placeholder="Empresa"
            className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="email"
              name="email"
              required
              value={contato.email}
              onChange={handleContatoChange}
              placeholder="E-mail corporativo *"
              className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
            />
            <input
              type="tel"
              name="telefone"
              required
              value={contato.telefone}
              onChange={handleContatoChange}
              placeholder="WhatsApp *"
              className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
            />
          </div>

          <label className="flex items-start gap-3 text-xs text-lifitseg-offwhite/70">
            <input
              type="checkbox"
              checked={consentimento}
              onChange={(e) => setConsentimento(e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-lifitseg-dark-deep accent-primary"
            />
            <span>
              Li e concordo com a{' '}
              <a href="/privacidade" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">
                Política de Privacidade
              </a>{' '}
              e autorizo o contato da LifitSeg com base nos dados informados.
            </span>
          </label>

          {status === 'ERROR' && <p className="text-sm font-medium text-red-400">{errorMessage}</p>}

          <button
            type="submit"
            disabled={status === 'SENDING' || !consentimento}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-lifitseg-dark shadow-lg transition-opacity hover:opacity-90 disabled:opacity-60 cursor-pointer"
          >
            {status === 'SENDING' ? 'Enviando...' : 'Quero minha análise'}
          </button>
        </form>
      )}

      <div className="mt-6 border-t border-white/10 pt-4 text-center">
        <a
          href={linkWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-lifitseg-offwhite/50 hover:text-lifitseg-offwhite/80"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Prefiro falar direto com um consultor
        </a>
      </div>
    </div>
  )
}
