// /config/lifcore.config.js

const ENV = process.env.NODE_ENV || 'development'

const CONFIGS = {
  development: {
    baseUrl: 'https://api-dev.lifcore.com.br',
    useMock: true, // Ativa o Adapter em modo Mock para testes locais
    timeout: 10000,
  },
  staging: {
    baseUrl: 'https://api-staging.lifcore.com.br',
    useMock: false,
    timeout: 10000,
  },
  production: {
    baseUrl: 'https://api.lifcore.com.br',
    useMock: false,
    timeout: 8000,
  },
}

export const LifCoreConfig = CONFIGS[ENV]
