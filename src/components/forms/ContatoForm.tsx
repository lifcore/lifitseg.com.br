'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { lifcoreApi } from '@/services/lifcoreApi'

type ContatoFormData = {
  nome: string
  empresa: string
  email: string
  telefone: string
  assunto: string
  mensagem: string
}

const INITIAL_STATE: ContatoFormData = {
  nome: '',
  empresa: '',
  email: '',
  telefone: '',
  assunto: '',
  mensagem: '',
}

type Status = 'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'

export function ContatoForm() {
  const [form, setForm] = useState<ContatoFormData>(INITIAL_STATE)
  const [status, setStatus] = useState<Status>('IDLE')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (field: keyof ContatoFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('SENDING')
    setErrorMessage('')

    try {
      // CONNECT-002 — "Fale Conosco": Website → Connect → Growth.
      await lifcoreApi.submitContato({
        origem: 'sobre-e-conhecimento',
        ...form,
      })
      setStatus('SUCCESS')
      setForm(INITIAL_STATE)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Ocorreu um erro inesperado.')
      setStatus('ERROR')
    }
  }

  const inputClass =
    'w-full rounded-xl border border-[#05191b]/15 bg-white px-4 py-3 text-sm text-[#05191b] placeholder:text-[#05191b]/40 focus:outline-none focus:border-[#E0A63D] transition-colors'

  if (status === 'SUCCESS') {
    return (
      <div className="space-y-3 py-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E0A63D]/15 text-xl font-bold text-[#E0A63D]">
          ✓
        </div>
        <h4 className="text-lg font-bold text-[#05191b]">Mensagem enviada!</h4>
        <p className="text-sm text-[#05191b]/60">Nossa equipe vai retornar em breve.</p>
        <button
          onClick={() => setStatus('IDLE')}
          className="text-xs font-bold text-[#E0A63D] hover:text-[#0b3337]"
        >
          Enviar outra mensagem
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange('nome')}
          required
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Empresa (opcional)"
          value={form.empresa}
          onChange={handleChange('empresa')}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange('email')}
          required
          className={inputClass}
        />
        <input
          type="tel"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange('telefone')}
          className={inputClass}
        />
      </div>

      <input
        type="text"
        placeholder="Assunto"
        value={form.assunto}
        onChange={handleChange('assunto')}
        className={inputClass}
      />

      <textarea
        placeholder="Mensagem"
        value={form.mensagem}
        onChange={handleChange('mensagem')}
        required
        rows={5}
        className={`${inputClass} resize-none`}
      />

      {status === 'ERROR' && (
        <p className="text-sm font-medium text-red-500">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'SENDING'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E0A63D] hover:bg-[#c99333] text-[#05191b] font-bold px-8 py-3.5 rounded-xl transition-all shadow-md text-sm disabled:opacity-60"
      >
        {status === 'SENDING' ? 'Enviando...' : 'Enviar mensagem'}
        {status !== 'SENDING' && <Send className="w-4 h-4" strokeWidth={1.5} />}
      </button>
    </form>
  )
}
