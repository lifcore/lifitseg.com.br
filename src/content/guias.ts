// src/content/guias.ts
//
// Primeira coleção de guias para o cliente (M-27). Redação do Chief Chat:
// `marketing/entregas/chief-chat/Lifitseg_Guias_Conhecimento_Cliente_v1.md`.
// Metadados internos (IDs da biblioteca, casos de origem) NÃO entram aqui.
// Exemplos sem nomes reais. Conteúdo educativo: não é canal de urgência nem
// formulário para dados médicos.

export type Guia = {
  slug: string
  titulo: string
  resumo: string
  paragrafos: string[]
  listaTitulo: string
  lista: string[]
  apoio: string
  cta: { texto: string; destino: 'contato' | 'atendimento' }
  fontes: { rotulo: string; url: string }[]
  tema: 'Contratação' | 'Renovação' | 'Rede' | 'Gestão' | 'Atendimento'
}

export const DATA_REVISAO_GUIAS = '2026-10-16'
export const AUTORIA_GUIAS = 'Equipe Lifitseg'

const ANS_REAJUSTE = { rotulo: 'ANS — Reajuste anual de planos coletivos', url: 'https://www.gov.br/ans/pt-br/assuntos/consumidor/reajuste-variacao-de-mensalidade/reajuste-anual-de-planos-coletivos' }

