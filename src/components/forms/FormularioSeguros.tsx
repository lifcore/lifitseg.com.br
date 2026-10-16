'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { lifcoreApi } from '@/services/lifcoreApi'
import { registrarEvento } from '@/utils/eventos'
import { CampoMunicipio } from './CampoMunicipio'
import { emailValido, mascararTelefone, telefoneValido } from './validacao'

// Formulário de seguros por ramo (etapa 3 do Chat, regras de contato):
// - pessoal: nome, e-mail ou WhatsApp, cidade e assunto; sem empresa, CNPJ
//   ou faixa de vidas.
// - corporativo: empresa, contato, cidade, ramo e objetivo; sem faixa de vidas.
// O Connect recebe o ramo em `produto` (define o módulo do CRM) e a origem
// do visitante. Sinistro e atendimento têm caminho próprio, fora deste
// formulário comercial.

const RAMOS = {
  pessoal: [
    { valor: 'Seguro auto e moto', rotulo: 'Auto e moto' },
    { valor: 'Seguro residencial', rotulo: 'Residencial' },
    { valor: 'Seguro de vida e acidentes pessoais', rotulo: 'Vida e acidentes pessoais' },
    { valor: 'Seguro viagem', rotulo: 'Viagem' },
    { valor: 'Seguro de equipamentos', rotulo: 'Equipamentos e tecnologia' },
    { valor: 'Outro seguro pessoal', rotulo: 'Outro assunto' },
  ],
  corporativo: [
    { valor: 'Seguro patrimonial empresarial', rotulo: 'Patrimônio empresarial' },
    { valor: 'Seguro de responsabilidade civil', rotulo: 'Responsabilidade civil' },
    { valor: 'Seguro de transporte e logística', rotulo: 'Transporte e logística' },
    { valor: 'Seguro de frota', rotulo: 'Frota' },
    { valor: 'Seguro garantia e crédito', rotulo: 'Garantias e crédito' },
    { valor: 'Seguro cyber e riscos específicos', rotulo: 'Cyber e riscos específicos' },
    { valor: 'Outro seguro empresarial', rotulo: 'Outro assunto' },
  ],
}

const OBJETIVOS_CORPORATIVO = ['Contratar um seguro novo', 'Revisar um seguro que já temos', 'Preparar a renovação', 'Outro assunto']

type Props = { variante: 'pessoal' | 'corporativo'; pontoEntrada: string }

