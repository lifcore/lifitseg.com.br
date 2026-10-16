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
  /** `href` quando o contato comercial não é o da home (guias de seguros). */
  cta: { texto: string; destino: 'contato' | 'atendimento'; href?: string }
  /** Vazio = orientação prática da equipe; a página diz isso, sem inventar fonte. */
  fontes: { rotulo: string; url: string }[]
  tema: 'Contratação' | 'Renovação' | 'Rede' | 'Gestão' | 'Atendimento' | 'Conceitos' | 'Vigência' | 'Empresarial' | 'Sinistro'
  area: 'saude' | 'seguros'
  /** Aguardando revisão técnica: aparece só em desenvolvimento, fora do build de produção. */
  revisaoPendente?: boolean
}

export const AREAS_GUIAS = [
  { id: 'saude', titulo: 'Plano de saúde empresarial' },
  { id: 'seguros', titulo: 'Seguros' },
] as const

export const DATA_REVISAO_GUIAS = '2026-10-16'
export const AUTORIA_GUIAS = 'Equipe Lifitseg'

const ANS_REAJUSTE = { rotulo: 'ANS — Reajuste anual de planos coletivos', url: 'https://www.gov.br/ans/pt-br/assuntos/consumidor/reajuste-variacao-de-mensalidade/reajuste-anual-de-planos-coletivos' }

