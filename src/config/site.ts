// src/config/site.ts
//
// Ponto único de verdade pros dados institucionais da LifitSeg.
// Header, Footer, SEO (metadata) e qualquer página futura consomem
// daqui — nunca escrevem telefone/e-mail/endereço direto no componente.

export const siteConfig = {
  nome: 'LifitSeg',
  nomeCompleto: 'LifitSeg Consultoria & Corretagem de Seguros',
  tagline: 'Consultoria & Riscos',
  descricao:
    'A estratégia certa para proteger pessoas, empresas e patrimônios começa com um bom diagnóstico.',

  url: 'https://www.lifitseg.com.br',

  contato: {
    email: 'atendimento@lifitseg.com.br',
    whatsapp: '5511940543808', // formato internacional, sem símbolos — pronto pro link wa.me
    whatsappExibicao: '(11) 94054-3808',
  },

  endereco: {
    linha1: 'Rua Bom J. de Pirapora, 1018 - Andar 2',
    bairro: 'Jardim Petrópolis',
    cidade: 'Jundiaí',
    uf: 'SP',
    cep: '13207-605',
    completo:
      'Rua Bom J. de Pirapora, 1018 - Andar 2 - Jardim Petrópolis, Jundiaí/SP - CEP 13207-605',
  },

  juridico: {
    cnpj: '43.609.696/0001-60',
    registroSusep: '232149012',
  },

  redesSociais: {
    // preencher quando existirem — mantido vazio de propósito, não inventado
    instagram: '',
    linkedin: '',
  },
} as const