export function FormularioSeguros({ variante, pontoEntrada }: Props) {
  const id = useId()
  const [dados, setDados] = useState({ nome: '', empresa: '', email: '', telefone: '', municipio: '', municipioTexto: '', ramo: '', objetivo: '' })
  const [erros, setErros] = useState<Record<string, string>>({})
  const [estado, setEstado] = useState<'vazio' | 'enviando' | 'sucesso' | 'falha'>('vazio')
  const [falha, setFalha] = useState('')
  const [iniciado, setIniciado] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const corporativo = variante === 'corporativo'

  function alterar(campo: keyof typeof dados, valor: string) {
    if (!iniciado) {
      setIniciado(true)
      registrarEvento('form_start', pontoEntrada)
    }
    setDados((d) => ({ ...d, [campo]: valor }))
    setErros((e) => ({ ...e, [campo]: '', contato: '' }))
  }

  function validar() {
    const e: Record<string, string> = {}
    if (!dados.nome.trim()) e.nome = 'Informe seu nome.'
    if (corporativo && !dados.empresa.trim()) e.empresa = 'Informe o nome da empresa.'
    if (!dados.email.trim() && !dados.telefone.trim()) e.contato = 'Informe um e-mail ou um WhatsApp para contato.'
    if (dados.email.trim() && !emailValido(dados.email)) e.email = 'Confira o e-mail informado.'
    if (dados.telefone.trim() && !telefoneValido(dados.telefone)) e.telefone = 'Informe o número com DDD.'
    if (!dados.municipio) e.municipio = 'Escolha a cidade.'
    if (dados.municipio === 'outra' && !dados.municipioTexto.trim()) e.municipioTexto = 'Informe a cidade.'
    if (!dados.ramo) e.ramo = 'Escolha o tipo de seguro.'
    if (corporativo && !dados.objetivo) e.objetivo = 'Escolha o objetivo do contato.'
    return e
  }

  async function enviar(ev: React.FormEvent) {
    ev.preventDefault()
    if (estado === 'enviando') return
    const e = validar()
    setErros(e)
    if (Object.values(e).some(Boolean)) return
    setEstado('enviando')
    try {
      await lifcoreApi.submitLead({
        nome: dados.nome.trim(),
        empresa: corporativo ? dados.empresa.trim() : undefined,
        email: dados.email.trim() || undefined,
        telefone: dados.telefone.trim() || undefined,
        produto: dados.ramo,
        origem: pontoEntrada,
        municipioCodigoIbge: dados.municipio === 'outra' ? undefined : dados.municipio,
        municipioTexto: dados.municipio === 'outra' ? dados.municipioTexto.trim() : undefined,
        observacoes: corporativo ? `Objetivo: ${dados.objetivo}` : undefined,
        website: honeypot,
      })
      setEstado('sucesso')
      registrarEvento('form_submit_ok', pontoEntrada)
    } catch (erro) {
      setEstado('falha')
      setFalha(erro instanceof Error && erro.message ? erro.message : 'Não foi possível enviar agora.')
      registrarEvento('form_submit_error', pontoEntrada)
    }
  }

  if (estado === 'sucesso') {
    return (
      <div role="status" className="rounded-2xl border border-lifitseg-line bg-white p-8 text-center">
        <p className="text-lg font-bold text-lifitseg-dark">Recebemos seu contato.</p>
        <p className="mt-2 text-sm text-lifitseg-text-soft">A equipe Lifitseg dará continuidade à conversa pelo canal informado.</p>
      </div>
    )
  }

  const campoTexto = (campo: keyof typeof dados, rotulo: string, extra: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label htmlFor={`${id}-${campo}`} className="mb-1.5 block text-sm font-medium text-lifitseg-dark">{rotulo}</label>
      <input id={`${id}-${campo}`} value={dados[campo]} onChange={(e) => alterar(campo, e.target.value)} aria-invalid={!!erros[campo]} className="campo-formulario" {...extra} />
      {erros[campo] && <p className="mt-1 text-sm text-red-700">{erros[campo]}</p>}
    </div>
  )

  return (
    <form onSubmit={enviar} noValidate className="space-y-4" aria-busy={estado === 'enviando'}>
      <div className="grid gap-4 sm:grid-cols-2">
        {campoTexto('nome', 'Nome', { autoComplete: 'name', maxLength: 120 })}
        {corporativo && campoTexto('empresa', 'Empresa', { autoComplete: 'organization', maxLength: 160 })}
        {campoTexto('email', corporativo ? 'E-mail profissional' : 'E-mail', { type: 'email', autoComplete: 'email', maxLength: 160 })}
        {campoTexto('telefone', 'WhatsApp ou telefone', { type: 'tel', inputMode: 'tel', autoComplete: 'tel', value: dados.telefone, onChange: (e) => alterar('telefone', mascararTelefone(e.target.value)) })}
      </div>
      {erros.contato && <p role="alert" className="text-sm text-red-700">{erros.contato}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <CampoMunicipio
          codigo={dados.municipio}
          texto={dados.municipioTexto}
          onChange={(codigo, texto) => { alterar('municipio', codigo); setDados((d) => ({ ...d, municipioTexto: texto })) }}
          erro={erros.municipio}
          erroTexto={erros.municipioTexto}
        />
        <div>
          <label htmlFor={`${id}-ramo`} className="mb-1.5 block text-sm font-medium text-lifitseg-dark">Tipo de seguro</label>
          <select id={`${id}-ramo`} value={dados.ramo} onChange={(e) => alterar('ramo', e.target.value)} aria-invalid={!!erros.ramo} className="campo-formulario">
            <option value="">Selecione</option>
            {RAMOS[variante].map((r) => <option key={r.valor} value={r.valor}>{r.rotulo}</option>)}
          </select>
          {erros.ramo && <p className="mt-1 text-sm text-red-700">{erros.ramo}</p>}
        </div>
      </div>

      {corporativo && (
        <div>
          <label htmlFor={`${id}-objetivo`} className="mb-1.5 block text-sm font-medium text-lifitseg-dark">Objetivo do contato</label>
          <select id={`${id}-objetivo`} value={dados.objetivo} onChange={(e) => alterar('objetivo', e.target.value)} aria-invalid={!!erros.objetivo} className="campo-formulario">
            <option value="">Selecione</option>
            {OBJETIVOS_CORPORATIVO.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          {erros.objetivo && <p className="mt-1 text-sm text-red-700">{erros.objetivo}</p>}
        </div>
      )}

      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />

      <p className="text-xs text-lifitseg-text-soft">
        Usaremos os dados informados para dar continuidade ao seu contato. Consulte a{' '}
        <Link href="/privacidade" className="font-semibold text-lifitseg-green underline underline-offset-2">Política de Privacidade</Link>. Não envie informações de saúde nem documentos por este formulário.
      </p>

      {estado === 'falha' && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{falha} Seus dados continuam aqui; tente enviar de novo.</p>}

      <button type="submit" disabled={estado === 'enviando'} className="w-full rounded-xl bg-lifitseg-green px-6 py-3.5 text-sm font-bold text-white hover:opacity-90 disabled:cursor-wait disabled:opacity-60 sm:w-auto">
        {estado === 'enviando' ? 'Enviando…' : 'Enviar contato'}
      </button>
    </form>
  )
}
