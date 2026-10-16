// src/content/seguros.ts
//
// Seguros corporativos, pessoais e página Sobre — etapa 3 do Chief Chat:
// `marketing/entregas/chief-chat/Lifitseg_Site_Seguros_Conteudo_v1.md`.
// Portfólio derivado das páginas existentes; sem promessa de aceitação,
// indenização ou economia. Imagens temáticas do site anterior preservadas
// conforme `Lifitseg_Claude_Briefing_Imagens_Site_v1.md` (moto ainda sem
// foto específica: auto e moto ficam no mesmo bloco com a foto de carro).

const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=900`

export type Solucao = { id: string; titulo: string; texto: string; imagem?: string; alt?: string }

export const CORPORATIVO = {
  abertura: {
    sobretitulo: 'Seguros corporativos',
    h1: 'Proteção empresarial começa por entender a operação.',
    texto:
      'Patrimônio, pessoas, contratos e atividades expõem cada empresa a riscos diferentes. A Lifitseg ajuda a organizar essas necessidades, comparar alternativas e acompanhar o seguro ao longo da vigência.',
    ctaPrincipal: 'Conversar sobre os riscos da empresa',
    ctaSecundario: 'Entender as soluções',
  },
  antes: {
    titulo: 'O que precisamos entender antes de indicar um seguro',
    texto:
      'O que sua empresa faz, quais ativos utiliza, de quem depende e quais responsabilidades assume? Uma proposta consistente começa por essas informações — e pela leitura dos contratos e das proteções que já existem.',
    perguntas: [
      'Quais atividades e locais precisam ser considerados?',
      'Há veículos, mercadorias ou equipamentos em circulação?',
      'Existem exigências contratuais de seguro?',
      'O que uma interrupção provocaria na operação?',
      'O risco mudou desde a última renovação?',
    ],
  },
  solucoes: [
    {
      id: 'patrimonio',
      titulo: 'Patrimônio empresarial',
      texto:
        'Analisamos atividade, ocupação, bens, valores declarados e medidas de proteção. Na comparação, examinamos coberturas contratadas, limites, franquias, exclusões e condições que podem afetar a continuidade da operação. Empresarial, condomínio, equipamentos e riscos de engenharia têm aplicações diferentes; lucros cessantes exige análise específica da cobertura e do evento que a aciona.',
      imagem: U('photo-1486406146926-c627a92ad1ab'),
      alt: 'Edifício comercial',
    },
    {
      id: 'responsabilidade-civil',
      titulo: 'Responsabilidade civil',
      texto:
        'Uma reclamação de terceiro pode envolver danos ligados à operação, à prestação profissional, aos produtos ou à atuação de administradores. A análise considera quem está segurado, qual atividade foi declarada, quais eventos são abrangidos, limites e regras temporais de cobertura. RC geral, profissional, operações, produtos e D&O não são substitutos automáticos entre si.',
      imagem: U('photo-1521791136064-7986c2920216'),
      alt: 'Reunião de trabalho entre profissionais',
    },
    {
      id: 'transporte',
      titulo: 'Transporte e logística',
      texto:
        'Mercadoria transportada e responsabilidade do transportador são necessidades distintas. Avaliamos papel da empresa na operação, tipo de carga, trajetos, limites, averbação e exigências de gerenciamento de risco. A estrutura deve acompanhar os contratos e as regras aplicáveis à modalidade; não apresentamos uma apólice como solução universal para toda a cadeia logística.',
      imagem: U('photo-1519003722824-194d4455a60c'),
      alt: 'Caminhão em operação de transporte',
    },
    {
      id: 'frota',
      titulo: 'Frota',
      texto:
        'Uso, condutores, região de circulação, composição da frota e histórico de eventos ajudam a estruturar a comparação. Examinamos proteção do veículo, responsabilidade perante terceiros, franquias e assistência conforme as condições de cada proposta. Mudanças na operação precisam ser comunicadas para avaliação de eventual atualização contratual.',
      imagem: U('photo-1600294037681-c80b4cb5b434'),
      alt: 'Veículos de uma frota empresarial',
    },
    {
      id: 'garantias',
      titulo: 'Garantias e crédito',
      texto:
        'A necessidade nasce de uma obrigação ou exposição financeira concreta. A análise considera objeto, partes envolvidas, prazo, valor e documentação. Seguro garantia, fiança e crédito têm finalidades diferentes; emissão e condições dependem da avaliação da seguradora e do produto.',
      imagem: U('photo-1450101499163-c8848c66ca85'),
      alt: 'Análise de documentos de contrato',
    },
    {
      id: 'cyber',
      titulo: 'Riscos específicos e cyber',
      texto:
        'Ativos digitais, equipamentos e exposições particulares pedem avaliação própria. Em cyber, examinamos atividade, dependência tecnológica, práticas de segurança, limites, franquias e serviços previstos no contrato. Seguro não substitui segurança da informação nem garante recuperação integral de qualquer incidente.',
      imagem: U('photo-1550751827-4bd374c3f58b'),
      alt: 'Infraestrutura de tecnologia',
    },
  ] as Solucao[],
  momentos: [
    { titulo: 'Conhecer', texto: 'Organizar atividade, ativos, contratos e prioridades da empresa.' },
    { titulo: 'Comparar', texto: 'Explicar diferenças relevantes entre propostas e condições, além do preço.' },
    { titulo: 'Contratar', texto: 'Apoiar conferência das informações e dos documentos da contratação.' },
    { titulo: 'Acompanhar', texto: 'Orientar atualizações, renovação e comunicação de sinistro, conforme o escopo contratado.' },
  ],
  criterios: [
    { criterio: 'Atividade e bens declarados', motivo: 'A proposta precisa refletir a operação real.' },
    { criterio: 'Coberturas e exclusões', motivo: 'O nome comercial não descreve sozinho os eventos abrangidos.' },
    { criterio: 'Limites e sub-limites', motivo: 'Um limite geral não significa o mesmo valor para cada cobertura.' },
    { criterio: 'Franquias e participações', motivo: 'Alteram a parcela suportada pela empresa em determinadas ocorrências.' },
    { criterio: 'Obrigações e gerenciamento de risco', motivo: 'Podem exigir rotinas e documentos durante a vigência.' },
    { criterio: 'Regras de comunicação e vigência', motivo: 'Eventos e alterações precisam ser tratados conforme o contrato.' },
  ],
  sinistro:
    'Organizar a comunicação faz diferença. A Lifitseg orienta o aviso pelos canais indicados, a reunião de documentos e o acompanhamento das solicitações. A análise de cobertura, a regulação e a decisão sobre indenização cabem à seguradora, conforme o contrato e as regras aplicáveis. Situações urgentes devem seguir os canais de emergência e assistência previstos na apólice.',
  faq: [
    { q: 'O menor preço é a melhor proposta?', a: 'O preço deve ser comparado junto com coberturas, limites, franquias e condições. Duas propostas com valores próximos podem transferir riscos de maneiras diferentes.' },
    { q: 'Posso revisar seguros que já tenho?', a: 'Sim. A análise começa pela apólice e pela operação atual, para identificar pontos que merecem esclarecimento ou atualização.' },
    { q: 'Mudei de endereço, atividade ou veículos. Preciso avisar?', a: 'Alterações relevantes devem ser comunicadas para avaliação. Eventual endosso, aceitação e custo dependem do produto e da seguradora.' },
    { q: 'Toda perda é indenizável?', a: 'Não. O enquadramento depende do evento, das coberturas contratadas, dos limites, das exclusões e das demais condições.' },
    { q: 'Vocês acompanham a renovação?', a: 'A renovação é oportunidade de revisar riscos, valores e condições. O acompanhamento segue o serviço contratado e as informações fornecidas pela empresa.' },
  ],
  encerramento: 'Sua operação mudou. A proteção acompanhou?',
  ctaFinal: 'Solicitar uma conversa sobre os seguros da empresa',
}

export const PESSOAL = {
  abertura: {
    sobretitulo: 'Seguros pessoais',
    h1: 'Escolhas de proteção que fazem sentido para sua vida.',
    texto:
      'Sua rotina, seu patrimônio e as pessoas que dependem de você ajudam a definir o que precisa ser protegido. A Lifitseg explica alternativas e condições para que você escolha com mais clareza.',
    ctaPrincipal: 'Conversar sobre minha proteção',
    ctaSecundario: 'Conhecer as opções',
  },
  solucoes: [
    {
      id: 'auto-moto',
      titulo: 'Auto e moto',
      texto:
        'Avaliamos como o veículo é utilizado e quais proteções são importantes para sua rotina. Compare cobertura do veículo, danos a terceiros, franquias e assistência. Limite de guincho, carro reserva e outras facilidades dependem da contratação; assistência não deve ser confundida com cobertura de qualquer dano.',
      imagem: U('photo-1550355291-bbee04a92027'),
      alt: 'Carro em uso cotidiano',
    },
    {
      id: 'residencial',
      titulo: 'Residencial',
      texto:
        'Casa, apartamento, imóvel próprio ou alugado têm necessidades diferentes. A análise considera estrutura, conteúdo, uso do imóvel e coberturas adicionais. Danos elétricos, subtração de bens e responsabilidade familiar precisam ser conferidos nas condições; não presumimos que estejam incluídos apenas por existir seguro residencial.',
      imagem: U('photo-1600585154340-be6161a56a0c'),
      alt: 'Casa residencial',
    },
    {
      id: 'vida',
      titulo: 'Vida e acidentes pessoais',
      texto:
        'Responsabilidades financeiras, dependentes e objetivos ajudam a avaliar capitais e coberturas. Vida e acidentes pessoais têm diferenças de alcance. Declarações e informações solicitadas devem ser prestadas corretamente; proposta e eventual aceitação seguem as regras do produto.',
      imagem: U('photo-1511895426328-dc8714191300'),
      alt: 'Família reunida',
    },
    {
      id: 'viagem',
      titulo: 'Viagem',
      texto:
        'Destino, duração e perfil da viagem orientam a avaliação de coberturas e limites. Antes de contratar, confira abrangência territorial, assistência, despesas médicas previstas e regras para condições preexistentes ou atividades específicas. Emergências devem seguir os canais indicados no seguro.',
      imagem: U('photo-1436491865332-7a61a109cc05'),
      alt: 'Avião em voo',
    },
    {
      id: 'equipamentos',
      titulo: 'Equipamentos e tecnologia',
      texto:
        'Celular, notebook e outros equipamentos exigem atenção ao bem elegível, uso, comprovantes e eventos cobertos. Roubo, furto e dano acidental não são expressões equivalentes no contrato; verifique o que foi efetivamente contratado e a participação prevista.',
      imagem: U('photo-1512941937669-90a1b58e7e9c'),
      alt: 'Celular e notebook em uso',
    },
  ] as Solucao[],
  como: [
    'Entendemos sua necessidade',
    'Explicamos diferenças',
    'Apoiamos a contratação',
    'Acompanhamos dúvidas, mudanças e renovação, conforme o serviço contratado',
  ],
  leve:
    'Leve para a conversa: tipo de proteção buscada, cidade, uso do bem e apólice atual, se houver. Documentos e dados detalhados devem ser enviados somente pelo canal orientado pela equipe, quando necessários. Não envie informações de saúde no formulário inicial.',
  faq: [
    { q: 'Preciso já ter um seguro?', a: 'Não. Podemos conversar sobre uma nova necessidade ou revisar o que você já possui.' },
    { q: 'Franquia é igual em todas as coberturas?', a: 'Não necessariamente. Confira a aplicação, o valor ou percentual e eventual mínimo em cada cobertura.' },
    { q: 'Assistência significa indenização?', a: 'Não. Assistência é o serviço previsto no contrato; indenização depende de um evento coberto e das condições aplicáveis.' },
    { q: 'Posso mudar dados durante a vigência?', a: 'Comunique a alteração. A equipe orientará a avaliação de endosso e das condições junto à seguradora.' },
    { q: 'Como agir em um sinistro?', a: 'Priorize a segurança, utilize os canais indicados e reúna os documentos solicitados. A Lifitseg apoia a comunicação e o acompanhamento, sem antecipar a decisão da seguradora.' },
  ],
  encerramento: 'Entender sua proteção também é uma forma de cuidar.',
  ctaFinal: 'Falar com a Lifitseg',
}

export const SOBRE = {
  h1: 'Conhecimento técnico, proximidade e cuidado em cada decisão.',
  texto:
    'A Lifitseg é uma consultoria em benefícios e seguros que atua junto de empresas, pessoas e famílias. Unimos análise das necessidades, orientação na contratação e acompanhamento para tornar decisões complexas mais claras.',
  pilares: [
    { titulo: 'Junto da empresa', texto: 'Em saúde empresarial, atendemos desde pequenas empresas até operações corporativas. Nossa carteira reúne mais de 100 empresas, conforme informação institucional confirmada em outubro de 2026. A atuação pode envolver contratação, renovação, gestão do benefício, apoio ao RH e atendimento próximo, inclusive in company, conforme o escopo acordado.' },
    { titulo: 'Técnica que se traduz em orientação', texto: 'Explicamos critérios, limites e alternativas em linguagem acessível. O objetivo é permitir que o cliente compreenda o que está escolhendo e saiba quais são os próximos passos.' },
    { titulo: 'Proximidade ao longo da relação', texto: 'A necessidade não termina na contratação. Mudanças na empresa, na família e no patrimônio podem exigir nova avaliação. Mantemos o acompanhamento conforme o serviço contratado e os canais combinados.' },
    { titulo: 'Tecnologia a serviço da organização', texto: 'Usamos tecnologia para apoiar a organização das informações e dos processos internos. O atendimento e as decisões que exigem análise permanecem acompanhados pela equipe.' },
    { titulo: 'Conhecimento para decidir', texto: 'Reunimos conteúdos que explicam benefícios, seguros e situações comuns, com fontes públicas e autoria institucional. Os materiais são educativos e não substituem a análise da proposta, da apólice ou de um caso individual.' },
  ],
}

/**
 * Seguradoras parceiras exibidas nas páginas de seguros (lista do site
 * anterior, uso confirmado por Raphael). Sem `arquivo`, o cartão mostra o
 * nome em texto: os logos de Bradesco e Porto em public/seguradoras são das
 * marcas de saúde, e Itaú, Azul e Mitsui nunca tiveram arquivo. Trocar pelo
 * logo de ramos elementares quando for entregue.
 */
export const SEGURADORAS: { nome: string; arquivo?: string }[] = [
  { nome: 'Bradesco Seguros' },
  { nome: 'Porto Seguro' },
  { nome: 'Seguros Unimed', arquivo: 'seguros_unimed' },
  { nome: 'Tokio Marine', arquivo: 'tokio' },
  { nome: 'Liberty Seguros', arquivo: 'liberty' },
  { nome: 'Mapfre', arquivo: 'mapfre' },
  { nome: 'Allianz', arquivo: 'allianz' },
  { nome: 'HDI Seguros', arquivo: 'hdi' },
  { nome: 'Yelum', arquivo: 'yelum' },
  { nome: 'Suhai', arquivo: 'suhai' },
  { nome: 'Zurich', arquivo: 'zurich' },
  { nome: 'Itaú Seguros' },
  { nome: 'Azul Seguros' },
  { nome: 'Mitsui Sumitomo' },
]

export const FONTES_SUSEP = [
  { rotulo: 'SUSEP — Seguro de automóveis', url: 'https://www.gov.br/susep/pt-br/assuntos/meu-futuro-seguro/seguros-previdencia-e-capitalizacao/seguros/seguro-de-automoveis' },
  { rotulo: 'SUSEP — Seguro de responsabilidade civil', url: 'https://www.gov.br/susep/pt-br/assuntos/meu-futuro-seguro/seguros-previdencia-e-capitalizacao/seguros/seguro-responsabilidade-civil' },
  { rotulo: 'SUSEP — Seguro de pessoas', url: 'https://www.gov.br/susep/pt-br/copy_of_planos-e-produtos/seguros/seguro-de-pessoas' },
]
