'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLifCoreLead } from '@/hooks/useLifCoreLead'
import { getStoredUtms } from '@/utils/tracking'

type LeadModalProps = {
  isOpen: boolean
  onClose: () => void
  defaultProduto?: string
  origem?: string
  /** Lista de produtos exibida no seletor "Interesse Principal". Cada página passa a sua — se omitido, cai no fallback genérico abaixo (usado hoje pela Home/Header). */
  produtos?: string[]
  /**
   * @deprecated O campo que essa prop controlava ("Nº de Colaboradores/Vidas")
   * foi removido do formulário — não fazia sentido fora de plano
   * coletivo de Saúde/Odonto. Prop mantida só pra não quebrar build
   * de páginas que ainda não foram revisadas; não tem mais efeito.
   */
  mostrarDadosEmpresa?: boolean
}

/** Fallback genérico — usado só quando a página não informa sua própria lista de produtos. */
const PRODUTOS_FALLBACK = [
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
  documento: '', // CPF ou CNPJ — opcional, sem distinção de formato forçada aqui
  numeroColaboradores: undefined as number | undefined,
  produto,
  origem,
})

/**
 * Modal de captura de lead — reutilizável em qualquer página do site
 * (Home, Header, Benefícios Corporativos, etc.). Usa o hook oficial
 * `useLifCoreLead` (WEB-001), então todo lead passa pelo mesmo
 * contrato de dados e pelos mesmos 4 estados (IDLE/SENDING/SUCCESS/ERROR),
 * não importa de qual página do site ele venha.
 *
 * CORREÇÃO (ajuste "Fale com Consultor" travado): renderiza via
 * Portal direto no <body>. Antes, quando chamado de dentro do
 * <Header>, o `backdrop-blur` do header criava um novo container de
 * posicionamento — qualquer `position: fixed` dentro dele passava a
 * ser relativo ao header (80px de altura), não à tela inteira. Por
 * isso o modal aparecia cortado e impossível de usar. Portal resolve
 * isso na raiz, pra qualquer página que chamar o modal no futuro,
 * não só o Header.
 *
 * SIMPLIFICAÇÃO (campos do formulário): removido "Nº de
 * Colaboradores/Vidas" — é conceito específico de plano coletivo de
 * Saúde/Odonto, não fazia sentido aparecer pra "Gestão de Frotas &
 * Automóvel" nem pra nenhum outro produto. E-mail deixou de exigir
 * "corporativo" — nem todo lead tem e-mail de empresa. Campo de
 * CPF/CNPJ adicionado como opcional.
 */
export function LeadModal({
  isOpen,
  onClose,
  defaultProduto,
  origem = 'site',
  produtos = PRODUTOS_FALLBACK,
}: LeadModalProps) {
  const produtoInicial = defaultProduto ?? produtos[0]
  const { status, errorMessage, submit, reset } = useLifCoreLead()
  const [form, setForm] = useState(ESTADO_INICIAL(produtoInicial, origem))
  const [montado, setMontado] = useState(false)

  // Portal só pode apontar pro document.body depois que o componente
  // montou no cliente — no SSR do Next.js, `document` não existe.
  useEffect(() => {
    setMontado(true)
  }, [])

  if (!isOpen || !montado) return null

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
    // UTM Transversal — resgata o que foi capturado na entrada da
    // sessão (qualquer página), mesmo que o usuário tenha navegado
    // várias páginas antes de chegar neste formulário. Vem null se a
    // sessão não teve UTM nenhuma — nunca inventado aqui.
    //
    // `receber-lead-site` espera um único campo `utm` (objeto) — por
    // isso agrupa aqui, não espalha os campos soltos no payload.
    const utms = getStoredUtms()
    await submit({ ...form, utm: utms })
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
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="carlos@email.com.br"
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
                    placeholder="Sua Empresa S/A (se aplicável)"
                    className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-lifitseg-offwhite/80">
                    CPF ou CNPJ (opcional)
                  </label>
                  <input
                    type="text"
                    name="documento"
                    value={form.documento}
                    onChange={handleChange}
                    placeholder="000.000.000-00"
                    className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-lifitseg-offwhite/80">
                  Número de Colaboradores (opcional)
                </label>
                <input
                  type="number"
                  name="numeroColaboradores"
                  value={form.numeroColaboradores ?? ''}
                  onChange={handleChange}
                  placeholder="Ex: 15"
                  className="w-full rounded-xl border border-white/10 bg-lifitseg-dark-deep px-4 py-3 text-sm text-lifitseg-offwhite focus:border-primary focus:outline-none"
                />
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
                  {produtos.map((p) => (
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

  return createPortal(conteudo, document.body)
}
