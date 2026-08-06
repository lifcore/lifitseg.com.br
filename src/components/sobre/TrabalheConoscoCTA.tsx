'use client'

import { useState } from 'react'
import { Users, Send } from 'lucide-react'
import { lifcoreApi } from '@/services/lifcoreApi'

type Status = 'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'

const ESTADO_INICIAL = {
  nome: '',
  email: '',
  telefone: '',
  areaInteresse: '',
  curriculoUrl: '',
  mensagem: '',
}

export function TrabalheConoscoCTA() {
  const [modalAberto, setModalAberto] = useState(false)

  return (
    <div className="flex flex-col items-start gap-4">
      <button
        type="button"
        onClick={() => setModalAberto(true)}
        className="inline-flex items-center gap-2 bg-[#E0A63D] hover:bg-[#c99333] text-[#05191b] font-bold px-8 py-3.5 rounded-xl transition-all text-sm shadow-md"
      >
        <Users className="w-4 h-4" strokeWidth={1.5} />
        Enviar Currículo
      </button>

      {modalAberto && <TrabalheConoscoModal onFechar={() => setModalAberto(false)} />}
    </div>
  )
}

function TrabalheConoscoModal({ onFechar }: { onFechar: () => void }) {
  const [form, setForm] = useState(ESTADO_INICIAL)
  const [status, setStatus] = useState<Status>('IDLE')
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('SENDING')
    setErrorMessage('')

    try {
      // CONNECT-002 — "Trabalhe Conosco": Website → Connect → People
      // (temporariamente Master, até o People Center existir).
      await lifcoreApi.submitCandidatura({
        origem: 'sobre-e-conhecimento',
        ...form,
      })
      setStatus('SUCCESS')
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Ocorreu um erro inesperado.')
      setStatus('ERROR')
    }
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite placeholder:text-lifitseg-offwhite/40 focus:border-primary focus:outline-none'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-lifitseg-dark-deep/80 p-4 backdrop-blur-sm" onClick={onFechar}>
      <div
        className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-lifitseg-dark p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onFechar}
          className="absolute top-6 right-6 p-2 text-xl font-bold text-lifitseg-offwhite/60 hover:text-lifitseg-offwhite"
        >
          ✕
        </button>

        {status === 'SUCCESS' ? (
          <div className="space-y-4 py-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-2xl font-bold text-primary">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-lifitseg-offwhite">Recebemos seu contato!</h3>
            <p className="text-sm text-lifitseg-offwhite/70">
              Seu interesse foi registrado. Se surgir uma oportunidade compatível, entraremos em contato.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="mb-2 text-2xl font-bold text-lifitseg-offwhite">Trabalhe Conosco</h3>
            <p className="mb-6 text-xs text-lifitseg-offwhite/60">
              Conte um pouco sobre você. Não temos upload de arquivo ainda — se tiver currículo online (LinkedIn, Drive), cole o link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="nome"
                required
                value={form.nome}
                onChange={handleChange}
                placeholder="Nome completo"
                className={inputClass}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                  className={inputClass}
                />
                <input
                  type="tel"
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  placeholder="Telefone (opcional)"
                  className={inputClass}
                />
              </div>

              <input
                type="text"
                name="areaInteresse"
                value={form.areaInteresse}
                onChange={handleChange}
                placeholder="Área de interesse"
                className={inputClass}
              />

              <input
                type="url"
                name="curriculoUrl"
                value={form.curriculoUrl}
                onChange={handleChange}
                placeholder="Link do currículo ou LinkedIn (opcional)"
                className={inputClass}
              />

              <textarea
                name="mensagem"
                value={form.mensagem}
                onChange={handleChange}
                rows={3}
                placeholder="Mensagem (opcional)"
                className={`${inputClass} resize-none`}
              />

              {status === 'ERROR' && (
                <p className="text-sm font-medium text-red-400">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'SENDING'}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-lifitseg-dark shadow-lg transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {status === 'SENDING' ? 'Enviando...' : 'Enviar'}
                {status !== 'SENDING' && <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
