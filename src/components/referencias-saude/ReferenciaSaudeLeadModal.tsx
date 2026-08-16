'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLifCoreLead } from '@/hooks/useLifCoreLead'
import { getStoredUtms } from '@/utils/tracking'

type ReferenciaSaudeLeadModalProps = {
  isOpen: boolean
  onClose: () => void
  especialidade?: string
  hospitalInteresse?: string
  instituicaoSlug?: string
  cidade?: string
}

/**
 * Formulário de captura específico do módulo Referências em Saúde —
 * segue exatamente o desenho do briefing do Chief (11/08): Empresa/
 * Pessoa Física, Especialidade, Hospital de interesse, Cidade, Nome,
 * WhatsApp, E-mail. Deliberadamente SEPARADO do `LeadModal` genérico
 * (usado no resto do site) — o conjunto de campos é diferente o
 * bastante que misturar os dois arriscaria quebrar página que já
 * funciona em produção.
 *
 * Envia pelo mesmo endpoint (`receber-lead-site`, via
 * `lifcoreApi.submitLead`) — não é um caminho novo de dado, só um
 * formulário diferente alimentando o mesmo lead. Especialidade/
 * hospital/cidade viajam dentro de `observacoes` (texto livre já
 * suportado pelo contrato), formatados de forma legível pro
 * corretor que for atender o lead.
 *
 * Regra do documento (item 13): nunca afirma cobertura — o texto
 * deixa claro que é uma consulta, não uma confirmação.
 */
export function ReferenciaSaudeLeadModal({
  isOpen,
  onClose,
  especialidade,
  hospitalInteresse,
  instituicaoSlug,
  cidade,
}: ReferenciaSaudeLeadModalProps) {
  const { status, errorMessage, submit, reset } = useLifCoreLead()
  const [tipoPessoa, setTipoPessoa] = useState<'empresa' | 'fisica'>('fisica')
  const [especialidadeCampo, setEspecialidadeCampo] = useState(especialidade ?? '')
  const [hospitalCampo, setHospitalCampo] = useState(hospitalInteresse ?? '')
  const [cidadeCampo, setCidadeCampo] = useState(cidade ?? '')
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [montado, setMontado] = useState(false)

  useEffect(() => {
    setMontado(true)
  }, [])

  if (!isOpen || !montado) return null

  function handleFechar() {
    onClose()
    reset()
    setNome('')
    setTelefone('')
    setEmail('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const observacoes = [
      `Interesse: ${tipoPessoa === 'empresa' ? 'Empresa' : 'Pessoa Física'}`,
      especialidadeCampo ? `Especialidade: ${especialidadeCampo}` : null,
      hospitalCampo ? `Hospital de interesse: ${hospitalCampo}` : null,
      cidadeCampo ? `Cidade: ${cidadeCampo}` : null,
    ]
      .filter(Boolean)
      .join(' | ')

    const utms = getStoredUtms()
    await submit({
      nome,
      email,
      telefone,
      produto: especialidadeCampo ? `Referências em Saúde — ${especialidadeCampo}` : 'Referências em Saúde',
      observacoes,
      // Enriquece a origem com o slug da instituição (ex:
      // 'referencias-saude:hcor-sp') — permite filtrar/medir leads
      // por instituição no Growth Center depois, sem precisar mexer
      // na Edge Function compartilhada de recebimento.
      origem: instituicaoSlug ? `referencias-saude:${instituicaoSlug}` : 'referencias-saude',
      website: honeypot,
      utm: utms,
    })
  }

  const conteudo = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-lifitseg-dark-deep/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-lifitseg-dark p-6 shadow-2xl sm:p-8">
        <button
          onClick={handleFechar}
          className="absolute top-6 right-6 p-2 text-xl font-bold text-lifitseg-offwhite/60 hover:text-lifitseg-offwhite"
        >
          ✕
        </button>

        {status === 'SUCCESS' ? (
          <div className="space-y-4 py-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-2xl font-bold text-primary">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-lifitseg-offwhite">Solicitação Recebida!</h3>
            <p className="text-sm text-lifitseg-offwhite/70">
              Vamos verificar quais planos têm cobertura compatível e entrar em contato em breve.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="mb-2 text-2xl font-bold text-lifitseg-offwhite">Consultar Planos Compatíveis</h3>
            <p className="mb-6 text-xs text-lifitseg-offwhite/60">
              O hospital é uma referência de conteúdo — confirmamos a cobertura real de cada plano
              com você antes de qualquer decisão.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div>
                <label className="mb-1 block text-xs font-semibold text-lifitseg-offwhite/80">
                  Você procura cobertura para
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setTipoPessoa('empresa')}
                    className={`flex-1 rounded-xl border py-3 text-sm font-semibold transition-colors ${
                      tipoPessoa === 'empresa'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-white/10 text-lifitseg-offwhite/70'
                    }`}
                  >
                    Empresa
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoPessoa('fisica')}
                    className={`flex-1 rounded-xl border py-3 text-sm font-semibold transition-colors ${
                      tipoPessoa === 'fisica'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-white/10 text-lifitseg-offwhite/70'
                    }`}
                  >
                    Pessoa Física
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-lifitseg-offwhite/80">
                    Especialidade
                  </label>
                  <input
                    type="text"
                    value={especialidadeCampo}
                    onChange={(e) => setEspecialidadeCampo(e.target.value)}
                    placeholder="Ex: Cardiologia"
                    className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-lifitseg-offwhite/80">
                    Hospital de interesse
                  </label>
                  <input
                    type="text"
                    value={hospitalCampo}
                    onChange={(e) => setHospitalCampo(e.target.value)}
                    placeholder="Ex: HCor"
                    className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-lifitseg-offwhite/80">Cidade</label>
                <input
                  type="text"
                  value={cidadeCampo}
                  onChange={(e) => setCidadeCampo(e.target.value)}
                  placeholder="Ex: São Paulo"
                  className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-lifitseg-offwhite/80">Nome *</label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-lifitseg-offwhite/80">WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-lifitseg-offwhite/80">E-mail *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {status === 'ERROR' && <p className="text-sm font-medium text-red-400">{errorMessage}</p>}

              <button
                type="submit"
                disabled={status === 'SENDING'}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-lifitseg-dark shadow-lg transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {status === 'SENDING' ? 'Enviando...' : 'Encontrar Planos com Cobertura'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )

  return createPortal(conteudo, document.body)
}
