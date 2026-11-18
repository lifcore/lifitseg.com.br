// Páginas por segmento empresarial (/empresas/mei, /empresas/pme, /empresas/rh). Textos aprovados por Raphael em
// 18/11/2026 (direcionamento do Claude sobre o do Chief). Anúncio de saúde é sempre empresarial; as páginas não trazem
// preço, percentual de economia, depoimento ou regra de operadora específica. Regras da ANS conferidas em 18/11/2026
// (empresário individual, atualizada em 07/10/2026; reajuste de planos coletivos). Conferir de novo ao mudar o texto.
import type { Duvida } from '@/components/home/DuvidasHome'
import type { OpcaoObjetivo } from '@/components/forms/FormularioEmpresarial'

const ANS_EMPRESARIO_INDIVIDUAL = 'https://www.gov.br/ans/pt-br/assuntos/contratacao-e-troca-de-plano/dicas-de-como-escolher-um-plano-de-saude-1/formas-de-contratacao-de-planos-de-saude-1/planos-coletivos-empresariais-contratados-por-empresario-individual'
const ANS_CARENCIA = 'https://www.gov.br/ans/pt-br/assuntos/consumidor/carencia'
const ANS_REAJUSTE = 'https://www.gov.br/ans/pt-br/assuntos/consumidor/reajuste-variacao-de-mensalidade/reajuste-anual-de-planos-coletivos'

export type Segmento = {
  rota: string
  pontoEntrada: string
  meta: { titulo: string; descricao: string }
  eyebrow: string
  titulo: string
  destaque: string
  intro: string
  cta: string
  criterios: { titulo: string; texto: string }[]
  tituloCriterios: string
  linhaDoTempo?: { titulo: string; passos: string[]; nota: string }
  entrega: { titulo: string; itens: { rotulo: string; titulo: string; texto: string }[]; nota?: string }
  duvidas: Duvida[]
  formulario: { titulo: string; texto: string; objetivos: OpcaoObjetivo[]; mensagemSucesso: string; mostrarMesRenovacao?: boolean; semCnpj?: string }
}

