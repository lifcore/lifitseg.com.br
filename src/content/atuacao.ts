// src/content/atuacao.ts
//
// Conteúdo técnico da atuação da Lifitseg (M-27 / D-36). Redação do Chief
// Chat: `marketing/entregas/chief-chat/Lifitseg_Site_Servicos_Confirmados_v1.md`
// (serviços confirmados por Raphael em 16/10/2026) e
// `Lifitseg_Site_Etapa2_Conteudo_Tecnico_v1.md`. Fonte única para a home e a
// página de Benefícios Corporativos. Mudanças de promessa, oferta,
// argumento, tom ou CTA voltam ao Chat (PROTOCOLO, seção 1).

export const POSICIONAMENTO = 'Consultoria na contratação. Parceria na gestão.'

/** Informado por Raphael em 16/10/2026; conferir a quantidade vigente antes de atualizar. */
export const CARTEIRA =
  'Nossa carteira reúne mais de 100 empresas, de pequenas operações a organizações corporativas. A atuação acompanha a realidade de cada cliente, com serviços definidos conforme as necessidades e o escopo contratado.'

export const FAIXAS_DETALHE = [
  {
    valor: '2-29',
    segmento: 'PME',
    titulo: '2 a 29 vidas',
    subtitulo: 'Clareza desde a primeira análise.',
    texto:
      'Entenda os requisitos da contratação e compare condições pertinentes ao cenário da empresa. Na revisão de um benefício existente, é importante compreender as regras do contrato e as alternativas disponíveis.',
    cta: 'Conhecer as possibilidades',
  },
  {
    valor: '30-99',
    segmento: 'PME',
    titulo: '30 a 99 vidas',
    subtitulo: 'Critérios alinhados entre quem decide.',
    texto:
      'Organize a avaliação com RH, financeiro e direção. A discussão reúne necessidades da equipe, condições dos produtos e prioridades do orçamento, sem presumir que propostas de preço parecido sejam equivalentes.',
    cta: 'Organizar minha avaliação',
  },
  {
    valor: '100+',
    segmento: 'PJ / Corporativo',
    titulo: '100+ vidas',
    subtitulo: 'Planejamento e visão da operação.',
    texto:
      'Uma operação maior pode exigir diferentes interlocutores e uma discussão mais estruturada sobre acompanhamento do benefício. A análise considera o cenário real e o escopo de apoio que a empresa precisa contratar.',
    cta: 'Conversar sobre a operação',
  },
] as const

export const PERGUNTAS_DIAGNOSTICO = [
  'A empresa está contratando pela primeira vez, revendo alternativas ou se preparando para renovar?',
  'Em quais municípios e localidades o benefício precisa fazer sentido para a operação?',
  'Quais critérios de rede, acomodação, abrangência e coparticipação precisam entrar na comparação?',
  'Quem participa da decisão e como o orçamento será avaliado?',
  'Quais dúvidas sobre o contrato atual ainda precisam ser esclarecidas?',
  'Que acompanhamento o RH e a administração esperam depois da contratação?',
]

export const METODO = [
  {
    titulo: 'Diagnóstico empresarial e contratual',
    texto: 'Entendemos o perfil da operação, as necessidades de apoio e as condições do benefício atual, quando houver.',
    considerado:
      'Quantidade aproximada de vidas, localização, objetivo e momento do benefício. Quando já existe contrato, identificamos quais condições precisam ser compreendidas.',
  },
  {
    titulo: 'Comparação e estruturação',
    texto: 'Organizamos critérios e alternativas para discutir a contratação ou revisão com RH, financeiro e direção.',
    considerado:
      'Rede do produto, abrangência, acomodação, participação nas despesas, reembolso quando previsto e condições de ingresso. O objetivo é evitar uma comparação baseada apenas no nome da operadora ou na mensalidade.',
  },
  {
    titulo: 'Negociação e decisão',
    texto: 'Apoiamos a interlocução e a compreensão das condições da proposta antes da escolha.',
    considerado:
      'Os pontos de atenção e as informações que precisam ser confirmadas antes da escolha. RH, financeiro e direção devem entender as premissas da proposta e o que está sendo contratado.',
  },
  {
    titulo: 'Implantação e orientação',
    texto: 'Alinhamos informações, comunicação e encaminhamentos de implantação conforme o serviço previsto.',
    considerado: 'Documentação, comunicação aos beneficiários e responsabilidades de atendimento.',
  },
  {
    titulo: 'Gestão contínua',
    texto: 'Acompanhamos rotinas, demandas, indicadores e renovação, com ações presenciais e educativas quando contratadas.',
    considerado: 'Canais, responsabilidades e próximos passos combinados conforme os serviços contratados.',
  },
]

