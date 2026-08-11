// src/app/lp/saude-odonto/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { captureAndPersistUtms } from '@/utils/tracking';
import { LeadModal } from '@/components/forms/LeadModal'; // Reutilização obrigatória — named export, caminho real do componente

// Lista fechada de "interesses" desta LP — proposital (estratégia de
// anúncio por dor específica, não por nome de produto tradicional).
// Trava o seletor do LeadModal pra nunca cair no fallback genérico
// (que inclui Auto/Frota).
const PRODUTOS_SAUDE_ODONTO = [
  'Plano de Saúde (Consultoria)',
  'Quero entender meu plano',
  'Estou procurando um plano',
  'Saúde Empresarial',
  'Quero conversar com um consultor',
]

export default function LandingPageSaudeOdonto() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('Plano de Saúde (Consultoria)');

  useEffect(() => {
    captureAndPersistUtms();
  }, []);

  const handleOpenModal = (productDefault: string) => {
    setSelectedProduct(productDefault);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F4] text-lifitseg-dark font-sans selection:bg-primary/20 antialiased">
      {/* TOPBAR MÍNIMA DE LP */}
      <header className="border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-lifitseg-dark">
            <span className="text-primary">Lifit</span>Seg
          </Link>
          <div className="text-xs font-semibold uppercase tracking-wider text-lifitseg-dark/60 bg-black/5 px-3 py-1.5 rounded-full">
            Canal Consultivo Dedicado
          </div>
        </div>
      </header>

      {/* HERO SECTION — REVISADO */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide">
              <ShieldCheck className="w-4 h-4" /> Revisão de Plano de Saúde
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-lifitseg-dark leading-[1.1]">
              Seu plano ficou mais caro. Mas ficou melhor?
            </h1>
            
            <p className="text-lg text-lifitseg-dark/70 leading-relaxed max-w-2xl">
              Reajustes, mudanças na rede, dificuldades no atendimento ou simplesmente a sensação de que ninguém mais acompanha seu contrato. Antes de trocar de plano, vale entender o que está acontecendo.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => handleOpenModal('Quero entender meu plano')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-lifitseg-dark text-white font-semibold shadow-lg hover:bg-lifitseg-dark/90 transition-all cursor-pointer group text-base"
              >
                Quero entender meu plano
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => handleOpenModal('Estou procurando um plano')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-transparent border border-lifitseg-dark/20 text-lifitseg-dark font-semibold hover:bg-black/5 transition-all cursor-pointer text-sm"
              >
                Estou procurando um plano
              </button>
            </div>
          </div>

          {/* IMAGEM E ELEMENTO VISUAL SOBREPOSTO */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/10 aspect-[4/3] bg-lifitseg-dark/5">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000"
                alt="Consultor em conversa profissional e acolhedora"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Quadro visual sobreposto */}
            <div className="absolute -bottom-6 -left-6 sm:left-6 bg-white p-5 rounded-2xl shadow-xl border border-black/10 max-w-xs space-y-1 hidden sm:block">
              <div className="text-xs font-bold tracking-wider text-primary uppercase">Análise do seu cenário</div>
              <div className="text-sm font-semibold text-lifitseg-dark">Plano atual • Necessidades • Alternativas</div>
            </div>
          </div>
        </div>
      </section>

      {/* GANCHO IMEDIATAMENTE APÓS O HERO */}
      <section className="py-12 bg-[#F4F6F4] border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <p className="text-xl font-semibold text-lifitseg-dark">
            Você não precisa trocar de plano antes de entender o que está acontecendo.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm font-bold text-lifitseg-dark/70">
            <span className="bg-white px-4 py-2 rounded-xl shadow-sm border border-black/5">SEU PLANO ATUAL</span>
            <span className="text-primary">↓</span>
            <span className="bg-white px-4 py-2 rounded-xl shadow-sm border border-black/5">O QUE MUDOU</span>
            <span className="text-primary">↓</span>
            <span className="bg-white px-4 py-2 rounded-xl shadow-sm border border-black/5">O QUE VOCÊ PRECISA</span>
            <span className="text-primary">↓</span>
            <span className="bg-white px-4 py-2 rounded-xl shadow-sm border border-black/5">O QUE PODE FAZER SENTIDO</span>
          </div>
        </div>
      </section>

      {/* SEÇÃO — IDENTIFICAÇÃO (4 CARDS) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-lifitseg-dark">
              Talvez você esteja vivendo uma destas situações.
            </h2>
            <p className="text-lifitseg-dark/60 text-base">
              Algumas mudanças parecem pequenas até começarem a pesar no bolso, no atendimento ou na rotina.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 01 */}
            <div className="p-8 rounded-3xl bg-[#F4F6F4] border border-black/5 space-y-4 hover:border-primary/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg group-hover:scale-105 transition-transform">
                01
              </div>
              <h3 className="font-bold text-xl text-lifitseg-dark">Seu plano ficou mais caro.</h3>
              <p className="text-sm text-lifitseg-dark/70 leading-relaxed">
                O valor aumentou novamente, mas você não sabe se a configuração atual ainda faz sentido.
              </p>
            </div>

            {/* Card 02 */}
            <div className="p-8 rounded-3xl bg-[#F4F6F4] border border-black/5 space-y-4 hover:border-primary/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg group-hover:scale-105 transition-transform">
                02
              </div>
              <h3 className="font-bold text-xl text-lifitseg-dark">Quando precisa, começa a peregrinação.</h3>
              <p className="text-sm text-lifitseg-dark/70 leading-relaxed">
                Consulta, exame, autorização, rede credenciada, informação — e você acaba tentando resolver tudo sozinho.
              </p>
            </div>

            {/* Card 03 */}
            <div className="p-8 rounded-3xl bg-[#F4F6F4] border border-black/5 space-y-4 hover:border-primary/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg group-hover:scale-105 transition-transform">
                03
              </div>
              <h3 className="font-bold text-xl text-lifitseg-dark">Você tem um contrato, mas não tem clareza.</h3>
              <p className="text-sm text-lifitseg-dark/70 leading-relaxed">
                Cobertura, carência, rede, reembolso e regras parecem simples até o momento em que você precisa delas.
              </p>
            </div>

            {/* Card 04 */}
            <div className="p-8 rounded-3xl bg-[#F4F6F4] border border-black/5 space-y-4 hover:border-primary/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg group-hover:scale-105 transition-transform">
                04
              </div>
              <h3 className="font-bold text-xl text-lifitseg-dark">Na contratação, alguém apareceu.</h3>
              <p className="text-sm text-lifitseg-dark/70 leading-relaxed">
                Depois dela, o acompanhamento deixou de existir ou ficou limitado à renovação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE IMPACTO (VERDE PROFUNDO) */}
      <section className="py-24 bg-lifitseg-dark text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Não começamos perguntando qual plano você quer.
          </h2>
          <p className="text-xl sm:text-2xl text-primary font-semibold">
            Começamos perguntando o que você precisa.
          </p>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto pt-4">
            Porque uma boa escolha depende do momento, das pessoas envolvidas, da utilização e da realidade de cada cliente.
          </p>
        </div>
      </section>

      {/* MÉTODO CONSULTIVO */}
      <section className="py-20 bg-[#F4F6F4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-lifitseg-dark">Nosso Método Consultivo</h2>
            <p className="text-lifitseg-dark/60">Uma jornada estruturada para trazer clareza e segurança à sua decisão.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'ENTENDEMOS', desc: 'Seu momento, suas necessidades e o que está incomodando hoje.' },
              { step: '02', title: 'ANALISAMOS', desc: 'O plano atual, suas características, rede e condições de contratação.' },
              { step: '03', title: 'COMPARAMOS', desc: 'Alternativas compatíveis com o cenário identificado.' },
              { step: '04', title: 'ORIENTAMOS', desc: 'Você entende as possibilidades e decide com mais segurança.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-black/5 space-y-4 shadow-sm">
                <div className="text-primary font-mono font-extrabold text-2xl">{item.step}</div>
                <h3 className="font-bold text-xl text-lifitseg-dark">{item.title}</h3>
                <p className="text-sm text-lifitseg-dark/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO PF — EMPATIA */}
      <section className="py-20 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-lifitseg-dark">
              E se você não souber exatamente o que precisa?
            </h2>
            <p className="text-lg font-medium text-lifitseg-dark">Tudo bem.</p>
            <p className="text-lifitseg-dark/70 leading-relaxed">
              Você não precisa conhecer operadoras, tipos de contratação, redes credenciadas ou regras de plano de saúde para começar uma conversa conosco. Você conta o que precisa. Nós ajudamos a organizar o cenário.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Estou procurando um plano', desc: 'Para mim ou para minha família.' },
              { title: 'Já tenho um plano', desc: 'Quero entender se ele ainda faz sentido.' },
              { title: 'Preciso proteger minha família', desc: 'Quero encontrar uma opção compatível com meu momento.' },
              { title: 'Estou passando por uma mudança', desc: 'Empresa, trabalho, família ou necessidade de cobertura.' },
            ].map((box, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#F4F6F4] border border-black/5 space-y-2">
                <h3 className="font-bold text-base text-lifitseg-dark">{box.title}</h3>
                <p className="text-xs text-lifitseg-dark/70">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO EMPRESARIAL */}
      <section className="py-20 bg-[#F4F6F4] border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-lifitseg-dark">
              Para empresas, a questão vai além do plano.
            </h2>
            <p className="text-lifitseg-dark/70 leading-relaxed text-base">
              Benefícios impactam colaboradores, RH e a saúde financeira da empresa. Por isso, a análise precisa considerar o contrato, o perfil dos beneficiários, a utilização e o cenário da organização.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              {['Gestão de benefícios', 'Análise de contratos', 'Rede e utilização', 'Reajustes e negociações', 'Acompanhamento'].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm font-semibold text-lifitseg-dark">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {feat}
                </div>
              ))}
            </div>
            <div className="pt-4">
              <button
                onClick={() => handleOpenModal('Saúde Empresarial')}
                className="inline-flex items-center gap-2 text-sm font-bold text-lifitseg-dark hover:text-primary transition-colors cursor-pointer group"
              >
                Quero conversar sobre os benefícios da minha empresa
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/10 aspect-[4/3] bg-white">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
                alt="Ambiente corporativo contemporâneo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE CONFIANÇA */}
      <section className="py-20 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-lifitseg-dark">
              Uma consultoria que continua depois da contratação.
            </h2>
            <p className="text-lifitseg-dark/60 text-base">
              A relação não termina quando o plano é contratado. O acompanhamento faz parte da nossa atuação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Orientação', desc: 'Quando surgir uma dúvida, existe alguém para conversar.' },
              { title: 'Acompanhamento', desc: 'Demandas relacionadas ao benefício continuam sendo acompanhadas.' },
              { title: 'Relacionamento', desc: 'A consultoria conhece o contexto do cliente e não começa do zero a cada necessidade.' },
            ].map((c, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#F4F6F4] border border-black/5 space-y-3">
                <h3 className="font-bold text-xl text-lifitseg-dark">{c.title}</h3>
                <p className="text-sm text-lifitseg-dark/70 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO DE DESMISTIFICAÇÃO */}
      <section className="py-20 bg-[#F4F6F4] border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-lifitseg-dark">
              Antes de tomar uma decisão, vale olhar o cenário inteiro.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Plano mais barato ≠ necessariamente melhor',
              'Rede maior ≠ necessariamente mais adequada',
              'Reajuste menor ≠ necessariamente melhor contrato',
              'Trocar de operadora ≠ necessariamente resolver o problema',
            ].map((text, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-black/5 flex items-center shadow-sm">
                <p className="text-sm font-semibold text-lifitseg-dark">{text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-base font-bold text-primary">É por isso que começamos pela análise.</p>
          </div>
        </div>
      </section>

      {/* CTA FINAL (VERDE PROFUNDO) */}
      <section className="py-24 bg-lifitseg-dark text-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Vamos olhar para o seu caso?
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
            Conte brevemente o que está acontecendo. A primeira conversa serve para entender o cenário — não para empurrar uma solução.
          </p>
          <div className="pt-4">
            <button
              onClick={() => handleOpenModal('Quero conversar com um consultor')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-lifitseg-dark font-bold hover:bg-primary/90 transition-all cursor-pointer text-base shadow-xl"
            >
              Quero conversar com um consultor
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-white/50 mt-4">Atendimento consultivo e sem compromisso.</p>
          </div>
        </div>
      </section>

      {/* RODAPÉ MÍNIMO */}
      <footer className="py-8 bg-white border-t border-black/5 text-center text-xs text-lifitseg-dark/50">
        <p>Privacidade | LifitSeg — Todos os direitos reservados.</p>
      </footer>

      {/* LEAD MODAL COM ORIGEM FORÇADA */}
      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultProduto={selectedProduct}
        origem="lp-saude-odonto"
        produtos={PRODUTOS_SAUDE_ODONTO}
      />
    </div>
  );
}