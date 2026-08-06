'use client'

import { useState } from 'react'
import { useLifCoreLead } from '@/hooks/useLifCoreLead'

type LeadModalProps = {
  isOpen: boolean
  onClose: () => void
  defaultProduto?: string
  origem?: string
}

const PRODUTOS = [
  'Plano de Saúde Empresarial',
  'Seguro de Vida em Grupo',
  'Riscos Patrimoniais & Empresariais',
  'Gestão de Frotas & Automóvel',
]

const ESTADO_INICIAL = (produto: string, origem: string) => ({
  nome: '',
  email: '',
  telefone: '',
  empresa: '',
  cidade: '',
  numeroColaboradores: undefined as number | undefined,
  produto,
  origem,
})

/**
 * Modal de captura de lead — reutilizável em qualquer página do site
 * (Home, Benefícios Corporativos, etc.). Usa o hook oficial
 * `useLifCoreLead` (WEB-001), então todo lead passa pelo mesmo
 * contrato de dados e pelos mesmos 4 estados (IDLE/SENDING/SUCCESS/ERROR),
 * não importa de qual página do site ele venha.
 */
export function LeadModal({ isOpen, onClose, defaultProduto, origem = 'site' }: LeadModalProps) {
  const produtoInicial = defaultProduto ?? PRODUTOS[0]
  const { status, errorMessage, submit, reset } = useLifCoreLead()
  const [form, setForm] = useState(ESTADO_INICIAL(produtoInicial, origem))

  if (!isOpen) return null

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleFechar() {
    onClose()
    reset()
    setForm(ESTADO_INICIAL(produtoInicial, origem))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await submit(form)
  }

  return (
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
              Seus dados foram encaminhados diretamente ao nosso time de consultoria via{' '}
              <strong>LifCore</strong>. Entraremos em contato em breve.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="mb-2 text-2xl font-bold text-lifitseg-offwhite">Agende seu Diagnóstico</h3>
            <p className="mb-6 text-xs text-lifitseg-offwhite/60">
              Preencha os dados abaixo para receber uma análise preliminar da sua apólice.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-lifitseg-offwhite/80">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="nome"
                  required
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Ex: Carlos Silva"
                  className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-lifitseg-offwhite/80">
                    E-mail Corporativo *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="carlos@empresa.com.br"
                    className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-lifitseg-offwhite/80">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    required
                    value={form.telefone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                    className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-lifitseg-offwhite/80">
                    Nome da Empresa
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    value={form.empresa}
                    onChange={handleChange}
                    placeholder="Sua Empresa S/A"
                    className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-lifitseg-offwhite/80">
                    Nº de Colaboradores / Vidas
                  </label>
                  <input
                    type="text"
                    name="numeroColaboradores"
                    value={form.numeroColaboradores ?? ''}
                    onChange={handleChange}
                    placeholder="Ex: 15, 50, 200+"
                    className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-lifitseg-offwhite/80">
                  Interesse Principal
                </label>
                <select
                  name="produto"
                  value={form.produto}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
                >
                  {PRODUTOS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {status === 'ERROR' && (
                <p className="text-sm font-medium text-red-400">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'SENDING'}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-lifitseg-dark shadow-lg transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {status === 'SENDING' ? 'Enviando solicitação...' : 'Solicitar Contato do Consultor'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