export const FRENTES_GESTAO = [
  {
    id: 'contratacao',
    titulo: 'Contratação e análise contratual',
    texto:
      'Comparamos alternativas e analisamos condições relevantes ao perfil da empresa. Rede do produto, abrangência, acomodação, participação nas despesas e condições contratuais entram na conversa para que a escolha seja compreendida por quem decide.',
  },
  {
    id: 'renovacao',
    titulo: 'Renovação e negociação',
    texto:
      'Organizamos informações do contrato e apoiamos a análise e a negociação das condições de renovação. A interlocução é técnica e considera o contexto da empresa, sem prometer redução ou resultado previamente definido.',
  },
  {
    id: 'rotina',
    titulo: 'Rotina operacional do benefício',
    texto:
      'Apoiamos inclusões, exclusões e demais movimentações previstas no serviço, além da conferência de faturas e do acompanhamento de divergências. RH e administração contam com uma consultoria próxima para organizar encaminhamentos e próximos passos.',
  },
  {
    id: 'beneficiario',
    titulo: 'Apoio ao beneficiário',
    texto:
      'Orientamos e acompanhamos demandas relacionadas a atendimento, reembolso e autorizações. Quando há dificuldades ou recusas, analisamos as informações disponíveis e apoiamos a interlocução com os responsáveis pelo caso.',
  },
  {
    id: 'indicadores',
    titulo: 'Sinistralidade e indicadores',
    texto:
      'A gestão também considera indicadores do contrato, conforme dados disponíveis e tratamento adequado das informações. Relatórios e comitês ajudam a organizar a discussão sobre utilização, custos e planejamento do benefício, sem substituir avaliação clínica ou prometer antecipar resultados.',
  },
  {
    id: 'presenca',
    titulo: 'Presença e comunicação',
    texto:
      'Realizamos workshops, palestras e trabalho in company para aproximar a gestão da rotina da empresa. As ações são alinhadas ao contexto do cliente e ao escopo contratado, com foco na compreensão do benefício e nos canais de apoio.',
  },
]

export const COMPLEXIDADE = {
  titulo: 'Demandas complexas exigem análise e acompanhamento próximo.',
  paragrafos: [
    'Nem toda situação se resolve com um encaminhamento padrão. Em casos de maior complexidade, a Lifitseg reúne as informações pertinentes, analisa as dificuldades de atendimento e coordena a interlocução com os envolvidos para buscar alternativas de encaminhamento.',
    'A atuação da consultoria apoia empresa e beneficiário, respeitando as responsabilidades da operadora, dos prestadores e dos profissionais assistenciais. Autorizações, coberturas, reembolsos e decisões clínicas não são garantidos pela consultoria.',
  ],
}

export const CRITERIOS = [
  { criterio: 'Rede do produto', texto: 'Hospitais, clínicas, laboratórios e profissionais devem ser conferidos para o produto específico e na informação atual da operadora.', pergunta: 'Quais prestadores e localidades precisam ser verificados?' },
  { criterio: 'Abrangência', texto: 'O alcance geográfico faz parte das condições do produto e precisa dialogar com a operação da empresa.', pergunta: 'A proposta contempla as localidades relevantes?' },
  { criterio: 'Acomodação', texto: 'A modalidade de acomodação prevista deve estar identificada na comparação.', pergunta: 'As propostas usam a mesma condição de acomodação?' },
  { criterio: 'Coparticipação e franquia', texto: 'Quando previstas, exigem leitura das condições de participação nas despesas. Não comparar apenas o valor fixo da mensalidade.', pergunta: 'Quais cobranças e condições estão descritas?' },
  { criterio: 'Reembolso', texto: 'Quando previsto, deve ser avaliado conforme critérios, documentação e limites do produto.', pergunta: 'Qual é a condição aplicável à proposta?' },
  { criterio: 'Elegibilidade', texto: 'Requisitos de vínculo e ingresso precisam ser conferidos para empresa e beneficiários.', pergunta: 'Quem pode participar segundo as regras aplicáveis?' },
  { criterio: 'Carência e transição', texto: 'A entrada no novo contrato exige verificar condições e prazos aplicáveis; troca não significa dispensa automática.', pergunta: 'O ingresso está dentro das condições que permitem dispensa?' },
  { criterio: 'Reajuste', texto: 'É necessário distinguir o tipo de variação e a regra contratual aplicável.', pergunta: 'Qual é a metodologia e o período de análise?' },
  { criterio: 'Rotina de gestão', texto: 'Canais, responsabilidades e serviços de acompanhamento devem ser definidos.', pergunta: 'Quem recebe e acompanha cada demanda?' },
]