export const GUIAS: Guia[] = [
  {
    slug: 'como-comparar-propostas-de-plano-empresarial',
    titulo: 'Como comparar propostas de plano empresarial',
    resumo: 'A mensalidade é importante, mas precisa vir acompanhada do produto, das condições e do contexto da empresa.',
    tema: 'Contratação',
    paragrafos: [
      'Uma comparação útil começa por tornar claras as diferenças entre propostas. A mensalidade é uma informação importante, mas precisa ser acompanhada do produto, das condições e do contexto da empresa.',
      'Organize os critérios em quatro grupos: contratação, assistência, despesas e operação. Na contratação, confira quem pode ingressar e quais informações precisam ser apresentadas. Na assistência, considere o produto específico, as localidades relevantes e as condições informadas de rede e acomodação. Nas despesas, coloque lado a lado mensalidade, coparticipação e franquia quando previstas. Na operação, pergunte como funcionam os canais de relacionamento e o acompanhamento contratado.',
      'Não preencha uma informação ausente por suposição. Marque o ponto como pendente e solicite esclarecimento. Uma proposta de marca conhecida pode ter condições diferentes de outro produto da mesma empresa.',
    ],
    listaTitulo: 'Perguntas para levar à análise',
    lista: [
      'Estamos comparando produtos e premissas identificados?',
      'O que foi confirmado e o que ainda está pendente?',
      'As localidades relevantes à operação foram consideradas?',
      'As responsabilidades após a contratação estão claras?',
    ],
    apoio: 'A consultoria organiza critérios e explica diferenças relevantes para a decisão, conforme o cenário informado. O objetivo é tornar a discussão compreensível para RH, financeiro e direção, sem garantir uma alternativa universalmente melhor.',
    cta: { texto: 'Converse sobre os critérios da sua empresa', destino: 'contato' },
    fontes: [],
  },
  {
    slug: 'o-que-organizar-antes-da-renovacao',
    titulo: 'O que organizar antes da renovação',
    resumo: 'Renovar envolve mais do que receber um percentual e escolher entre aceitar ou trocar.',
    tema: 'Renovação',
    paragrafos: [
      'Renovar um benefício envolve mais do que receber um percentual e escolher entre aceitar ou trocar. Antes de decidir, organize as informações do contrato, a comunicação recebida e as necessidades da empresa.',
      'Comece pelo período da renovação, pelos responsáveis da decisão e pelos critérios que precisam ser revistos. Separe condição atual, proposta de renovação e alternativas eventualmente avaliadas. Ao construir cenários, registre mudanças simultâneas: quantidade de vidas, produto, rede, participação nas despesas e demais condições pertinentes.',
      'Um valor final menor não explica, sozinho, o que mudou. A comparação deve mostrar o efeito das diferenças e as pendências que precisam de resposta. Da mesma forma, uma comunicação de reajuste deve ser entendida em seu contexto contratual; não se deve aplicar automaticamente a regra de outro tipo de plano.',
    ],
    listaTitulo: 'Checklist de preparação',
    lista: [
      'Contrato e proposta atualizados, em canal reservado.',
      'Comunicação de renovação e dúvidas registradas.',
      'Critérios e responsáveis internos definidos.',
      'Cenários com premissas identificadas.',
    ],
    apoio: 'A Lifitseg organiza a análise e apoia a interlocução e a negociação das condições, conforme o serviço contratado. Isso não representa garantia de redução, manutenção de qualquer condição ou aprovação de proposta.',
    cta: { texto: 'Organize sua próxima renovação com a Lifitseg', destino: 'contato' },
    fontes: [ANS_REAJUSTE],
  },
  {
    slug: 'rede-assistencial-o-produto-importa',
    titulo: 'Rede assistencial: o produto importa',
    resumo: 'Reconhecer um hospital em uma lista não confirma que ele esteja disponível em qualquer plano de uma operadora.',
    tema: 'Rede',
    paragrafos: [
      'Reconhecer um hospital ou laboratório em uma lista não confirma que ele esteja disponível em qualquer plano de uma operadora. A conferência precisa considerar o produto específico, a localidade e a informação atual aplicável à proposta ou ao contrato.',
      'Antes de comparar alternativas, liste as localidades relevantes à operação e os critérios que precisam ser verificados. Evite partir apenas de uma marca: propostas diferentes podem exigir consultas próprias de rede e condições.',
      'O diretório de referências da Lifitseg ajuda a organizar a pesquisa e as perguntas. Ele não substitui a confirmação da rede junto à operadora nem representa promessa de cobertura. A lista também não comprova disponibilidade de agenda ou autorização para um atendimento específico.',
    ],
    listaTitulo: 'Perguntas úteis',
    lista: [
      'Qual é o nome e a identificação do produto em análise?',
      'Quais localidades precisam ser consideradas?',
      'A informação de rede está atualizada e se aplica ao produto?',
      'Quais pontos ainda dependem de confirmação da operadora?',
    ],
    apoio: 'A consultoria organiza a discussão sobre rede, localização e condições, com encaminhamento das conferências pertinentes. Informações clínicas individuais, quando necessárias ao atendimento específico, devem seguir o canal reservado adequado, não um formulário público.',
    cta: { texto: 'Converse sobre as localidades e os critérios da sua empresa', destino: 'contato' },
    fontes: [],
  },
  {
    slug: 'sinistralidade-perguntas-antes-de-concluir',
    titulo: 'Sinistralidade: perguntas antes de concluir',
    resumo: 'Um indicador isolado não descreve toda a situação de um contrato.',
    tema: 'Gestão',
    paragrafos: [
      'Um indicador isolado não descreve toda a situação de um contrato. Para discutir sinistralidade com responsabilidade, é necessário entender a informação utilizada, o período observado, a metodologia e as condições que tornam os números comparáveis.',
      'A conversa gerencial deve distinguir dado observado, interpretação e recomendação. Perguntas úteis incluem: a série está completa? Há diferenças de período ou composição? O que o relatório permite concluir e quais informações continuam ausentes?',
      'Uma apresentação executiva pode organizar cenário, evidências, limitações e próximos passos. Não deve transformar correlação em causa comprovada nem uma leitura histórica em previsão garantida de reajuste. Informações de saúde exigem finalidade, acesso e tratamento adequados; conteúdo de comunicação não deve expor pessoas ou casos individuais.',
    ],
    listaTitulo: 'Para uma reunião mais objetiva',
    lista: [
      'Identifique a origem e a data dos dados.',
      'Explique a metodologia considerada.',
      'Separe observação de hipótese.',
      'Relacione recomendações ao escopo da gestão.',
    ],
    apoio: 'A atuação pode incluir leitura de indicadores, relatórios, comitês e discussão de renovação, conforme dados disponíveis e serviço contratado. O propósito é apoiar decisões empresariais, sem substituir avaliação clínica ou garantir redução de custos.',
    cta: { texto: 'Converse sobre a gestão dos indicadores do benefício', destino: 'contato' },
    fontes: [],
  },
  {
    slug: 'reembolso-organize-a-solicitacao',
    titulo: 'Reembolso: organize a solicitação e a expectativa',
    resumo: 'Não se deve presumir que qualquer despesa particular será restituída integralmente.',
    tema: 'Atendimento',
    paragrafos: [
      'Uma solicitação de reembolso precisa ser analisada conforme a situação, as condições aplicáveis e a documentação exigida. Não se deve presumir que qualquer despesa particular será restituída integralmente.',
      'Antes de encaminhar a solicitação, confira as orientações do produto, os documentos requeridos e os canais da operadora. Guarde os registros do envio e as respostas recebidas. Se houver pendência, procure compreender exatamente qual informação foi solicitada, evitando envios sucessivos sem esclarecimento.',
      'As hipóteses de reembolso não se resumem à livre escolha prevista em contrato. Há situações regidas por normas específicas; por isso, o atendimento concreto deve ser conferido individualmente. O guia da ANS é fonte pública para entender essas diferenças, não uma garantia de valor para qualquer pedido.',
    ],
    listaTitulo: 'Perguntas para o acompanhamento',
    lista: [
      'Qual condição se aplica a esta solicitação?',
      'Os documentos e o canal foram conferidos?',
      'Há protocolo e resposta com pendências claras?',
      'O valor esperado foi distinguido do valor efetivamente aprovado?',
    ],
    apoio: 'A consultoria orienta a organização documental e acompanha encaminhamentos administrativos conforme o escopo do serviço. Não garante aprovação ou pagamento. Documentos privados não devem ser enviados em comentários de redes ou formulários públicos.',
    cta: { texto: 'Procure o canal de atendimento da Lifitseg para orientação', destino: 'atendimento' },
    fontes: [{ rotulo: 'ANS — Reembolso', url: 'https://www.gov.br/ans/pt-br/assuntos/consumidor/o-que-o-seu-plano-de-saude-deve-cobrir-1/reembolso' }],
  },
  {
    slug: 'dificuldade-de-atendimento-ou-recusa',
    titulo: 'Dificuldade de atendimento ou recusa: como organizar a análise',
    resumo: 'É importante distinguir pendência de informação, resposta administrativa e decisão comunicada pela operadora.',
    tema: 'Atendimento',
    paragrafos: [
      'Uma resposta que o beneficiário não compreende precisa ser esclarecida no contexto da solicitação. É importante distinguir pendência de informação, resposta administrativa e decisão comunicada pela operadora, sem presumir previamente a causa ou o resultado.',
      'Organize a solicitação, os protocolos e a resposta recebida em canal reservado. A análise administrativa busca compreender os motivos apresentados, as informações pertinentes e os caminhos de esclarecimento ou reanálise aplicáveis. Os canais oficiais da operadora e da ANS permanecem disponíveis conforme o caso; orientação da consultoria não significa abrir mão de direitos nem esperar indefinidamente por uma solução interna.',
      'A atuação da Lifitseg pode envolver orientação, organização e acompanhamento da interlocução, inclusive em situações complexas. Ela não substitui o profissional assistente, não garante cobertura e não promete reverter uma decisão. Em urgência, procure os canais assistenciais adequados: o conteúdo educativo não é serviço de emergência.',
    ],
    listaTitulo: 'O que ajuda a esclarecer o processo',
    lista: [
      'Entender exatamente a solicitação e a resposta.',
      'Identificar protocolos e informações pendentes.',
      'Conhecer os canais aplicáveis ao caso.',
      'Acompanhar encaminhamentos sem divulgar dados pessoais.',
    ],
    apoio: 'A Lifitseg orienta, organiza e acompanha a interlocução, conforme o serviço contratado, sem garantir cobertura ou reversão de decisões.',
    cta: { texto: 'Fale com o canal de atendimento para orientar o encaminhamento', destino: 'atendimento' },
    fontes: [{ rotulo: 'ANS — Reclamações e NIP', url: 'https://www.gov.br/ans/pt-br/assuntos/consumidor/notificacao-de-intermediacao-preliminar-nip' }],
  },
]

export function obterGuia(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug)
}
