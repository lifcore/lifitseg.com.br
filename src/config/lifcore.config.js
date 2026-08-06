// /config/lifcore.config.js

const ENV = process.env.NODE_ENV || 'development'

// TODO (confirmar com Raphael/Chief): assumindo que existe UM único
// projeto Supabase do LifCore, usado nos 3 ambientes. Se dev/staging
// tiverem projetos Supabase separados no futuro, troque o baseUrl de
// cada bloco abaixo pela URL do projeto correspondente.
const SUPABASE_FUNCTIONS_URL = 'https://yabzcdxzmtkwuljgfqcw.supabase.co/functions/v1'

const CONFIGS = {
  development: {
    baseUrl: SUPABASE_FUNCTIONS_URL,
    useMock: true, // Mantém mock em dev local — não precisa gastar chamada real toda hora
    timeout: 10000,
  },
  staging: {
    baseUrl: SUPABASE_FUNCTIONS_URL,
    useMock: false,
    timeout: 10000,
  },
  production: {
    baseUrl: SUPABASE_FUNCTIONS_URL,
    useMock: false,
    timeout: 8000,
  },
}

export const LifCoreConfig = CONFIGS[ENV]