export const EXEMPLOS_EDUCATIVOS = [
  {
    titulo: 'Renovar sem comparar apenas o percentual',
    necessidade: 'Uma empresa quer compreender a proposta de renovação antes de decidir.',
    analise: 'Condições atuais, proposta recebida, premissas, alternativas disponíveis e mudanças que podem afetar a comparação.',
    apoio: 'Organizar informações, confirmar condições e discutir cenários com os responsáveis pela decisão.',
    aprendizado: 'A decisão envolve o contrato como um todo. Uma eventual oferta de produto complementar deve ser avaliada por sua utilidade e condições, não assumida como solução obrigatória para negociar.',
    limite: 'Não há promessa de desconto, redução do reajuste ou economia.',
  },
  {
    titulo: 'Uma solicitação de reembolso com pendências',
    necessidade: 'Uma pessoa precisa entender quais informações são necessárias para acompanhar uma solicitação.',
    analise: 'Condições aplicáveis, documentos requeridos, protocolo e resposta da operadora.',
    apoio: 'Orientar o encaminhamento e ajudar a esclarecer pendências administrativas no canal adequado.',
    aprendizado: 'Expectativa de reembolso e valor aprovado são coisas diferentes. Organizar o processo ajuda a compreender a análise, mas não garante pagamento.',
  },
  {
    titulo: 'Uma resposta de recusa que precisa ser compreendida',
    necessidade: 'A pessoa não entende o motivo da resposta recebida e busca orientação sobre próximos passos.',
    analise: 'Conteúdo da solicitação, justificativa, protocolos e informações pertinentes, preservadas em canal reservado.',
    apoio: 'Organizar a demanda e acompanhar interlocução e caminhos de esclarecimento ou reanálise, conforme o caso.',
    aprendizado: 'Reanálise não equivale a aprovação. O apoio administrativo não substitui decisões clínicas nem restringe acesso aos canais oficiais competentes.',
  },
  {
    titulo: 'Rever alternativas sem perder de vista a operação',
    necessidade: 'Uma empresa deseja avaliar alternativas e compreender os impactos de uma possível mudança.',
    analise: 'Critérios do produto, rede e localidades relevantes, condições financeiras e rotina de gestão.',
    apoio: 'Mostrar premissas, diferenças e pontos pendentes, para que o preço não seja o único argumento da discussão.',
    aprendizado: 'Mudar e permanecer são cenários a avaliar, não respostas prontas. Condições aparentemente semelhantes podem esconder diferenças relevantes.',
    limite: 'Não se afirma economia ou equivalência de rede garantida.',
  },
  {
    titulo: 'Indicadores que precisam de contexto',
    necessidade: 'Gestores recebem um relatório e querem entender o que ele permite discutir sobre o benefício.',
    analise: 'Origem dos dados, período, método, comparabilidade e informações ausentes.',
    apoio: 'Estruturar leitura e recomendações com limites explícitos, conforme dados e escopo disponíveis.',
    aprendizado: 'Um percentual isolado não explica toda a operação, não prevê sozinho o reajuste e não justifica expor situações individuais de saúde.',
  },
]

export const EQUIPE = {
  titulo: 'Conhecimento técnico com relacionamento próximo.',
  texto:
    'Nossa equipe reúne atuação comercial, técnica e de atendimento para apoiar a empresa na escolha e na gestão do benefício. A proposta é trabalhar junto ao RH, à administração e aos beneficiários, com responsabilidades e canais definidos.',
}

/** Link existente das avaliações; destino conferido em 16/10/2026 (perfil Lifitseg Benefícios). Sem nota numérica até conferir na fonte. */
export const LINK_AVALIACOES_GOOGLE = 'https://share.google/lQoH1vfK1Kqz2W04m'

