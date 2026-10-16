// src/config/municipios.ts
//
// Cidades atendidas pela Lifitseg (D-24, D-26, D-27): 66 municipios em 4
// regioes. Gerado da lista oficial aprovada
// (marketing/entregas/claude/2026-10-16_regioes-municipios_v1.1.csv).
// Mudancas so por decisao registrada; o Connect usa a mesma lista para
// marcar contatos fora de regiao (D-32).

export type Municipio = { codigo: string; nome: string; regiao: string }

export const MUNICIPIOS_ATENDIDOS: readonly Municipio[] = [
  { codigo: '3501608', nome: 'Americana', regiao: 'Campinas' },
  { codigo: '3502754', nome: 'Araçariguama', regiao: 'São Paulo' },
  { codigo: '3503901', nome: 'Arujá', regiao: 'São Paulo' },
  { codigo: '3504107', nome: 'Atibaia', regiao: 'São Paulo' },
  { codigo: '3505708', nome: 'Barueri', regiao: 'São Paulo' },
  { codigo: '3506359', nome: 'Bertioga', regiao: 'Baixada Santista' },
  { codigo: '3507100', nome: 'Bom Jesus dos Perdões', regiao: 'São Paulo' },
  { codigo: '3509007', nome: 'Caieiras', regiao: 'São Paulo' },
  { codigo: '3509205', nome: 'Cajamar', regiao: 'Jundiaí' },
  { codigo: '3509502', nome: 'Campinas', regiao: 'Campinas' },
  { codigo: '3509601', nome: 'Campo Limpo Paulista', regiao: 'Jundiaí' },
  { codigo: '3510609', nome: 'Carapicuíba', regiao: 'São Paulo' },
  { codigo: '3513009', nome: 'Cotia', regiao: 'São Paulo' },
  { codigo: '3513504', nome: 'Cubatão', regiao: 'Baixada Santista' },
  { codigo: '3513801', nome: 'Diadema', regiao: 'São Paulo' },
  { codigo: '3515004', nome: 'Embu das Artes', regiao: 'São Paulo' },
  { codigo: '3515103', nome: 'Embu-Guaçu', regiao: 'São Paulo' },
  { codigo: '3515707', nome: 'Ferraz de Vasconcelos', regiao: 'São Paulo' },
  { codigo: '3516309', nome: 'Francisco Morato', regiao: 'Jundiaí' },
  { codigo: '3516408', nome: 'Franco da Rocha', regiao: 'São Paulo' },
  { codigo: '3518701', nome: 'Guarujá', regiao: 'Baixada Santista' },
  { codigo: '3518800', nome: 'Guarulhos', regiao: 'São Paulo' },
  { codigo: '3519071', nome: 'Hortolândia', regiao: 'Campinas' },
  { codigo: '3520509', nome: 'Indaiatuba', regiao: 'Campinas' },
  { codigo: '3522109', nome: 'Itanhaém', regiao: 'Baixada Santista' },
  { codigo: '3522208', nome: 'Itapecerica da Serra', regiao: 'São Paulo' },
  { codigo: '3522505', nome: 'Itapevi', regiao: 'São Paulo' },
  { codigo: '3523107', nome: 'Itaquaquecetuba', regiao: 'São Paulo' },
  { codigo: '3523404', nome: 'Itatiba', regiao: 'Campinas' },
  { codigo: '3524006', nome: 'Itupeva', regiao: 'Jundiaí' },
  { codigo: '3524709', nome: 'Jaguariúna', regiao: 'Campinas' },
  { codigo: '3525003', nome: 'Jandira', regiao: 'São Paulo' },
  { codigo: '3525201', nome: 'Jarinu', regiao: 'Jundiaí' },
  { codigo: '3525904', nome: 'Jundiaí', regiao: 'Jundiaí' },
  { codigo: '3527306', nome: 'Louveira', regiao: 'Jundiaí' },
  { codigo: '3528502', nome: 'Mairiporã', regiao: 'São Paulo' },
  { codigo: '3529401', nome: 'Mauá', regiao: 'São Paulo' },
  { codigo: '3530607', nome: 'Mogi das Cruzes', regiao: 'São Paulo' },
  { codigo: '3531100', nome: 'Mongaguá', regiao: 'Baixada Santista' },
  { codigo: '3532405', nome: 'Nazaré Paulista', regiao: 'São Paulo' },
  { codigo: '3533403', nome: 'Nova Odessa', regiao: 'Campinas' },
  { codigo: '3534401', nome: 'Osasco', regiao: 'São Paulo' },
  { codigo: '3536505', nome: 'Paulínia', regiao: 'Campinas' },
  { codigo: '3537602', nome: 'Peruíbe', regiao: 'Baixada Santista' },
  { codigo: '3539103', nome: 'Pirapora do Bom Jesus', regiao: 'São Paulo' },
  { codigo: '3539806', nome: 'Poá', regiao: 'São Paulo' },
  { codigo: '3541000', nome: 'Praia Grande', regiao: 'Baixada Santista' },
  { codigo: '3543303', nome: 'Ribeirão Pires', regiao: 'São Paulo' },
  { codigo: '3544103', nome: 'Rio Grande da Serra', regiao: 'São Paulo' },
  { codigo: '3545803', nome: 'Santa Bárbara d\'Oeste', regiao: 'Campinas' },
  { codigo: '3546801', nome: 'Santa Isabel', regiao: 'São Paulo' },
  { codigo: '3547304', nome: 'Santana de Parnaíba', regiao: 'São Paulo' },
  { codigo: '3547809', nome: 'Santo André', regiao: 'São Paulo' },
  { codigo: '3548500', nome: 'Santos', regiao: 'Baixada Santista' },
  { codigo: '3548708', nome: 'São Bernardo do Campo', regiao: 'São Paulo' },
  { codigo: '3548807', nome: 'São Caetano do Sul', regiao: 'São Paulo' },
  { codigo: '3549953', nome: 'São Lourenço da Serra', regiao: 'São Paulo' },
  { codigo: '3550308', nome: 'São Paulo', regiao: 'São Paulo' },
  { codigo: '3551009', nome: 'São Vicente', regiao: 'Baixada Santista' },
  { codigo: '3552403', nome: 'Sumaré', regiao: 'Campinas' },
  { codigo: '3552502', nome: 'Suzano', regiao: 'São Paulo' },
  { codigo: '3552809', nome: 'Taboão da Serra', regiao: 'São Paulo' },
  { codigo: '3556206', nome: 'Valinhos', regiao: 'Campinas' },
  { codigo: '3556453', nome: 'Vargem Grande Paulista', regiao: 'São Paulo' },
  { codigo: '3556503', nome: 'Várzea Paulista', regiao: 'Jundiaí' },
  { codigo: '3556701', nome: 'Vinhedo', regiao: 'Campinas' },
]

export const CODIGO_OUTRA_CIDADE = 'outra'

/** Busca sem acento e sem diferenciar maiusculas. */
export function normalizarBusca(texto: string): string {
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
}

export function buscarMunicipios(texto: string, limite = 8): Municipio[] {
  const alvo = normalizarBusca(texto)
  if (!alvo) return []
  const comecam = MUNICIPIOS_ATENDIDOS.filter((m) => normalizarBusca(m.nome).startsWith(alvo))
  const contem = MUNICIPIOS_ATENDIDOS.filter((m) => !normalizarBusca(m.nome).startsWith(alvo) && normalizarBusca(m.nome).includes(alvo))
  return [...comecam, ...contem].slice(0, limite)
}
