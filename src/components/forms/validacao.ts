// src/components/forms/validacao.ts
// Validações do formulário empresarial (D-34). Sem dependência de React,
// para poder testar e reaproveitar nas LPs.

export function somenteDigitos(v: string): string {
  return v.replace(/\D/g, '')
}

export function emailValido(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function telefoneValido(telefone: string): boolean {
  const d = somenteDigitos(telefone)
  return d.length >= 10 && d.length <= 13
}

/** Confere os dígitos verificadores do CNPJ. */
export function cnpjValido(cnpj: string): boolean {
  const d = somenteDigitos(cnpj)
  if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false
  const calc = (base: string, pesos: number[]) => {
    const soma = base.split('').reduce((s, n, i) => s + Number(n) * pesos[i], 0)
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }
  const d1 = calc(d.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
  const d2 = calc(d.slice(0, 12) + d1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
  return d.endsWith(`${d1}${d2}`)
}

export function mascararCnpj(v: string): string {
  const d = somenteDigitos(v).slice(0, 14)
  return d
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

export function mascararTelefone(v: string): string {
  const d = somenteDigitos(v).slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export type DadosFormulario = {
  nome: string
  empresa: string
  email: string
  telefone: string
  municipioCodigo: string
  municipioTexto: string
  faixaVidas: string
  objetivo: string
  cargo: string
  cnpj: string
}

export type Erros = Partial<Record<keyof DadosFormulario | 'contato', string>>

export function validarFormulario(d: DadosFormulario, opcoes: { cnpjObrigatorio: boolean }): Erros {
  const e: Erros = {}
  if (!d.nome.trim()) e.nome = 'Informe seu nome.'
  if (!d.empresa.trim()) e.empresa = 'Informe o nome da empresa.'
  if (!d.email.trim() && !d.telefone.trim()) e.contato = 'Informe um e-mail ou um WhatsApp para contato.'
  if (d.email.trim() && !emailValido(d.email)) e.email = 'Confira o e-mail informado.'
  if (d.telefone.trim() && !telefoneValido(d.telefone)) e.telefone = 'Informe o número com DDD.'
  if (!d.municipioCodigo) e.municipioCodigo = 'Escolha o município da empresa.'
  if (d.municipioCodigo === 'outra' && !d.municipioTexto.trim()) e.municipioTexto = 'Informe a cidade.'
  if (!d.faixaVidas) e.faixaVidas = 'Escolha a faixa de vidas.'
  if (!d.objetivo) e.objetivo = 'Escolha o objetivo do contato.'
  if (opcoes.cnpjObrigatorio && !d.cnpj.trim()) e.cnpj = 'Informe o CNPJ da empresa.'
  if (d.cnpj.trim() && !cnpjValido(d.cnpj)) e.cnpj = 'Confira o CNPJ informado.'
  return e
}