export const FAQ_HOME = [
  { q: 'Minha empresa ainda não tem plano. Podemos conversar?', a: 'Sim. Podemos começar pela primeira contratação ou pela revisão de um benefício existente. Produtos e condições disponíveis são conferidos conforme o cenário da empresa.' },
  { q: 'A Lifitseg atua apenas na venda do plano?', a: 'Não. A consultoria atua na contratação e na gestão, com serviços operacionais, orientação, acompanhamento e análise técnica conforme o escopo contratado.' },
  { q: 'Como saber quais alternativas considerar?', a: 'Município, quantidade aproximada de vidas, objetivos e critérios de contratação ajudam a orientar a análise. A avaliação comercial confirma os requisitos de cada produto.' },
  { q: 'A Lifitseg trabalha com uma única operadora?', a: 'O foco da Lifitseg é o conhecimento técnico para orientar a decisão empresarial. As alternativas disponíveis são apresentadas conforme o perfil da empresa e o portfólio comercial confirmado.' },
  { q: 'Há trabalho dentro da empresa?', a: 'Sim. A atuação pode incluir acompanhamento in company, workshops e palestras, alinhados às necessidades e ao serviço contratado.' },
  { q: 'Vocês apoiam dificuldades de atendimento e recusas?', a: 'Sim. Analisamos as informações pertinentes e apoiamos os encaminhamentos e a interlocução. A consultoria não garante autorizações, cobertura ou reversão de decisões.' },
  { q: 'O apoio atende empresas pequenas e corporativas?', a: 'A carteira da Lifitseg reúne empresas de diferentes portes. A conversa considera as faixas de vidas e, principalmente, as necessidades reais da operação.' },
  { q: 'Preciso enviar informações de saúde no primeiro contato?', a: 'Não. O formulário inicial trata do cenário empresarial e dos dados de contato. Não envie diagnósticos, exames ou histórico médico nesse canal.' },
  { q: 'A gestão está incluída em toda contratação?', a: 'O escopo de acompanhamento deve ser confirmado na proposta de atendimento. A equipe explica quais serviços se aplicam à sua empresa antes da contratação.' },
]

const ANS_CARENCIA = 'https://www.gov.br/ans/pt-br/assuntos/consumidor/carencia'
const ANS_REAJUSTE = 'https://www.gov.br/ans/pt-br/assuntos/consumidor/reajuste-variacao-de-mensalidade/reajuste-anual-de-planos-coletivos'

/** FAQ aprofundado da página de Benefícios Corporativos, com fontes públicas da ANS (consultadas em 16/10/2026). */
export const FAQ_BENEFICIOS: { q: string; a: string; fonte?: { rotulo: string; url: string } }[] = [
  { q: 'Ter CNPJ é suficiente para contratar?', a: 'Requisitos de contratação e vínculos elegíveis devem ser conferidos para o produto. A existência de CNPJ, isoladamente, não confirma toda a elegibilidade.' },
  { q: 'Toda proposta da mesma operadora oferece a mesma rede?', a: 'A conferência é feita para o produto específico e sua informação atual. A marca não substitui essa verificação.' },
  { q: 'Trocar de plano elimina carências?', a: 'Não automaticamente. A análise deve verificar regras e condições de ingresso aplicáveis.' },
  { q: '30 vidas significam isenção de carência sem condições?', a: 'Não. A ANS informa hipótese de dispensa para planos coletivos empresariais com 30 ou mais beneficiários quando o ingresso é solicitado dentro do prazo previsto. A condição e o enquadramento precisam ser conferidos.', fonte: { rotulo: 'ANS — Carência', url: ANS_CARENCIA } },
  { q: 'As três faixas têm o mesmo reajuste?', a: 'As faixas do site organizam nossa comunicação. A ANS descreve regras de reajuste para contratos coletivos, inclusive agrupamento dos contratos com menos de 30 beneficiários, observadas as regras aplicáveis. Uma taxa de referência não é previsão para toda empresa.', fonte: { rotulo: 'ANS — Reajuste anual de planos coletivos', url: ANS_REAJUSTE } },
  { q: 'Quem acompanha uma demanda junto à operadora?', a: 'Os canais e responsabilidades de apoio são alinhados conforme o serviço contratado. A atuação da consultoria não substitui as decisões e obrigações da operadora.' },
]
