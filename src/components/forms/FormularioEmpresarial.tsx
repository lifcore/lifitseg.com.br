'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { lifcoreApi } from '@/services/lifcoreApi'
import { registrarEvento } from '@/utils/eventos'
import { CampoMunicipio } from './CampoMunicipio'
import { mascararCnpj, mascararTelefone, somenteDigitos, validarFormulario, type DadosFormulario, type Erros } from './validacao'

export const EVENTO_SELECIONAR_FAIXA = 'lifitseg:selecionar-faixa'

// '1' e 'nao_sei' entram com as páginas por segmento (Raphael, 18/11/2026): o MEI sozinho e quem ainda não sabe
// respondem com a verdade. A faixa é informada pelo visitante; a página não a pré-seleciona.
const FAIXAS = [
  { valor: '1', rotulo: '1 vida (só o titular)' },
  { valor: '2-29', rotulo: '2 a 29 vidas' },
  { valor: '30-99', rotulo: '30 a 99 vidas' },
  { valor: '100+', rotulo: '100 ou mais vidas' },
  { valor: 'nao_sei', rotulo: 'Ainda não sei' },
]

export type OpcaoObjetivo = { valor: 'primeira_contratacao' | 'revisao_beneficio' | 'gestao_beneficio' | 'outro'; rotulo: string }

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

const OBJETIVOS: OpcaoObjetivo[] = [
  { valor: 'primeira_contratacao', rotulo: 'Contratar o primeiro plano da empresa' },
  { valor: 'revisao_beneficio', rotulo: 'Rever o plano atual' },
  { valor: 'gestao_beneficio', rotulo: 'Apoio na gestão do benefício' },
  { valor: 'outro', rotulo: 'Outro assunto' },
]

const VAZIO: DadosFormulario = {
  nome: '', empresa: '', email: '', telefone: '', municipioCodigo: '', municipioTexto: '',
  faixaVidas: '', objetivo: '', cargo: '', cnpj: '',
}

type Props = {
  /** Ponto de entrada registrado no Connect (ex.: 'home-formulario', 'lp-saude-odonto'). */
  pontoEntrada: string
  /** D-17: obrigatório nas LPs de anúncio pago; opcional no restante do site. */
  cnpjObrigatorio?: boolean
  faixaInicial?: string
  textoBotao?: string
  /** Rótulos do objetivo por página (os valores são os do contrato do Connect). */
  objetivos?: OpcaoObjetivo[]
  /** Página RH: mês da renovação do contrato atual, opcional. */
  mostrarMesRenovacao?: boolean
  /** Texto da confirmação, de acordo com o próximo passo da página. */
  mensagemSucesso?: string
}

/**
 * Formulário empresarial único (plano M-24, D-34, estados da home v3).
 * Sucesso só depois do Connect confirmar; falha preserva os dados; sem
 * envio duplo; nenhum campo livre de saúde.
 */
