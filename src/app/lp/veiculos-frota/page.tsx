// src/app/lp/veiculos-frota/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, ArrowRight, CheckCircle2, Truck } from 'lucide-react';
import { captureAndPersistUtms } from '@/utils/tracking';
import { LeadModal } from '@/components/forms/LeadModal'; // Reutilização obrigatória — named export, caminho real do componente

// Lista fechada de produtos desta LP — trava o seletor do LeadModal
// pra nunca cair no fallback genérico (que é focado em Saúde).
const PRODUTOS_VEICULOS_FROTA = [
  'Seguro Auto',
  'Seguro Frota',
]

export default function LandingPageVeiculosFrota() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('Seguro Auto');

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
      <header className="border-b border-primary/20 bg-lifitseg-dark/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="LifitSeg" width={150} height={46} className="h-11 w-auto object-contain" priority />
          </Link>
          <div className="text-xs font-semibold uppercase tracking-wider text-lifitseg-offwhite/70 bg-white/10 px-3 py-1.5 rounded-full">
            Veículos & Frota • Canal Consultivo
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide">
              <Shield className="w-4 h-4" /> SEGURO AUTO • FROTA
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-lifitseg-dark leading-[1.1]">
              Seu seguro está realmente acompanhando o que você precisa proteger?
            </h1>
            
            <p className="text-lg text-lifitseg-dark/70 leading-relaxed max-w-2xl">
              O veículo mudou. A utilização mudou. A empresa cresceu. O valor da renovação aumentou. Ou simplesmente ficou difícil entender se sua proteção ainda faz sentido. Antes de contratar ou renovar, vale olhar para o cenário completo.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => handleOpenModal('Seguro Auto')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-lifitseg-dark text-white font-semibold shadow-lg hover:bg-lifitseg-dark/90 transition-all cursor-pointer group text-base"
              >
                Quero revisar minha proteção
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => handleOpenModal('Seguro Auto')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-transparent border border-lifitseg-dark/20 text-lifitseg-dark font-semibold hover:bg-black/5 transition-all cursor-pointer text-sm"
              >
                Estou procurando um seguro
              </button>
            </div>
          </div>

          {/* IMAGEM E ELEMENTO VISUAL SOBREPOSTO */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/10 aspect-[4/3] bg-lifitseg-dark/5">
              <img
                src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1000"
                alt="Consultor em conversa profissional com contexto automotivo"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Quadro visual sobreposto */}
            <div className="absolute -bottom-6 -left-6 sm:left-6 bg-white p-5 rounded-2xl shadow-xl border border-black/10 max-w-xs space-y-1 hidden sm:block">
              <div className="text-xs font-bold tracking-wider text-primary uppercase">Uma proteção adequada começa pelo contexto</div>
              <div className="text-sm font-semibold text-lifitseg-dark">Veículo • Utilização • Perfil • Necessidade</div>
            </div>
          </div>
        </div>
      </section>

      {/* GANCHO IMEDIATO */}
      <section className="py-12 bg-[#F4F6F4] border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-lifitseg-dark">Nem todo problema começa no seguro.</h2>
            <p className="text-lifitseg-dark/70 text-sm max-w-2xl mx-auto">
              Às vezes, o veículo mudou. Às vezes, a utilização mudou. Às vezes, a operação cresceu. E às vezes o contrato simplesmente deixou de acompanhar tudo isso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-black/5 space-y-2">
              <h3 className="font-bold text-base text-lifitseg-dark">Meu seguro encareceu</h3>
              <p className="text-xs text-lifitseg-dark/70 leading-relaxed">A renovação chegou e o valor não parece mais fazer sentido.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-black/5 space-y-2">
              <h3 className="font-bold text-base text-lifitseg-dark">Minha necessidade mudou</h3>
              <p className="text-xs text-lifitseg-dark/70 leading-relaxed">Troquei de veículo, mudei a utilização ou minha realidade mudou.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-black/5 space-y-2">
              <h3 className="font-bold text-base text-lifitseg-dark">Minha operação cresceu</h3>
              <p className="text-xs text-lifitseg-dark/70 leading-relaxed">Mais veículos, mais pessoas, mais exposição e mais responsabilidade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO — "VOCÊ ESTÁ AQUI POR QUAL MOTIVO?" */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-lifitseg-dark">
              O que trouxe você até aqui?
            </h2>
            <p className="text-lifitseg-dark/60 text-base">
              Identifique sua situação atual para direcionarmos a conversa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Caminho 01 */}
            <div className="p-8 rounded-3xl bg-[#F4F6F4] border border-black/5 flex flex-col justify-between space-y-6 hover:border-primary/40 transition-all group">
              <div className="space-y-3">
                <div className="text-primary font-mono font-extrabold text-xl">01</div>
                <h3 className="font-bold text-xl text-lifitseg-dark">MEU SEGURO VAI RENOVAR</h3>
                <p className="text-sm text-lifitseg-dark/70 leading-relaxed">
                  O valor mudou e você quer entender se vale renovar ou avaliar alternativas.
                </p>
              </div>
              <button
                onClick={() => handleOpenModal('Seguro Auto')}
                className="inline-flex items-center gap-2 text-xs font-bold text-lifitseg-dark hover:text-primary transition-colors cursor-pointer pt-2 group-hover:translate-x-1 duration-200"
              >
                Quero revisar minha renovação <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Caminho 02 */}
            <div className="p-8 rounded-3xl bg-[#F4F6F4] border border-black/5 flex flex-col justify-between space-y-6 hover:border-primary/40 transition-all group">
              <div className="space-y-3">
                <div className="text-primary font-mono font-extrabold text-xl">02</div>
                <h3 className="font-bold text-xl text-lifitseg-dark">PRECISO SEGURAR UM VEÍCULO</h3>
                <p className="text-sm text-lifitseg-dark/70 leading-relaxed">
                  Comprou, trocou ou precisa contratar uma proteção para seu veículo?
                </p>
              </div>
              <button
                onClick={() => handleOpenModal('Seguro Auto')}
                className="inline-flex items-center gap-2 text-xs font-bold text-lifitseg-dark hover:text-primary transition-colors cursor-pointer pt-2 group-hover:translate-x-1 duration-200"
              >
                Quero encontrar uma opção <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Caminho 03 */}
            <div className="p-8 rounded-3xl bg-[#F4F6F4] border border-black/5 flex flex-col justify-between space-y-6 hover:border-primary/40 transition-all group">
              <div className="space-y-3">
                <div className="text-primary font-mono font-extrabold text-xl">03</div>
                <h3 className="font-bold text-xl text-lifitseg-dark">TENHO UMA EMPRESA</h3>
                <p className="text-sm text-lifitseg-dark/70 leading-relaxed">
                  Veículos fazem parte da rotina da empresa e precisam estar protegidos de acordo com a operação.
                </p>
              </div>
              <button
                onClick={() => handleOpenModal('Seguro Frota')}
                className="inline-flex items-center gap-2 text-xs font-bold text-lifitseg-dark hover:text-primary transition-colors cursor-pointer pt-2 group-hover:translate-x-1 duration-200"
              >
                Quero conversar sobre minha empresa <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Caminho 04 */}
            <div className="p-8 rounded-3xl bg-[#F4F6F4] border border-black/5 flex flex-col justify-between space-y-6 hover:border-primary/40 transition-all group">
              <div className="space-y-3">
                <div className="text-primary font-mono font-extrabold text-xl">04</div>
                <h3 className="font-bold text-xl text-lifitseg-dark">TENHO UMA FROTA</h3>
                <p className="text-sm text-lifitseg-dark/70 leading-relaxed">
                  Quando existem vários veículos, a decisão deixa de ser apenas sobre uma apólice.
                </p>
              </div>
              <button
                onClick={() => handleOpenModal('Seguro Frota')}
                className="inline-flex items-center gap-2 text-xs font-bold text-lifitseg-dark hover:text-primary transition-colors cursor-pointer pt-2 group-hover:translate-x-1 duration-200"
              >
                Quero conversar sobre minha frota <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MOMENTO DE IMPACTO (ESCURO) */}
      <section className="py-24 bg-lifitseg-dark text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Um veículo é um bem.
          </h2>
          <p className="text-xl sm:text-2xl text-primary font-semibold">
            Uma frota pode ser parte da operação.
          </p>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto pt-4">
            Por isso, a análise muda conforme aquilo que está sendo protegido, como o veículo é utilizado e qual impacto uma ocorrência pode causar na rotina de quem depende dele.
          </p>
        </div>
      </section>

      {/* AUTO — PESSOA FÍSICA */}
      <section className="py-20 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-lifitseg-dark">
              Para quem quer proteger o próprio veículo sem escolher no escuro.
            </h2>
            <p className="text-lifitseg-dark/70 leading-relaxed text-base">
              Seguro Auto não precisa ser uma escolha feita apenas olhando preço. Coberturas, franquia, assistência, perfil de utilização e condições da contratação podem fazer diferença quando você realmente precisa usar o seguro.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { title: 'Renovação', desc: 'Seu seguro ficou mais caro?' },
                { title: 'Troca de veículo', desc: 'Mudou de carro e precisa rever sua proteção?' },
                { title: 'Primeiro seguro', desc: 'Não sabe exatamente o que precisa contratar?' },
                { title: 'Troca de seguradora', desc: 'Está avaliando outras alternativas?' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F4F6F4] border border-black/5 space-y-1">
                  <h3 className="font-bold text-sm text-lifitseg-dark">{item.title}</h3>
                  <p className="text-xs text-lifitseg-dark/70">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => handleOpenModal('Seguro Auto')}
                className="inline-flex items-center gap-2 text-sm font-bold text-lifitseg-dark hover:text-primary transition-colors cursor-pointer group"
              >
                Quero conversar sobre meu Auto
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/10 aspect-[4/3] bg-[#F4F6F4]">
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1000"
                alt="Pessoa em situação real com veículo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FROTA — EMPRESAS */}
      <section className="py-20 bg-[#F4F6F4] border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/10 aspect-[4/3] bg-white">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000"
                alt="Ambiente empresarial e logístico com múltiplos veículos"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-lifitseg-dark">
              Quando os veículos fazem parte da operação, a análise precisa ir além do veículo.
            </h2>
            <p className="text-lifitseg-dark/70 leading-relaxed text-base">
              Uma frota envolve utilização, perfil de operação, quantidade de veículos, condutores e impacto financeiro de uma ocorrência. A proteção precisa acompanhar essa realidade.
            </p>
            <div className="text-xs font-mono font-bold tracking-wider text-primary uppercase bg-white px-3 py-1.5 rounded-lg inline-block border border-black/5">
              VEÍCULOS + UTILIZAÇÃO + OPERAÇÃO + PROTEÇÃO
            </div>
            <div className="space-y-3 pt-2">
              {[
                { title: 'Análise da operação', desc: 'Entender como os veículos são utilizados.' },
                { title: 'Estrutura da frota', desc: 'Avaliar o conjunto, não apenas um veículo isolado.' },
                { title: 'Proteção', desc: 'Considerar as necessidades da operação.' },
                { title: 'Acompanhamento', desc: 'Manter o relacionamento depois da contratação.' },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-black/5">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm text-lifitseg-dark">{f.title}</h3>
                    <p className="text-xs text-lifitseg-dark/70">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <button
                onClick={() => handleOpenModal('Seguro Frota')}
                className="inline-flex items-center gap-2 text-sm font-bold text-lifitseg-dark hover:text-primary transition-colors cursor-pointer group"
              >
                Quero conversar sobre minha frota
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPORTADORES */}
      <section className="py-20 bg-white border-t border-black/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide">
            <Truck className="w-4 h-4" /> Operações de Transporte
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-lifitseg-dark">
            Se o veículo trabalha, o risco também faz parte da operação.
          </h2>
          <p className="text-lifitseg-dark/70 leading-relaxed text-base max-w-2xl mx-auto">
            Para quem transporta cargas, os seguros precisam ser analisados dentro da realidade da operação e das responsabilidades envolvidas.
          </p>
          <div className="bg-[#F4F6F4] p-6 rounded-2xl border border-black/5 max-w-xl mx-auto text-sm text-lifitseg-dark/80">
            Tem uma operação de transporte? Converse com um especialista para entender quais proteções fazem sentido para sua atividade.
          </div>
          <div className="pt-2">
            <button
              onClick={() => handleOpenModal('Seguro Frota')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lifitseg-dark text-white font-semibold hover:bg-lifitseg-dark/90 transition-all cursor-pointer text-sm shadow-md"
            >
              Quero falar sobre minha operação <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* NÃO SABE QUAL SEGURO PRECISA? */}
      <section className="py-20 bg-[#F4F6F4] border-t border-black/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-lifitseg-dark">
            Você não precisa chegar sabendo qual seguro contratar.
          </h2>
          <p className="text-lifitseg-dark/70 leading-relaxed text-base max-w-2xl mx-auto">
            Se você sabe o que precisa proteger, já temos por onde começar. Conte sua situação. Nós ajudamos a entender quais alternativas fazem sentido para ela.
          </p>
        </div>
      </section>

      {/* CONSULTORIA */}
      <section className="py-20 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <p className="text-primary font-bold text-sm tracking-wider uppercase">Nossa Abordagem</p>
            <h2 className="text-3xl font-bold tracking-tight text-lifitseg-dark">
              Nossa primeira pergunta não é "qual seguro você quer?". É "o que você precisa proteger?"
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 'ENTENDEMOS', desc: 'Veículo, pessoa, empresa ou operação.' },
              { step: 'ANALISAMOS', desc: 'Perfil, utilização e necessidade.' },
              { step: 'COMPARAMOS', desc: 'Alternativas compatíveis com o cenário.' },
              { step: 'ORIENTAMOS', desc: 'Você decide sabendo o que está contratando.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#F4F6F4] p-8 rounded-3xl border border-black/5 space-y-4 shadow-sm">
                <div className="text-primary font-mono font-extrabold text-xl">{item.step}</div>
                <p className="text-sm text-lifitseg-dark/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "PREÇO" — ABORDAGEM CORRETA */}
      <section className="py-16 bg-[#F4F6F4] border-t border-black/5">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
          <h2 className="text-2xl font-bold text-lifitseg-dark">
            Preço importa. Mas não é a única coisa que precisa caber na conta.
          </h2>
          <p className="text-lifitseg-dark/70 text-sm leading-relaxed max-w-xl mx-auto">
            Uma contratação pode parecer vantajosa até o momento em que uma cobertura importante não está disponível ou a proteção não acompanha a utilização real do veículo. Por isso, comparamos o cenário completo.
          </p>
        </div>
      </section>

      {/* SEÇÃO "ANTES DE RENOVAR" */}
      <section className="py-20 bg-white border-t border-black/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-lifitseg-dark text-white p-8 sm:p-12 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Atenção à renovação</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Sua renovação chegou? Não precisa aceitar automaticamente.
              </h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-xl">
                Antes de renovar, vale entender o que mudou no valor, nas condições e na proteção oferecida.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                'O veículo continua sendo utilizado da mesma forma?',
                'A cobertura continua adequada?',
                'O valor da renovação faz sentido?',
                'Sua realidade mudou?',
              ].map((chk, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {chk}
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => handleOpenModal('Seguro Auto')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-lifitseg-dark font-bold hover:bg-primary/90 transition-all cursor-pointer text-sm shadow-lg"
              >
                Quero revisar minha renovação <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIANÇA */}
      <section className="py-20 bg-[#F4F6F4] border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-lifitseg-dark">
              Você conversa com quem acompanha a decisão.
            </h2>
            <p className="text-lifitseg-dark/60 text-base">
              Da primeira análise ao acompanhamento posterior, a proposta é manter uma relação próxima e entender o contexto do cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Análise', desc: 'Entendimento profundo do seu perfil de utilização e necessidades reais.' },
              { title: 'Orientação', desc: 'Direcionamento claro sobre coberturas, franquias e operadoras.' },
              { title: 'Acompanhamento', desc: 'Suporte contínuo para qualquer demanda ao longo da vigência.' },
            ].map((c, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-black/5 space-y-3 shadow-sm">
                <h3 className="font-bold text-xl text-lifitseg-dark">{c.title}</h3>
                <p className="text-sm text-lifitseg-dark/70 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL (VERDE PROFUNDO) */}
      <section className="py-24 bg-lifitseg-dark text-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            O que você precisa proteger?
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
            Pode ser seu carro, sua família, seus veículos ou toda uma operação. Conte o que está acontecendo. A partir daí, conversamos sobre as possibilidades.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleOpenModal('Seguro Auto')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-lifitseg-dark font-bold hover:bg-primary/90 transition-all cursor-pointer text-base shadow-xl"
            >
              Quero conversar com um consultor
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleOpenModal('Seguro Frota')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-transparent border border-white/20 text-white font-semibold hover:bg-white/10 transition-all cursor-pointer text-sm"
            >
              Tenho uma frota
            </button>
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
        origem="lp-veiculos-frota"
        produtos={PRODUTOS_VEICULOS_FROTA}
      />
    </div>
  );
}