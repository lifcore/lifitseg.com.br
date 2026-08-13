import { siteConfig } from '@/config/site';

const recursos = [
  { title: 'TMS', desc: 'Gestão da operação e da frota.' },
  { title: 'DMS', desc: 'Gestão das entregas e etapas da operação.' },
  { title: 'Telemetria', desc: 'Informações da operação e comportamento dos veículos.' },
  { title: 'App do Motorista', desc: 'Apoio ao motorista e acompanhamento da operação.' },
  { title: 'Monitoramento em Tempo Real', desc: 'Visibilidade sobre as operações em andamento.' },
  { title: 'Gestão de Manutenção', desc: 'Controle preventivo e disponibilidade da frota.' },
  { title: 'Gestão de Rotas', desc: 'Planejamento e avaliação de rotas mais eficientes.' },
  { title: 'Relatórios', desc: 'Indicadores para acompanhamento do desempenho operacional.' },
  { title: 'Gestão de Risco', desc: 'Processos voltados à segurança e mitigação de riscos.' },
];

export default function TecnologiaEGestaoPage() {
  return (
    <>
      {/* HERO DA PÁGINA */}
      <section className="relative py-16 bg-[#071B2D] text-white text-center border-b border-[#123B57] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/tecnologia-inovacao.jpg"
            alt="Operador com EPI utilizando empilhadeira em armazém"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[#071B2D]/60" />
        </div>
        <div className="relative mx-auto max-w-[800px] px-5">
          <span className="text-sm font-bold text-[#7894A8] uppercase tracking-wider">Tecnologia & Gestão</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
            Tecnologia para controlar. Gestão para decidir. Experiência para executar.
          </h1>
        </div>
      </section>

      {/* GRID DE RECURSOS */}
      <section className="py-20 bg-[#FAF9F6] text-[#071B2D]">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recursos.map((r) => (
              <div key={r.title} className="bg-white p-6 rounded border border-gray-200">
                <h4 className="font-bold mb-2">{r.title}</h4>
                <p className="text-xs text-gray-600">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP DO MOTORISTA */}
      <section className="py-20 bg-[#123B57] text-white">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-bold text-[#7894A8] uppercase tracking-wider">Gestão de Frota</span>
              <h2 className="text-3xl font-bold mt-2 mb-6 text-white">App do Motorista</h2>
              <p className="text-[#F1EDE3] leading-relaxed">
                Apoio ao motorista e acompanhamento da operação, com monitoramento em tempo real das atividades em andamento.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="/images/tecnologia-app-motorista.jpg"
                alt="Motorista utilizando aplicativo no veículo"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MONITORAMENTO EM TEMPO REAL */}
      <section className="py-20 bg-[#FAF9F6] text-[#071B2D]">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-md order-2 lg:order-1">
              <img
                src="/images/tecnologia-monitoramento.jpg"
                alt="Motorista ao volante durante a operação"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-sm font-bold text-[#7894A8] uppercase tracking-wider">Visibilidade da Operação</span>
              <h2 className="text-3xl font-bold mt-2 mb-6">Monitoramento em tempo real</h2>
              <p className="text-gray-700 leading-relaxed">
                Gestão de rotas, gestão de manutenção e relatórios de desempenho trabalham juntos para dar visibilidade completa sobre cada operação em andamento — da saída à entrega.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MENSAGEM CENTRAL + CTA */}
      <section className="py-20 bg-[#071B2D] text-white text-center">
        <div className="mx-auto max-w-[700px] px-5">
          <p className="text-xl font-semibold text-[#F1EDE3] mb-8">
            &quot;A tecnologia não substitui nossa experiência. Ela aumenta nossa capacidade de controlar a operação.&quot;
          </p>
          <a
            href={siteConfig.contato.whatsappLink('Olá, gostaria de saber mais sobre a tecnologia e gestão da Ação Transportes.')}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-bold text-[#C5A15A] hover:underline"
          >
            Fale com nosso comercial →
          </a>
        </div>
      </section>
    </>
  );
}