export function FormularioEmpresarial({ pontoEntrada, cnpjObrigatorio = false, faixaInicial = '', textoBotao = 'Enviar contato empresarial', objetivos = OBJETIVOS, mostrarMesRenovacao = false, mensagemSucesso }: Props) {
  const [mesRenovacao, setMesRenovacao] = useState('')
  const [dados, setDados] = useState<DadosFormulario>({ ...VAZIO, faixaVidas: faixaInicial })
  const [erros, setErros] = useState<Erros>({})
  const [estado, setEstado] = useState<'vazio' | 'enviando' | 'sucesso' | 'falha'>('vazio')
  const [mensagemFalha, setMensagemFalha] = useState('')
  const [iniciado, setIniciado] = useState(false)
  const honeypot = useRef<HTMLInputElement>(null)
  const id = useId()

  useEffect(() => {
    function selecionarFaixa(e: Event) {
      const faixa = (e as CustomEvent<string>).detail
      setDados((d) => ({ ...d, faixaVidas: faixa }))
    }
    window.addEventListener(EVENTO_SELECIONAR_FAIXA, selecionarFaixa)
    return () => window.removeEventListener(EVENTO_SELECIONAR_FAIXA, selecionarFaixa)
  }, [])

  function alterar<K extends keyof DadosFormulario>(campo: K, valor: DadosFormulario[K]) {
    if (!iniciado) {
      setIniciado(true)
      registrarEvento('form_start', pontoEntrada)
    }
    setDados((d) => ({ ...d, [campo]: valor }))
    if (erros[campo] || (campo === 'email' || campo === 'telefone')) setErros((e) => ({ ...e, [campo]: undefined, contato: undefined }))
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (estado === 'enviando') return
    const encontrados = validarFormulario(dados, { cnpjObrigatorio })
    setErros(encontrados)
    if (Object.values(encontrados).some(Boolean)) return

    setEstado('enviando')
    try {
      const resposta = await lifcoreApi.submitLead({
        nome: dados.nome.trim(),
        empresa: dados.empresa.trim(),
        email: dados.email.trim() || undefined,
        telefone: dados.telefone.trim() || undefined,
        produto: 'Saúde empresarial',
        origem: pontoEntrada,
        municipioCodigoIbge: dados.municipioCodigo === 'outra' ? undefined : dados.municipioCodigo,
        municipioTexto: dados.municipioCodigo === 'outra' ? dados.municipioTexto.trim() : undefined,
        faixaVidas: dados.faixaVidas,
        objetivo: dados.objetivo,
        cargo: dados.cargo.trim() || undefined,
        cnpj: somenteDigitos(dados.cnpj) || undefined,
        mesRenovacao: mostrarMesRenovacao && mesRenovacao ? mesRenovacao : undefined,
        website: honeypot.current?.value ?? '',
      })
      setEstado('sucesso')
      registrarEvento('form_submit_ok', pontoEntrada, { eventId: resposta?.protocolo ?? null })
    } catch (erro) {
      setEstado('falha')
      setMensagemFalha(erro instanceof Error && erro.message ? erro.message : 'Não foi possível enviar agora.')
      registrarEvento('form_submit_error', pontoEntrada)
    }
  }

  if (estado === 'sucesso') {
    return (
      <div role="status" className="rounded-2xl border border-lifitseg-line bg-white p-8 text-center">
        <p className="text-lg font-bold text-lifitseg-dark">Recebemos seu contato.</p>
        <p className="mt-2 text-sm text-lifitseg-text-soft">{mensagemSucesso ?? 'A equipe Lifitseg dará continuidade à conversa pelo canal informado.'}</p>
      </div>
    )
  }

  const campo = (nome: keyof DadosFormulario, rotulo: string, extra: React.InputHTMLAttributes<HTMLInputElement> = {}, opcional = false) => (
    <div>
      <label htmlFor={`${id}-${nome}`} className="mb-1.5 block text-sm font-medium text-lifitseg-dark">
        {rotulo}{opcional && <span className="font-normal text-lifitseg-text-soft"> · opcional</span>}
      </label>
      <input
        id={`${id}-${nome}`}
        value={dados[nome]}
        onChange={(e) => alterar(nome, e.target.value)}
        aria-invalid={!!erros[nome]}
        aria-describedby={erros[nome] ? `${id}-${nome}-erro` : undefined}
        className="campo-formulario"
        {...extra}
      />
      {erros[nome] && <p id={`${id}-${nome}-erro`} className="mt-1 text-sm text-red-700">{erros[nome]}</p>}
    </div>
  )

  return (
    <form onSubmit={enviar} noValidate className="space-y-4" aria-busy={estado === 'enviando'}>
      <div className="grid gap-4 sm:grid-cols-2">
        {campo('nome', 'Nome', { autoComplete: 'name', maxLength: 120 })}
        {campo('empresa', 'Empresa', { autoComplete: 'organization', maxLength: 160 })}
        {campo('email', 'E-mail profissional', { type: 'email', autoComplete: 'email', maxLength: 160 })}
        {campo('telefone', 'WhatsApp ou telefone', {
          type: 'tel', autoComplete: 'tel', inputMode: 'tel',
          value: dados.telefone,
          onChange: (e) => alterar('telefone', mascararTelefone(e.target.value)),
        })}
      </div>
      {erros.contato && <p role="alert" className="text-sm text-red-700">{erros.contato}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <CampoMunicipio
          codigo={dados.municipioCodigo}
          texto={dados.municipioTexto}
          onChange={(codigo, texto) => { alterar('municipioCodigo', codigo); setDados((d) => ({ ...d, municipioTexto: texto })) }}
          erro={erros.municipioCodigo}
          erroTexto={erros.municipioTexto}
        />
        <div>
          <label htmlFor={`${id}-faixa`} className="mb-1.5 block text-sm font-medium text-lifitseg-dark">Faixa de vidas</label>
          <select id={`${id}-faixa`} value={dados.faixaVidas} onChange={(e) => alterar('faixaVidas', e.target.value)} aria-invalid={!!erros.faixaVidas} className="campo-formulario">
            <option value="">Selecione</option>
            {FAIXAS.map((f) => <option key={f.valor} value={f.valor}>{f.rotulo}</option>)}
          </select>
          {erros.faixaVidas && <p className="mt-1 text-sm text-red-700">{erros.faixaVidas}</p>}
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-objetivo`} className="mb-1.5 block text-sm font-medium text-lifitseg-dark">Objetivo do contato</label>
        <select id={`${id}-objetivo`} value={dados.objetivo} onChange={(e) => alterar('objetivo', e.target.value)} aria-invalid={!!erros.objetivo} className="campo-formulario">
          <option value="">Selecione</option>
          {objetivos.map((o) => <option key={o.valor} value={o.valor}>{o.rotulo}</option>)}
        </select>
        {erros.objetivo && <p className="mt-1 text-sm text-red-700">{erros.objetivo}</p>}
      </div>

      {mostrarMesRenovacao && (
        <div>
          <label htmlFor={`${id}-renovacao`} className="mb-1.5 block text-sm font-medium text-lifitseg-dark">Mês da renovação do contrato atual<span className="font-normal text-lifitseg-text-soft"> · opcional</span></label>
          <select id={`${id}-renovacao`} value={mesRenovacao} onChange={(e) => setMesRenovacao(e.target.value)} className="campo-formulario">
            <option value="">Não sei ou não tenho plano</option>
            {MESES.map((m, i) => <option key={m} value={String(i + 1)}>{m}</option>)}
          </select>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {campo('cnpj', cnpjObrigatorio ? 'CNPJ' : 'CNPJ', {
          inputMode: 'numeric', value: dados.cnpj,
          onChange: (e) => alterar('cnpj', mascararCnpj(e.target.value)),
        }, !cnpjObrigatorio)}
        {campo('cargo', 'Seu cargo', { autoComplete: 'organization-title', maxLength: 80 }, true)}
      </div>

      {/* Honeypot: invisível para pessoas; só robôs preenchem. */}
      <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <p className="text-xs text-lifitseg-text-soft">
        Usaremos os dados informados para dar continuidade ao seu contato. Consulte a{' '}
        <Link href="/privacidade" className="font-semibold text-lifitseg-green underline underline-offset-2">Política de Privacidade</Link>.
        Não envie informações médicas.
      </p>

      {estado === 'falha' && (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">
          {mensagemFalha} Seus dados continuam aqui; tente enviar de novo.
        </p>
      )}

      <button
        type="submit"
        disabled={estado === 'enviando'}
        className="w-full rounded-xl bg-lifitseg-green px-6 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        {estado === 'enviando' ? 'Enviando…' : textoBotao}
      </button>
    </form>
  )
}
