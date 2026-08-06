// /services/lifcoreApi.js

import { LifCoreConfig } from '../config/lifcore.config.js'

/**
 * @typedef {Object} LifCoreLeadPayload
 * @property {string} origem - Página ou canal de origem (ex: 'home-hero', 'beneficios-pme')
 * @property {string} workspace - Workspace de destino no CRM ('lifitseg-comercial')
 * @property {string} produto - Produto de interesse ('Saúde Empresarial', 'Auto & Frota', etc.)
 * @property {string} empresa - Nome da empresa contratante
 * @property {string} nome - Nome do contato responsável
 * @property {string} telefone - Telefone / WhatsApp com DDD
 * @property {string} email - E-mail corporativo
 * @property {string} cidade - Cidade / UF
 * @property {number} [numeroColaboradores] - Quantidade de vidas/colaboradores (opcional)
 * @property {string} [observacoes] - Notas ou dores descritas pelo lead
 * @property {Object} [utm] - Parâmetros de rastreamento de campanhas
 */

/**
 * Simula a resposta da API em ambiente de desenvolvimento — não depende
 * do backend real do LifCore existir ainda.
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
          message: 'Lead capturado com sucesso (Mock)',
          // bug corrigido: 36 é number, não tem .substring — precisa
          // encadear .toString(36) primeiro, depois .substring()
          leadId: 'lead_mock_' + Math.random().toString(36).substring(2, 9),
        })
      }
    }, 1000)
  })
}

/**
 * Envia dados reais para o ecossistema LifCore.
 *
 * IMPORTANTE (registrado, não escondido): este endpoint ainda não
 * existe no LifCore hoje — o LifCore não tem servidor de API próprio,
 * é um app que fala direto com o Supabase. Antes de sair do modo Mock,
 * alguém precisa publicar uma Supabase Edge Function (mesmo padrão já
 * usado pela `especialista-ia`) que receba este payload e crie o
 * registro real em `clientes_prospects`. Sem isso, `useMock: false`
 * vai falhar com erro de rede, não com erro de validação.
 */
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

/**
 * Serviço central de comunicação com o ecossistema LifCore.
 */
export const lifcoreApi = {
  async submitLead(payload) {
    const endpoint = '/api/leads'

    // Validação estrutural mínima
    if (!payload.nome || !payload.email || !payload.telefone) {
      throw new Error('Campos obrigatórios ausentes: Nome, E-mail e Telefone são fundamentais.')
    }

    try {
      if (LifCoreConfig.useMock) {
        return await mockAdapter(endpoint, payload)
      }
      return await realAdapter(endpoint, payload)
    } catch (error) {
      console.error('[LifCore API Error]:', error)
      throw error
    }
  },
}
