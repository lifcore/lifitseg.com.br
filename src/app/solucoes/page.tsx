import Link from 'next/link';

const solucoesList = [
  {
    title: 'Cargas Gerais',
    desc: 'Coletas, transferências e entregas.',
    image: '/images/solucoes-especialidades.jpg',
  },
  {
    title: 'Refrigerados',
    desc: 'Operações com controle de temperatura conforme a necessidade.',
    image: 'https://images.unsplash.com/photo-1720811559371-7b0ebd219127?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Congelados',
    desc: 'Veículos preparados para temperaturas negativas, conforme especificação.',
    image: null,
  },
  {
    title: 'Químicos e Produtos Perigosos',
    desc: 'Maior controle, documentação, segurança e conformidade.',
    image: 'https://images.unsplash.com/photo-1783247007596-cca4a61a16f5?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Veículos Dedicados',
    desc: 'Veículo direcionado exclusivamente para uma operação, rota ou necessidade específica.',
    image: null,
  },
  {
    title: 'Coletas e Entregas',
    desc: 'Operações programadas ou sob demanda.',
    image: null,
  },
];

export default function SolucoesPage() {
  return (
    <>
      {/* HERO DA PÁGINA */}
      <section className="relative py-16 bg-[#071B2D] text-white text-center border-b border-[#123B57] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/solucoes-hero.jpg"
            alt="Frota de caminhões da Ação Transportes"
            className="h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-[#071B2D]/50" />
        </div>
        <div className="relative mx-auto max-w-[800px] px-5">
          <span className="text-sm font-bold text-[#7894A8] uppercase tracking-wider">Cada operação exige uma solução diferente</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2">Soluções</h1>
        </div>
      </section>

      {/* FLUXO DA OPERAÇÃO */}
      <section className="py-16 bg-[#123B57] text-white">
        <div className="mx-auto max-w-[1200px] px-5 text-center">
          <div className="flex flex-wrap justify-center items-center gap-3 text-sm font-semibold">
            {['Origem', 'Carga', 'Volume', 'Destino', 'Prazo', 'Veículo', 'Entrega'].map((step, idx, arr) => (
              <div key={step} className="flex items-center gap-3">
                <span className="bg-[#071B2D] px-4 py-2 rounded border border-[#7894A8] text-[#F1EDE3]">
                  {step}
                </span>
                {idx < arr.length - 1 && <span className="text-[#C5A15A]">➔</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUÇÕES PRINCIPAIS */}
      <section className="py-20 bg-[#F1EDE3] text-[#071B2D]">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solucoesList.map((sol) => (
              <div key={sol.title} className="bg-white rounded shadow-sm border border-gray-200 hover:border-[#7894A8] transition-colors overflow-hidden">
                {sol.image && (
                  <div className="h-40 overflow-hidden">
                    <img src={sol.image} alt={sol.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#071B2D] mb-2">{sol.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{sol.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARCEIRO DENTRO DA OPERAÇÃO */}
      <section className="py-20 bg-[#FAF9F6] text-[#071B2D]">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="/images/solucoes-parceria.jpg"
                alt="Mãos unindo peças de quebra-cabeça, representando parceria"
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <span className="text-sm font-bold text-[#123B57] uppercase tracking-wider">Parceiro Dentro da Operação</span>
              <h2 className="text-3xl font-bold mt-2 mb-6">Mais que um fornecedor de transporte</h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                Empresas com operações recorrentes precisam de mais do que um fornecedor de transporte. A Ação trabalha próxima ao cliente para compreender rotina, prazos e restrições, avaliar rotas, adequar veículos e buscar soluções que façam sentido para cada cenário.
              </p>
              <Link href="/contato" className="text-sm font-bold text-[#123B57] hover:underline">
                Vamos conversar sobre sua operação →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
