// /services/lifcoreApi.js

import { LifCoreConfig } from '../config/lifcore.config.js'
import { obterRastreio } from '../utils/tracking'

/**
 * Simula a resposta da API em ambiente de desenvolvimento — não
 * depende do backend real existir.
 */
const mockAdapter = async (endpoint, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`[LifCore MOCK] Endpoint: ${endpoint}`, data)
      if (data.email === 'erro@lifitseg.com.br') {
        reject(new Error('Erro simulado pelo servidor para testes.'))
      } else {
        resolve({
          success: true,
          message: 'Capturado com sucesso (Mock)',
          leadId: 'mock_' + Math.random().toString(36).substring(2, 9),
        })
      }
    }, 1000)
  })
}

const realAdapter = async (endpoint, data) => {
  const url = `${LifCoreConfig.baseUrl}${endpoint}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-LifCore-Client': 'LifitSeg-WebFront',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    throw new Error(errorBody.message || `Erro de comunicação com o servidor: ${response.status}`)
  }

  return await response.json()
}

/** Chama uma Supabase Edge Function pelo nome (ex: 'receber-lead-site'). */
async function postToFunction(functionName, payload) {
  const endpoint = `/${functionName}`
  try {
    if (LifCoreConfig.useMock) {
      return await mockAdapter(endpoint, payload)
    }
    return await realAdapter(endpoint, payload)
  } catch (error) {
    console.error('[LifCore API Error]:', error)
    throw error
  }
}

/**
 * Adaptadores de LEITURA (GET) — pro módulo Referências em Saúde e
 * qualquer outra Edge Function futura de leitura pública. Separado
 * dos adaptadores de POST acima porque a forma de montar a URL
 * (query string, sem body) e o método HTTP são diferentes.
 */
const mockAdapterGet = async (endpoint, params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[LifCore MOCK] GET Endpoint: ${endpoint}`, params)
      resolve({ success: true, data: [] })
    }, 300)
  })
}

const realAdapterGet = async (endpoint, params) => {
  const query = params && Object.keys(params).length > 0
    ? '?' + new URLSearchParams(params).toString()
    : ''
  const url = `${LifCoreConfig.baseUrl}${endpoint}${query}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-LifCore-Client': 'LifitSeg-WebFront',
    },
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    throw new Error(errorBody.message || `Erro de comunicação com o servidor: ${response.status}`)
  }

  return await response.json()
}

/** Chama uma Supabase Edge Function de LEITURA pelo nome (ex: 'listar-referencias-saude'). */
async function getFromFunction(functionName, params) {
  const endpoint = `/${functionName}`
  try {
    if (LifCoreConfig.useMock) {
      return await mockAdapterGet(endpoint, params)
    }
    return await realAdapterGet(endpoint, params)
  } catch (error) {
    console.error('[LifCore API Error]:', error)
    throw error
  }
}

export const lifcoreApi = {
  /**
   * Usado pelo LeadModal (via useLifCoreLead). Bate na function
   * `receber-lead-site`, já publicada e testada no Supabase — cria
   * cliente/prospect + contato primário de verdade.
   */
  async submitLead(payload) {
    // F1 (D-34): nome e ao menos um contato (e-mail ou telefone).
    if (!payload.nome || (!payload.email && !payload.telefone)) {
      throw new Error('Informe seu nome e um e-mail ou telefone para contato.')
    }
    // A origem do visitante (D-30) segue sempre junto, no campo `rastreio`.
    return postToFunction('receber-lead-site', { ...payload, rastreio: obterRastreio() })
  },

  /**
   * Usado pelo ContatoForm (WEB-005, "Fale com a LifitSeg"). A function
   * `receber-fale-conosco` existe e, desde a F1, usa o mesmo fluxo de
   * recepção do `receber-lead-site` (origem, filtro e quarentena).
   */
  async submitContato(payload) {
    if (!payload.nome || (!payload.email && !payload.telefone)) {
      throw new Error('Informe seu nome e um e-mail ou telefone para contato.')
    }
    return postToFunction('receber-fale-conosco', { ...payload, rastreio: obterRastreio() })
  },

  /**
   * Eventos de navegação agregados (H2). Só é chamado quando o visitante
   * aceitou a medição (ver utils/eventos.ts). Não bloqueia a página:
   * falha é ignorada.
   */
  async registrarEvento(corpo) {
    if (LifCoreConfig.useMock) {
      console.log('[LifCore MOCK] evento', corpo)
      return
    }
    try {
      await fetch(`${LifCoreConfig.baseUrl}/registrar-evento-site`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-LifCore-Client': 'LifitSeg-WebFront' },
        body: JSON.stringify(corpo),
        keepalive: true,
      })
    } catch {
      // medição nunca atrapalha a navegação
    }
  },

  /**
   * Usado pelo TrabalheConoscoCTA (WEB-005).
   * ⚠️ AINDA NÃO EXISTE a function `receber-trabalhe-conosco` no
   * Supabase — vai retornar 404 até ser criada. Destino: tabela
   * `candidatos_recrutamento` (ver observação sobre People Center).
   */
  async submitCandidatura(payload) {
    if (!payload.nome || !payload.email) {
      throw new Error('Campos obrigatórios ausentes: Nome e E-mail são fundamentais.')
    }
    return postToFunction('receber-trabalhe-conosco', payload)
  },

  /**
   * Módulo Referências em Saúde (V1, doc do Chief). Leitura pública,
   * sem autenticação — bate na function `listar-referencias-saude`,
   * já publicada e testada no Supabase.
   *
   * Sem argumentos: lista tudo (exceto MONITORAMENTO/INATIVO).
   * `slug`: busca 1 instituição específica (qualquer status).
   * `regiao`/`especialidade`/`patologia`: filtros combináveis.
   */
  async listarReferenciasSaude({ slug, regiao, tipo, especialidade, patologia } = {}) {
    const params = {}
    if (slug) params.slug = slug
    if (regiao) params.regiao = regiao
    if (tipo) params.tipo = tipo
    if (especialidade) params.especialidade = especialidade
    if (patologia) params.patologia = patologia
    return getFromFunction('listar-referencias-saude', params)
  },
}