export const SEGMENTOS: Record<'mei' | 'pme' | 'rh', Segmento> = {
  mei: {
    rota: '/empresas/mei',
    pontoEntrada: 'empresas-mei',
    meta: {
      titulo: 'Plano de saúde pelo MEI: regras claras antes de contratar',
      descricao: 'Plano de saúde empresarial para MEI e empresário individual: o que precisa estar certo antes da proposta, quem pode ser incluído e como comparar as opções da sua região.',
    },
    eyebrow: 'MEI e empresário individual',
    titulo: 'Plano de saúde pelo seu MEI,',
    destaque: 'com as regras claras.',
    intro: 'O MEI pode contratar um plano empresarial depois de seis meses de atividade comprovada. Explicamos o que precisa estar certo, organizamos quem você quer incluir e comparamos as opções da sua região.',
    cta: 'Quero orientação para meu MEI',
    tituloCriterios: 'O que precisa estar certo antes da proposta.',
    criterios: [
      { titulo: 'Atividade e regularidade', texto: 'Seis meses de atividade comprovada e registro ativo na Receita, conferidos de novo a cada aniversário do contrato.' },
      { titulo: 'Quem você quer incluir', texto: 'Família e empregados podem entrar, dentro do que cada produto aceita. Vínculo e documentos são conferidos antes.' },
      { titulo: 'O que muda no uso', texto: 'Rede da sua região, coparticipação e carências lado a lado, e não só o preço da primeira mensalidade.' },
    ],
    linhaDoTempo: {
      titulo: 'Ainda não completou seis meses?',
      passos: ['Entender', 'Preparar', 'Conferir', 'Contratar quando estiver apto'],
      nota: 'A conversa pode começar antes. A contratação acontece quando os requisitos estiverem comprovados.',
    },
    entrega: {
      titulo: 'Como acompanhamos o seu caso.',
      itens: [
        { rotulo: 'PERFIL', titulo: 'Seu perfil primeiro', texto: 'CNPJ, cidade e quem você pretende incluir. Sem isso, qualquer preço seria chute.' },
        { rotulo: 'COMPARAÇÃO', titulo: 'Opções lado a lado', texto: 'Rede, coparticipação e carências explicadas, para escolher pelo uso real.' },
        { rotulo: 'DOCUMENTOS', titulo: 'Apoio na contratação', texto: 'Orientamos a documentação; a aceitação final é da operadora.' },
      ],
    },
    duvidas: [
      { q: 'Posso conversar antes dos seis meses?', a: 'Pode. Levantamos o seu perfil e preparamos a contratação para quando o CNPJ estiver apto. Valores e aceitação não ficam reservados por essa conversa.' },
      { q: 'Preciso ter empregado?', a: 'Depende do produto. Conferimos quem você pretende incluir antes de apresentar uma proposta compatível.' },
      { q: 'Quem da família pode entrar?', a: 'A ANS prevê cônjuge ou companheiro e parentes até o 3º grau consanguíneo e até o 2º por afinidade. Cada produto define o que aceita, e os documentos são conferidos.', fonte: { rotulo: 'ANS — Empresário individual', url: ANS_EMPRESARIO_INDIVIDUAL } },
      { q: 'Por que não há preço nesta página?', a: 'Idade, cidade, composição e produto mudam a conta. Preferimos mostrar a opção certa para o seu caso, com as condições explicadas.' },
    ],
    formulario: {
      titulo: 'Conte sobre o seu MEI',
      texto: 'Com o CNPJ e quem você quer incluir, um consultor retorna pelo canal que você indicar.',
      objetivos: [
        { valor: 'primeira_contratacao', rotulo: 'Contratar um plano pelo meu MEI' },
        { valor: 'revisao_beneficio', rotulo: 'Já tenho plano e quero rever' },
        { valor: 'outro', rotulo: 'Outro assunto' },
      ],
      mensagemSucesso: 'Vamos conferir as informações e falar com você para entender o seu perfil. Se o seu MEI ainda não tiver seis meses, combinamos a preparação até a data em que ele puder contratar.',
      semCnpj: 'Ainda não tem CNPJ? Fale com a gente pelo WhatsApp: explicamos o caminho.',
    },
  },
  pme: {
    rota: '/empresas/pme',
    pontoEntrada: 'empresas-pme',
    meta: {
      titulo: 'Plano de saúde para pequena e média empresa: compare com critério',
      descricao: 'Para o sócio que decide o plano da equipe: rede, coparticipação, regras de entrada e renovação comparadas e explicadas, da primeira contratação à renovação.',
    },
    eyebrow: 'Pequena e média empresa',
    titulo: 'Escolha o plano da sua empresa',
    destaque: 'entendendo o contrato.',
    intro: 'Rede, coparticipação, regras de entrada e renovação precisam fazer sentido para a equipe e para o orçamento. Comparamos as alternativas e explicamos os critérios para você decidir.',
    cta: 'Quero comparar opções para minha empresa',
    tituloCriterios: 'O preço mensal não mostra o contrato inteiro.',
    criterios: [
      { titulo: 'Rede e abrangência', texto: 'Qual hospital, laboratório e região cada produto cobre de fato, e não só a marca da operadora.' },
      { titulo: 'Coparticipação', texto: 'O que é cobrado no uso, em que itens e com que limites, explicado antes da escolha.' },
      { titulo: 'Entrada e renovação', texto: 'Quem pode entrar, carências e como o reajuste funciona para o tamanho do seu grupo.' },
    ],
    entrega: {
      titulo: 'O que você recebe.',
      itens: [
        { rotulo: 'ESTUDO', titulo: 'Comparação de critérios', texto: 'Rede, modalidade, regra e ponto de atenção de cada opção. Não é uma lista de preços.' },
        { rotulo: 'JÁ TEM PLANO', titulo: 'Manter, negociar ou trocar', texto: 'São resultados possíveis da análise. Antes de qualquer troca, conferimos a rede e a transição.' },
        { rotulo: 'DEPOIS', titulo: 'Implantação e renovação', texto: 'O que fazemos, o que depende da empresa e o que depende da operadora, até a renovação seguinte.' },
      ],
    },
    duvidas: [
      { q: 'Com menos de 30 pessoas, o preço é igual em todo lugar?', a: 'Não. O preço da proposta depende do produto, da cidade e das idades. Já o reajuste anual dos contratos com menos de 30 beneficiários é único por operadora, que o divulga no próprio portal.', fonte: { rotulo: 'ANS — Reajuste anual de planos coletivos', url: ANS_REAJUSTE } },
      { q: 'Todo funcionário precisa entrar?', a: 'Depende da modalidade do contrato e do produto. Explicamos as opções e o efeito de cada uma na proposta.' },
      { q: 'Comparar obriga a trocar?', a: 'Não. A análise pode recomendar manter o contrato atual. Uma troca exige atenção à rede, à aceitação e às carências.' },
      { q: 'Tem carência?', a: 'Com menos de 30 beneficiários, pode haver carência se o contrato previr. Com 30 ou mais, quem entra no prazo previsto fica dispensado. Conferimos o caso.', fonte: { rotulo: 'ANS — Carência', url: ANS_CARENCIA } },
    ],
    formulario: {
      titulo: 'Peça a comparação',
      texto: 'Primeira contratação ou plano em vigor: um consultor retorna pelo canal que você indicar.',
      objetivos: [
        { valor: 'primeira_contratacao', rotulo: 'Vou contratar o primeiro plano' },
        { valor: 'revisao_beneficio', rotulo: 'Já tenho plano e quero comparar' },
        { valor: 'outro', rotulo: 'Outro assunto' },
      ],
      mensagemSucesso: 'Vamos conferir as informações e falar com você para entender o momento da empresa antes de montar a comparação.',
    },
  },
  rh: {
    rota: '/empresas/rh',
    pontoEntrada: 'empresas-rh',
    meta: {
      titulo: 'Gestão do plano de saúde para RH: contrato, renovação e rotina',
      descricao: 'Para o RH ou gestor do benefício: análise do contrato e da renovação com os dados disponíveis, plano de ação e apoio na rotina de movimentações e demandas.',
    },
    eyebrow: 'RH e gestor do benefício',
    titulo: 'Clareza no contrato,',
    destaque: 'apoio na rotina.',
    intro: 'Analisamos as condições do benefício, o calendário de renovação e o que a empresa precisa. O plano de ação é montado com o RH, a partir dos dados disponíveis e das regras do contrato.',
    cta: 'Quero analisar o benefício da empresa',
    tituloCriterios: 'O que analisamos.',
    criterios: [
      { titulo: 'Contrato e renovação', texto: 'Cláusulas, histórico de reajustes e o que vale para o tamanho do grupo: menos de 30 ou 30 ou mais beneficiários.' },
      { titulo: 'Rede e composição', texto: 'A rede que a equipe usa e quem está no contrato. Nenhum dado individual de saúde.' },
      { titulo: 'Rotina do RH', texto: 'Inclusões, exclusões e demandas, com responsável e prazo acompanhados.' },
    ],
    linhaDoTempo: {
      titulo: 'Como o trabalho anda.',
      passos: ['Perfil', 'Evidências', 'Alternativas', 'Decisão', 'Acompanhamento'],
      nota: 'Manter o contrato atual também pode ser a recomendação. A decisão é sempre da empresa.',
    },
    entrega: {
      titulo: 'O que você recebe.',
      itens: [
        { rotulo: 'DIAGNÓSTICO', titulo: 'Leitura do contrato', texto: 'Prioridades e pontos de atenção, com a profundidade que o caso pede.' },
        { rotulo: 'RENOVAÇÃO', titulo: 'Preparação com antecedência', texto: 'Informações reunidas antes do aniversário do contrato, para avaliar e negociar.' },
        { rotulo: 'ROTINA', titulo: 'Acompanhamento', texto: 'Movimentações e demandas com responsável e retorno registrado, conforme o serviço contratado.' },
      ],
    },
    duvidas: [
      { q: 'Vocês sempre negociam pela sinistralidade?', a: 'Depende do contrato e dos dados disponíveis. Com menos de 30 beneficiários, o reajuste é único da operadora; com 30 ou mais, é negociado, e a operadora deve justificar o percentual.', fonte: { rotulo: 'ANS — Reajuste anual de planos coletivos', url: ANS_REAJUSTE } },
      { q: 'Com 30 vidas ou mais não há carência?', a: 'Só para quem entra no prazo previsto. Conferimos o caso e separamos carência de outras regras de aceitação.', fonte: { rotulo: 'ANS — Carência', url: ANS_CARENCIA } },
      { q: 'Precisamos trocar de corretora?', a: 'O diagnóstico vem antes de qualquer decisão e não altera o contrato atual.' },
      { q: 'Quando começar a renovação?', a: 'Com antecedência, de acordo com o aniversário do contrato. Casos urgentes também são atendidos.' },
      { q: 'Quais dados vocês pedem?', a: 'No primeiro contato, só os dados da empresa. Contrato e reajustes podem ser pedidos depois, por canal adequado. Nenhum dado individual de saúde.' },
    ],
    formulario: {
      titulo: 'Peça a análise do benefício',
      texto: 'Revisar o contrato, preparar a renovação ou implantar o benefício: um consultor retorna pelo canal que você indicar.',
      objetivos: [
        { valor: 'revisao_beneficio', rotulo: 'Revisar o contrato ou preparar a renovação' },
        { valor: 'primeira_contratacao', rotulo: 'Implantar o benefício' },
        { valor: 'gestao_beneficio', rotulo: 'Apoio na rotina do benefício' },
        { valor: 'outro', rotulo: 'Outro assunto' },
      ],
      mensagemSucesso: 'Vamos conferir as informações e falar com você. Se já tiver plano, vá separando o contrato e os últimos reajustes; pedimos por canal adequado, nunca por esta página.',
      mostrarMesRenovacao: true,
    },
  },
}
