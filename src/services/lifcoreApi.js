// /services/lifcoreApi.js

import { LifCoreConfig } from '../config/lifcore.config.js'

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

export const lifcoreApi = {
  /**
   * Usado pelo LeadModal (via useLifCoreLead). Bate na function
   * `receber-lead-site`, já publicada e testada no Supabase — cria
   * cliente/prospect + contato primário de verdade.
   */
  async submitLead(payload) {
    if (!payload.nome || !payload.email || !payload.telefone) {
      throw new Error('Campos obrigatórios ausentes: Nome, E-mail e Telefone são fundamentais.')
    }
    return postToFunction('receber-lead-site', payload)
  },

  /**
   * Usado pelo ContatoForm (WEB-005, "Fale com a LifitSeg").
   * ⚠️ AINDA NÃO EXISTE a function `receber-fale-conosco` no
   * Supabase — vai retornar 404 até alguém criá-la (mesmo padrão de
   * segurança/estrutura de `receber-lead-site`, adaptado pros campos
   * do ContatoForm: assunto, mensagem, sem numeroColaboradores).
   */
  async submitContato(payload) {
    if (!payload.nome || !payload.email) {
      throw new Error('Campos obrigatórios ausentes: Nome e E-mail são fundamentais.')
    }
    return postToFunction('receber-fale-conosco', payload)
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
}
