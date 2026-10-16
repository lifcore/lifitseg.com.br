'use client'

import { useId, useState } from 'react'
import { buscarMunicipios, CODIGO_OUTRA_CIDADE, MUNICIPIOS_ATENDIDOS } from '@/config/municipios'

type Props = {
  codigo: string
  texto: string
  onChange: (codigo: string, texto: string) => void
  erro?: string
  erroTexto?: string
}

/**
 * Município com busca nas 66 cidades atendidas + "Outra cidade" (D-32).
 * Combobox acessível: setas para navegar, Enter para escolher.
 */
export function CampoMunicipio({ codigo, texto, onChange, erro, erroTexto }: Props) {
  const id = useId()
  const listaId = `${id}-lista`
  const selecionado = MUNICIPIOS_ATENDIDOS.find((m) => m.codigo === codigo)
  const [busca, setBusca] = useState(selecionado?.nome ?? (codigo === CODIGO_OUTRA_CIDADE ? 'Outra cidade' : ''))
  const [aberto, setAberto] = useState(false)
  const [ativo, setAtivo] = useState(0)

  const sugestoes = buscarMunicipios(busca)
  const opcoes = [...sugestoes.map((m) => ({ codigo: m.codigo, rotulo: m.nome })), { codigo: CODIGO_OUTRA_CIDADE, rotulo: 'Outra cidade' }]

  function escolher(op: { codigo: string; rotulo: string }) {
    setBusca(op.rotulo)
    setAberto(false)
    onChange(op.codigo, op.codigo === CODIGO_OUTRA_CIDADE ? texto : '')
  }

  function teclas(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setAberto(true); setAtivo((a) => Math.min(a + 1, opcoes.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setAtivo((a) => Math.max(a - 1, 0)) }
    if (e.key === 'Enter' && aberto) { e.preventDefault(); escolher(opcoes[ativo]) }
    if (e.key === 'Escape') setAberto(false)
  }

  return (
    <div className="relative">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-lifitseg-dark">Município da empresa</label>
      <input
        id={id}
        role="combobox"
        aria-expanded={aberto}
        aria-controls={listaId}
        aria-autocomplete="list"
        aria-activedescendant={aberto ? `${listaId}-${ativo}` : undefined}
        aria-invalid={!!erro}
        aria-describedby={erro ? `${id}-erro` : undefined}
        autoComplete="off"
        value={busca}
        placeholder="Digite para buscar"
        onChange={(e) => { setBusca(e.target.value); setAberto(true); setAtivo(0); if (codigo) onChange('', '') }}
        onFocus={() => setAberto(true)}
        onBlur={() => setTimeout(() => setAberto(false), 150)}
        onKeyDown={teclas}
        className="campo-formulario"
      />
      {aberto && (
        <ul id={listaId} role="listbox" className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-xl border border-lifitseg-line bg-white py-1 shadow-lg">
          {opcoes.map((op, i) => (
            <li
              key={op.codigo}
              id={`${listaId}-${i}`}
              role="option"
              aria-selected={i === ativo}
              onMouseDown={(e) => { e.preventDefault(); escolher(op) }}
              className={`cursor-pointer px-4 py-2 text-sm ${i === ativo ? 'bg-lifitseg-paper text-lifitseg-dark' : 'text-lifitseg-text'}`}
            >
              {op.rotulo}
            </li>
          ))}
        </ul>
      )}
      {erro && <p id={`${id}-erro`} className="mt-1 text-sm text-red-700">{erro}</p>}

      {codigo === CODIGO_OUTRA_CIDADE && (
        <div className="mt-3">
          <label htmlFor={`${id}-outra`} className="mb-1.5 block text-sm font-medium text-lifitseg-dark">Qual cidade?</label>
          <input
            id={`${id}-outra`}
            value={texto}
            maxLength={80}
            onChange={(e) => onChange(CODIGO_OUTRA_CIDADE, e.target.value)}
            aria-invalid={!!erroTexto}
            className="campo-formulario"
          />
          {erroTexto && <p className="mt-1 text-sm text-red-700">{erroTexto}</p>}
        </div>
      )}
    </div>
  )
}
