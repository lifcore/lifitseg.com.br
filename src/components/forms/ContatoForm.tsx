'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

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

export function ContatoForm() {
  const [form, setForm] = useState<ContatoFormData>(INITIAL_STATE)

  const handleChange = (field: keyof ContatoFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: integrar com o LifCore CRM (encaminhamento e distribuição entre consultores).
    // Nenhuma chamada de rede é feita nesta Sprint — a interface está pronta para a integração futura.
  }

  const inputClass =
    'w-full rounded-xl border border-[#05191b]/15 bg-white px-4 py-3 text-sm text-[#05191b] placeholder:text-[#05191b]/40 focus:outline-none focus:border-[#E0A63D] transition-colors'

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

      <button
        type="submit"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E0A63D] hover:bg-[#c99333] text-[#05191b] font-bold px-8 py-3.5 rounded-xl transition-all shadow-md text-sm"
      >
        Enviar mensagem
        <Send className="w-4 h-4" strokeWidth={1.5} />
      </button>
    </form>
  )
}
