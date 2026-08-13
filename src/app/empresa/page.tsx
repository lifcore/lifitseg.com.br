const pilaresList = [
  {
    title: 'Compromisso & Pontualidade',
    desc: 'Cumprimento rigoroso dos prazos acordados, alinhando planejamento e execução para manter a cadeia de suprimentos de sua empresa em perfeito fluxo.',
  },
  {
    title: 'Segurança em Cada Etapa',
    desc: 'Processos rigorosos de gerenciamento de risco e monitoramento para garantir a integridade total de cargas secas, refrigeradas ou perigosas.',
  },
  {
    title: 'Atendimento Humanizado',
    desc: 'Comunicação direta com quem resolve. Transparência total e proximidade para que você acompanhe a sua operação com total tranquilidade.',
  },
  {
    title: 'Flexibilidade Operacional',
    desc: 'Adaptabilidade para responder às dinâmicas do mercado e ajustar soluções conforme a complexidade da necessidade do cliente.',
  },
  {
    title: 'Tradição & Experiência',
    desc: 'Mais de 30 anos de atuação consolidada, aliando o know-how de mercado com métodos modernos de gestão e execução.',
  },
  {
    title: 'Relações de Longo Prazo',
    desc: 'Foco na construção de parcerias duradouras fundadas em transparência, integridade e resultados consistentes.',
  },
];

export default function EmpresaPage() {
  return (
    <>
      {/* HERO DA PÁGINA */}
      <section className="relative py-20 bg-[#071B2D] text-white text-center border-b border-[#123B57] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/solucoes-hero.jpg"
            alt="Frota de caminhões da Ação Transportes"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[#071B2D]/55" />
        </div>
        <div className="relative mx-auto max-w-[800px] px-5">
          <span className="text-sm font-bold text-[#7894A8] uppercase tracking-wider">Institucional</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">Uma história construída na estrada. Uma nova fase pela frente.</h1>
        </div>
      </section>

      {/* EXPERIÊNCIA QUE EVOLUI */}
      <section className="py-20 bg-[#FAF9F6] text-[#071B2D]">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-bold text-[#7894A8] uppercase tracking-wider">Experiência que Evolui</span>
              <h2 className="text-3xl font-bold mt-2 mb-6">1995 → 2026</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Mais de três décadas de atuação ensinaram que transporte não é apenas deslocar uma carga. É entender pessoas, empresas, prazos, riscos e necessidades que mudam constantemente.
              </p>
              <p className="text-gray-700 leading-relaxed">
                A nova fase mantém essa experiência e acrescenta novas ferramentas de gestão, tecnologia e controle.
              </p>
            </div>
            <div className="bg-[#071B2D] p-8 rounded-lg text-white border-l-4 border-[#C5A15A]">
              <div className="text-4xl font-extrabold text-[#7894A8] mb-2">1995 ➔ 2026</div>
              <div className="text-xl font-semibold mb-4 text-[#F1EDE3]">+30 anos de atuação consolidada</div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Combinamos a bagagem de três décadas com novas ferramentas de controle, rastreabilidade e gestão de risco para entregar soluções eficientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONFORMIDADE E OPERAÇÕES REGULAMENTADAS */}
      <section className="relative py-20 bg-[#071B2D] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/empresa-conformidade.jpg"
            alt="Aperto de mãos entre profissionais em área de contêineres, com EPI"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[#071B2D]/60" />
        </div>
        <div className="relative mx-auto max-w-[800px] px-5">
          <span className="text-sm font-bold text-[#7894A8] uppercase tracking-wider">Autoridade Operacional</span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-4">Conformidade e operações regulamentadas</h2>
          <p className="text-gray-200 leading-relaxed">
            Contamos com autorizações emitidas por órgãos competentes, incluindo Polícia Civil e Polícia Federal, para o transporte regulamentado de produtos químicos e perigosos elegíveis.
          </p>
        </div>
      </section>

      {/* PILARES DA OPERAÇÃO */}
      <section id="pilares" className="py-20 bg-[#FAF9F6] scroll-mt-20">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#071B2D]">Pilares da Nossa Operação</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pilaresList.map((p) => (
              <div key={p.title} className="bg-white p-6 rounded shadow-sm border-t-2 border-[#7894A8]">
                <h3 className="font-bold text-[#071B2D] mb-2">{p.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
