// src/config/site.ts
//
// Ponto único de verdade pros dados institucionais da LifitSeg.
// Header, Footer, SEO (metadata) e qualquer página futura consomem
// daqui — nunca escrevem telefone/e-mail/endereço direto no componente.

export const siteConfig = {
  nome: 'Lifitseg', // grafia editorial da nova comunicação (Chat, Diretriz Central)
  nomeCompleto: 'LifitSeg Consultoria & Corretagem de Seguros',
  tagline: 'Planos de saúde empresariais',
  // Home v3 do Chat (M-21): conhecimento técnico para a decisão empresarial.
  descricao:
    'Conhecimento técnico para compreender alternativas, contratar e planejar a gestão do plano de saúde empresarial da sua empresa.',
  descricaoCurta: 'Conhecimento técnico em planos de saúde empresariais.',

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

  // URLs informadas por Raphael e conferidas em 16/10/2026 (respondem 200).
  redesSociais: {
    instagram: 'https://www.instagram.com/lifitseg/',
    facebook: 'https://www.facebook.com/lifitsegbeneficios/',
    linkedin: 'https://br.linkedin.com/company/lifitseg-consultoria-de-benef%C3%ADcios-ltda',
  },
} as const
