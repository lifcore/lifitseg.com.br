'use client'

import { useState } from 'react'
import { Users, Send, Briefcase, ArrowLeft } from 'lucide-react'
import { lifcoreApi } from '@/services/lifcoreApi'

type Status = 'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'
type Etapa = 'escolha' | 'formulario'
type TipoCandidatura = 'corretor_externo' | 'candidato_interno'

const ESTADO_INICIAL = {
  nome: '',
  email: '',
  telefone: '',
  cidadeRegiao: '',
  experiencia: '',
  mensagem: '',
  // Corretor Externo / Parceiro
  tipoAtuacao: '',
  corretora: '',
  produtosTrabalhados: '',
  susepCadastro: '',
  operadorasRelacionamento: '',
  // Candidato Interno
  areaInteresse: '',
  funcaoPretendida: '',
  curriculoUrl: '',
  disponibilidade: '',
}

export function TrabalheConoscoCTA() {
  const [modalAberto, setModalAberto] = useState(false)

  return (
    <div className="flex flex-col items-start gap-4">
      <button
        type="button"
        onClick={() => setModalAberto(true)}
        className="inline-flex items-center gap-2 bg-primary hover:opacity-90 text-lifitseg-dark font-bold px-8 py-3.5 rounded-xl transition-all text-sm shadow-md"
      >
        <Users className="w-4 h-4" strokeWidth={1.5} />
        Faça Parte da LifitSeg
      </button>

      {modalAberto && <FacaParteModal onFechar={() => setModalAberto(false)} />}
    </div>
  )
}

function FacaParteModal({ onFechar }: { onFechar: () => void }) {
  const [etapa, setEtapa] = useState<Etapa>('escolha')
  const [tipoCandidatura, setTipoCandidatura] = useState<TipoCandidatura | null>(null)
  const [form, setForm] = useState(ESTADO_INICIAL)
  const [status, setStatus] = useState<Status>('IDLE')
  const [errorMessage, setErrorMessage] = useState('')

  function escolherTipo(tipo: TipoCandidatura) {
    setTipoCandidatura(tipo)
    setEtapa('formulario')
  }

  function voltarParaEscolha() {
    setEtapa('escolha')
    setTipoCandidatura(null)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('SENDING')
    setErrorMessage('')

    try {
      // CONNECT-002 — "Faça Parte da LifitSeg": Website → Connect → People
      // (temporariamente Master, até o People Center existir).
      await lifcoreApi.submitCandidatura({
        origem: 'sobre-e-conhecimento',
        tipoCandidatura,
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
        className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-lifitseg-dark p-6 shadow-2xl sm:p-8 max-h-[90vh] overflow-y-auto"
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
              Seu interesse foi registrado. Nossa equipe vai avaliar e entrar em contato quando fizer sentido.
            </p>
          </div>
        ) : etapa === 'escolha' ? (
          <div>
            <h3 className="mb-2 text-2xl font-bold text-lifitseg-offwhite">Faça Parte da LifitSeg</h3>
            <p className="mb-6 text-sm text-lifitseg-offwhite/70">
              Encontre uma forma de construir sua próxima oportunidade conosco. Como você gostaria de atuar?
            </p>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => escolherTipo('corretor_externo')}
                className="flex w-full items-center gap-4 rounded-xl border border-white/10 bg-lifitseg-dark-deep p-5 text-left transition-colors hover:border-primary"
              >
                <Briefcase className="h-6 w-6 shrink-0 text-primary" strokeWidth={1.5} />
                <div>
                  <p className="font-bold text-lifitseg-offwhite">Quero atuar como parceiro/corretor</p>
                  <p className="mt-1 text-xs text-lifitseg-offwhite/60">
                    Corretor PJ, autônomo ou corretora parceira — mesmo sem SUSEP ainda.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => escolherTipo('candidato_interno')}
                className="flex w-full items-center gap-4 rounded-xl border border-white/10 bg-lifitseg-dark-deep p-5 text-left transition-colors hover:border-primary"
              >
                <Users className="h-6 w-6 shrink-0 text-primary" strokeWidth={1.5} />
                <div>
                  <p className="font-bold text-lifitseg-offwhite">Quero trabalhar na LifitSeg</p>
                  <p className="mt-1 text-xs text-lifitseg-offwhite/60">
                    Vaga interna, CLT — comercial, administrativo ou corretagem.
                  </p>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <button
              type="button"
              onClick={voltarParaEscolha}
              className="mb-4 flex items-center gap-1.5 text-xs font-semibold text-lifitseg-offwhite/60 hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Voltar
            </button>

            <h3 className="mb-6 text-2xl font-bold text-lifitseg-offwhite">
              {tipoCandidatura === 'corretor_externo' ? 'Parceiro / Corretor' : 'Trabalhar na LifitSeg'}
            </h3>

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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  name="cidadeRegiao"
                  value={form.cidadeRegiao}
                  onChange={handleChange}
                  placeholder="Cidade/Região"
                  className={inputClass}
                />
                <input
                  type="text"
                  name="experiencia"
                  value={form.experiencia}
                  onChange={handleChange}
                  placeholder="Experiência (resumo)"
                  className={inputClass}
                />
              </div>

              {tipoCandidatura === 'corretor_externo' ? (
                <>
                  <select
                    name="tipoAtuacao"
                    value={form.tipoAtuacao}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Tipo de atuação (opcional)</option>
                    <option value="PJ">PJ</option>
                    <option value="PF">PF</option>
                    <option value="Ainda não definido">Ainda não definido</option>
                  </select>
                  <input
                    type="text"
                    name="corretora"
                    value={form.corretora}
                    onChange={handleChange}
                    placeholder="Corretora (se tiver)"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    name="produtosTrabalhados"
                    value={form.produtosTrabalhados}
                    onChange={handleChange}
                    placeholder="Produtos que já trabalha"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    name="susepCadastro"
                    value={form.susepCadastro}
                    onChange={handleChange}
                    placeholder="SUSEP/cadastro (se tiver)"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    name="operadorasRelacionamento"
                    value={form.operadorasRelacionamento}
                    onChange={handleChange}
                    placeholder="Seguradoras/operadoras com relacionamento"
                    className={inputClass}
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="areaInteresse"
                    value={form.areaInteresse}
                    onChange={handleChange}
                    placeholder="Área de interesse"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    name="funcaoPretendida"
                    value={form.funcaoPretendida}
                    onChange={handleChange}
                    placeholder="Função pretendida"
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
                  <input
                    type="text"
                    name="disponibilidade"
                    value={form.disponibilidade}
                    onChange={handleChange}
                    placeholder="Disponibilidade"
                    className={inputClass}
                  />
                </>
              )}

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