const GUIAS_SAUDE: Omit<Guia, 'area'>[] = [
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

// Segunda coleção (etapa 3): `marketing/entregas/chief-chat/Lifitseg_Guias_Seguros_v1.md`.
// Situações educativas sem casos reais. O guia de seguro empresarial pede
// revisão técnica nas condições do produto antes de publicar (QUADRO).
const SUSEP_AUTO = { rotulo: 'SUSEP — Seguro de automóveis', url: 'https://www.gov.br/susep/pt-br/assuntos/meu-futuro-seguro/seguros-previdencia-e-capitalizacao/seguros/seguro-de-automoveis' }
const SUSEP_RC = { rotulo: 'SUSEP — Seguro de responsabilidade civil', url: 'https://www.gov.br/susep/pt-br/assuntos/meu-futuro-seguro/seguros-previdencia-e-capitalizacao/seguros/seguro-responsabilidade-civil' }
const CONTATO_PESSOAL = '/seguros-pessoais#contato'
const CONTATO_CORPORATIVO = '/seguros-corporativos#contato'

const GUIAS_SEGUROS: Omit<Guia, 'area'>[] = [
  {
    slug: 'comparar-propostas-seguro',
    titulo: 'Como comparar propostas de seguro além do preço',
    resumo: 'Um preço menor pode vir acompanhado de limites, franquias ou condições diferentes. Veja como organizar a comparação.',
    tema: 'Contratação',
    paragrafos: [
      'Comece pelo mesmo risco. Confira se as propostas consideram o mesmo bem, atividade, endereço e uso: uma diferença nesses dados pode comprometer a comparação. Não compare apenas o título comercial do produto.',
      'Organize o que foi contratado. Separe coberturas, limites, sublimites, franquias, exclusões e assistências, e identifique o que existe em uma proposta e não aparece na outra. Quando uma informação estiver pouco clara, peça explicação antes de decidir.',
      'Considere sua participação. Franquias e participações podem alterar o valor suportado pelo segurado em uma ocorrência. Confira se a regra é percentual, fixa ou tem valor mínimo, e a quais coberturas se aplica.',
    ],
    listaTitulo: 'Checklist para a conversa',
    lista: [
      'Quais eventos estão abrangidos?',
      'Quais limites se aplicam e o que não está incluído?',
      'Há obrigações de proteção ou de comunicação?',
      'A assistência atende à rotina?',
      'Preço e condições foram comparados para o mesmo risco?',
    ],
    apoio: 'Situação educativa: duas propostas de auto apresentam preços diferentes, e a comparação revela diferenças na franquia e no limite para terceiros. O aprendizado é colocar essas condições lado a lado antes de decidir. A Lifitseg organiza essa comparação e explica as diferenças, sem garantir que uma alternativa seja melhor para todos os casos.',
    cta: { texto: 'Pedir ajuda para comparar minha proteção', destino: 'contato', href: CONTATO_PESSOAL },
    fontes: [SUSEP_AUTO],
  },
  {
    slug: 'franquia-limite-assistencia',
    titulo: 'Franquia, limite e assistência: três conceitos diferentes',
    resumo: 'Entender essas diferenças ajuda a ler uma proposta e evitar expectativas incorretas.',
    tema: 'Conceitos',
    paragrafos: [
      'Limite é o valor máximo previsto para determinada cobertura ou conjunto, conforme a estrutura contratual. Um limite geral pode conviver com sublimites; consulte a definição e a aplicação no contrato.',
      'Franquia e participação representam a parte prevista para o segurado em determinadas ocorrências. A aplicação varia conforme produto e cobertura; não pressuponha que toda ocorrência usa a mesma regra.',
      'Assistência é o serviço disponibilizado nas condições contratadas, como um atendimento emergencial. Tem escopo, canais e limites próprios, e sua existência não significa que qualquer dano relacionado será indenizado.',
    ],
    listaTitulo: 'Ao ler a proposta, procure',
    lista: [
      'O limite de cada cobertura e eventuais sublimites.',
      'A regra de franquia ou participação e onde ela se aplica.',
      'O escopo e os canais das assistências.',
      'A diferença entre pedir assistência e avisar um sinistro.',
    ],
    apoio: 'Situação educativa: solicitar um serviço de assistência e abrir um aviso de sinistro são caminhos diferentes. A equipe ajuda a identificar o canal adequado e os documentos, sem antecipar cobertura. Para produtos distintos, a apólice e as condições específicas devem ser conferidas.',
    cta: { texto: 'Esclarecer uma condição da minha proposta', destino: 'contato', href: CONTATO_PESSOAL },
    fontes: [SUSEP_AUTO],
  },
  {
    slug: 'atualizar-apolice-endosso',
    titulo: 'Mudou o risco? Entenda a importância de atualizar a apólice',
    resumo: 'Mudanças no uso, nos bens ou na operação podem exigir nova avaliação durante a vigência.',
    tema: 'Vigência',
    paragrafos: [
      'Endereço, atividade, utilização de veículo, inclusão de bens e alterações operacionais são exemplos de mudanças a comunicar. O que é relevante depende do produto e do contrato.',
      'O endosso é o documento utilizado para formalizar alterações no contrato de seguro, conforme as condições aplicáveis. A solicitação não significa que a mudança já foi aceita: pode haver avaliação, documentos e ajuste de prêmio.',
      'Comunique a mudança pelo canal orientado, confira os dados, acompanhe a resposta e guarde os documentos. Não presuma que uma mensagem informal substitui a formalização contratual.',
    ],
    listaTitulo: 'Como se organizar',
    lista: [
      'Identificar o que mudou e desde quando.',
      'Comunicar pelo canal orientado.',
      'Acompanhar a avaliação e eventuais ajustes.',
      'Guardar o endosso emitido com a apólice.',
    ],
    apoio: 'Situação educativa: a operação passa a usar um veículo de forma diferente. O ponto central é informar o novo uso para avaliação, em vez de assumir que a proteção anterior se aplica da mesma maneira. A Lifitseg acompanha esse pedido junto à seguradora; prazos e aceitação dependem de cada contrato.',
    cta: { texto: 'Conversar sobre uma alteração no meu seguro', destino: 'contato', href: CONTATO_PESSOAL },
    fontes: [SUSEP_AUTO],
  },
  {
    slug: 'seguro-empresarial-patrimonio-continuidade',
    titulo: 'Seguro empresarial: patrimônio e continuidade precisam conversar',
    resumo: 'Proteger bens e avaliar os efeitos de uma interrupção são análises relacionadas, com condições próprias.',
    tema: 'Empresarial',
    paragrafos: [
      'Conheça os ativos e a operação. Organize imóveis, equipamentos, mercadorias e valores, considerando os critérios do produto. A descrição da atividade e as medidas de proteção precisam refletir a realidade.',
      'Compare eventos e condições. Confira eventos contratados, limites, franquias e exclusões. Danos elétricos, equipamentos e outras coberturas adicionais não devem ser presumidos a partir do nome do seguro.',
      'Interrupção não é cobertura automática. Lucros cessantes exige contratação e análise próprias, incluindo os eventos que acionam a cobertura, o período e os critérios de apuração. Não significa que qualquer queda de faturamento esteja protegida.',
    ],
    listaTitulo: 'Checklist',
    lista: [
      'Atividade atualizada e valores coerentes.',
      'Dependências críticas da operação.',
      'Coberturas, limites e obrigações.',
      'Impacto de uma paralisação.',
      'Documentos e canais de aviso.',
    ],
    apoio: 'A Lifitseg organiza a leitura dos ativos e da operação e compara condições entre seguradoras parceiras. Aceitação, coberturas e valores dependem da análise de cada seguradora.',
    cta: { texto: 'Avaliar os seguros da empresa', destino: 'contato', href: CONTATO_CORPORATIVO },
    revisaoPendente: true,
    fontes: [],
  },
  {
    slug: 'responsabilidade-civil-atividade',
    titulo: 'Responsabilidade civil: por que a atividade declarada importa',
    resumo: 'Operação, serviço profissional, produtos e administração podem exigir modalidades diferentes.',
    tema: 'Empresarial',
    paragrafos: [
      'O risco precisa ser identificado. Uma reclamação pode estar ligada à atividade, à entrega de um produto ou à atuação profissional. Descrever a operação ajuda a avaliar qual modalidade merece análise.',
      'Modalidades não são intercambiáveis. RC geral, profissional, produtos e D&O têm objetos e condições distintos. Analise quem está segurado, quais atividades estão abrangidas e que danos são considerados.',
      'Leia também a dimensão temporal. Vigência, comunicação da reclamação e outras condições temporais podem ser relevantes. A comparação deve examinar o contrato: não há uma regra única aplicável a toda modalidade.',
    ],
    listaTitulo: 'Perguntas para a análise',
    lista: [
      'Quais atividades a empresa realmente exerce?',
      'Quem precisa estar segurado?',
      'Qual modalidade corresponde a cada risco?',
      'Quais condições temporais o contrato prevê?',
    ],
    apoio: 'Situação educativa: uma empresa amplia seus serviços. O aprendizado é revisar se a nova atividade está corretamente considerada na proteção, sem assumir cobertura automática.',
    cta: { texto: 'Conversar sobre as responsabilidades da operação', destino: 'contato', href: CONTATO_CORPORATIVO },
    fontes: [SUSEP_RC],
  },
  {
    slug: 'sinistro-comunicacao-documentos',
    titulo: 'Sinistro: como organizar a comunicação e os documentos',
    resumo: 'Segurança, canal correto e informações organizadas ajudam a acompanhar a ocorrência.',
    tema: 'Sinistro',
    paragrafos: [
      'Primeiro, cuide da segurança. Siga os canais de emergência adequados e as orientações de assistência do contrato. Não se exponha a risco para registrar imagens ou coletar documentos.',
      'Comunique pelo canal indicado. Consulte a apólice ou a equipe para o aviso, relate os fatos com precisão e guarde protocolo e comprovantes. Os documentos solicitados variam conforme o evento e o produto.',
      'Acompanhe as solicitações. Organize documentos, respostas e pendências. A consultoria pode apoiar a comunicação; a seguradora realiza a análise conforme o contrato e as regras aplicáveis.',
    ],
    listaTitulo: 'O que não antecipar',
    lista: [
      'Cobertura ou valor de indenização a partir de uma descrição inicial.',
      'Autorização de reparos sem a orientação pertinente.',
      'Acordos com terceiros antes de verificar o contrato.',
      'Descarte de bens danificados.',
    ],
    apoio: 'A Lifitseg apoia a comunicação e o acompanhamento da ocorrência, sem antecipar a decisão da seguradora.',
    cta: { texto: 'Preciso de orientação sobre uma ocorrência', destino: 'atendimento' },
    fontes: [SUSEP_AUTO, SUSEP_RC],
  },
]

const TODOS_GUIAS: Guia[] = [
  ...GUIAS_SAUDE.map((g) => ({ ...g, area: 'saude' as const })),
  ...GUIAS_SEGUROS.map((g) => ({ ...g, area: 'seguros' as const })),
]

/** Guias publicáveis: os que aguardam revisão técnica ficam fora do build de produção. */
export const GUIAS: Guia[] = TODOS_GUIAS.filter((g) => !g.revisaoPendente || process.env.NODE_ENV !== 'production')

export function obterGuia(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug)
}
