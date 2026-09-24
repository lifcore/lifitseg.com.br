// src/app/lp/saude-odonto/page.tsx
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { captureAndPersistUtms } from '@/utils/tracking';
import { DiagnosticoStepper } from '@/components/forms/DiagnosticoStepper';
import { siteConfig } from '@/config/site';
import { OPERADORAS_SAUDE } from '@/config/operadoras';

const linkWhatsapp = `https://wa.me/${siteConfig.contato.whatsapp}?text=${encodeURIComponent(
  'Olá! Vim pela página de Plano de Saúde Empresarial e prefiro falar direto com um consultor.'
)}`;

function irParaDiagnostico() {
  document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' });
}

export default function LandingPageSaudeOdonto() {
  useEffect(() => {
    captureAndPersistUtms();
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F6F4] text-lifitseg-dark font-sans selection:bg-primary/20 antialiased pb-20 sm:pb-0">
      {/* TOPBAR MÍNIMA DE LP */}
      <header className="border-b border-primary/20 bg-lifitseg-dark/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="LifitSeg" width={150} height={46} className="h-11 w-auto object-contain" priority />
          </Link>
          <div className="text-xs font-semibold uppercase tracking-wider text-lifitseg-offwhite/70 bg-white/10 px-3 py-1.5 rounded-full hidden sm:block">
            Gestão de Benefícios Corporativos
          </div>
        </div>
      </header>

      {/* HERO — dor + promessa, sem foto hotlinkada (performance/confiabilidade) */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-lifitseg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,187,68,0.12),transparent_45%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide">
            Atendimento Especializado LifitSeg
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
            Chega de renovar o plano de saúde no escuro.
          </h1>

          <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
            Aplicamos a mesma metodologia técnica — VCMH, sinistralidade e prática de mercado — que as operadoras usam pra justificar seu reajuste, e usamos isso a favor da negociação da sua empresa.
          </p>

          <div className="pt-4">
            <button
              onClick={irParaDiagnostico}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-lifitseg-dark font-bold shadow-lg hover:opacity-90 transition-all cursor-pointer group text-base"
            >
              Solicitar Diagnóstico
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-white/40 mt-3">Saúde Empresarial • Benefícios • Odontológico</p>
          </div>
        </div>
      </section>

      {/* BLOCO DE DOR */}
      <section className="py-20 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-lifitseg-dark">
              O problema nem sempre está no preço do plano.
            </h2>
            <p className="text-lifitseg-dark/60 text-base">
              Está na forma como ele é contratado e administrado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              'Reajuste elevado na renovação, sem explicação técnica clara',
              'Rede credenciada que encolhe, mas o preço só sobe',
              'Contrato sem estratégia de negociação',
              'RH sobrecarregado com demandas que deveriam ser da operadora',
              'Benefício caro e pouco percebido pelos colaboradores',
              'Falta de alternativas comparáveis de mercado',
            ].map((dor, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#F4F6F4] border border-black/5 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-lifitseg-dark">{dor}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-lg font-semibold text-lifitseg-dark max-w-2xl mx-auto mt-12">
            Plano de saúde empresarial não deveria ser apenas uma despesa mensal. É um benefício estratégico que precisa ser administrado.
          </p>
        </div>
      </section>

      {/* DIAGNÓSTICO — stepper, coração da conversão */}
      <section id="diagnostico" className="py-20 bg-lifitseg-dark-deep scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Descubra o que pode estar custando caro no seu plano.
            </h2>
            <p className="text-white/60 leading-relaxed">
              Responda algumas perguntas rápidas sobre o contrato atual da sua empresa. Não é uma cotação — é um raio-x inicial do seu cenário, pra saber por onde começar.
            </p>
          </div>
          <div className="lg:col-span-7 max-w-xl w-full lg:ml-auto">
            <DiagnosticoStepper />
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-20 bg-[#F4F6F4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-lifitseg-dark">Do diagnóstico à gestão</h2>
            <p className="text-lifitseg-dark/60">Um processo estruturado, sem letra miúda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'ENTENDEMOS', desc: 'Perfil da empresa, vidas, contrato atual e objetivos.' },
              { step: '02', title: 'ANALISAMOS', desc: 'Contrato, reajuste, sinistralidade e condições comerciais.' },
              { step: '03', title: 'NEGOCIAMOS', desc: 'Buscamos melhores condições — na operadora atual ou em alternativas de mercado.' },
              { step: '04', title: 'ACOMPANHAMOS', desc: 'Gestão contínua do contrato via LifitSeg + Lifcore, do RH aos colaboradores.' },
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

      {/* A DIFERENÇA LIFITSEG */}
      <section className="py-20 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-lifitseg-dark">
              Mais do que vender um plano. Ajudamos sua empresa a administrar o benefício.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { title: 'Consultoria', desc: 'Estratégia de contratação, comparação de alternativas e negociação.' },
              { title: 'Gestão', desc: 'Acompanhamento do contrato e das movimentações — inclusões, exclusões, alterações.' },
              { title: 'Pós-venda', desc: 'Com a LifitSeg, suas demandas de plano deixam de ser só suas — nossa equipe vira um braço de apoio ao seu RH durante toda a vigência do contrato.' },
              { title: 'Inteligência', desc: 'Dados e análise técnica de contrato e sinistralidade para apoiar cada decisão.' },
              { title: 'Odontológico', desc: 'Estruturamos o benefício de saúde junto ao odontológico, quando fizer sentido pro perfil da empresa.' },
            ].map((c, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#F4F6F4] border border-black/5 space-y-2">
                <h3 className="font-bold text-lg text-lifitseg-dark">{c.title}</h3>
                <p className="text-xs text-lifitseg-dark/70 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REAJUSTE — bloco de autoridade */}
      <section className="py-24 bg-lifitseg-dark text-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Sua empresa recebeu um reajuste. E agora?
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Explicamos a diferença entre reajuste por sinistralidade e reajuste contratual, analisamos o histórico do contrato e comparamos alternativas de mercado compatíveis com o porte da sua empresa — antes de você aceitar qualquer proposta de renovação.
          </p>
          <p className="text-primary font-semibold text-lg">
            Não aceite um reajuste antes de entender o que está sendo reajustado.
          </p>
          <div className="pt-2">
            <button
              onClick={irParaDiagnostico}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-lifitseg-dark font-bold hover:opacity-90 transition-all cursor-pointer text-base shadow-xl"
            >
              Quero analisar meu reajuste
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* TIPOS DE CONTRATO */}
      <section className="py-20 bg-[#F4F6F4] border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-lifitseg-dark">Qual é o perfil do seu contrato?</h2>
            <p className="text-lifitseg-dark/60 text-base">
              Cada faixa de vidas tem dinâmicas comerciais e contratuais diferentes — inclusive no espaço de negociação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { faixa: '2 a 29 vidas', desc: 'Regras específicas de agrupamento e reajuste — menor margem individual, mas ainda assim negociável.' },
              { faixa: '30 a 99 vidas', desc: 'Maior espaço para negociação e análise comparativa entre operadoras.' },
              { faixa: '100+ vidas', desc: 'Contratos com maior possibilidade de estruturação personalizada e negociação direta.' },
            ].map((c, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-black/5 shadow-sm space-y-3">
                <h3 className="font-bold text-xl text-lifitseg-dark">{c.faixa}</h3>
                <p className="text-sm text-lifitseg-dark/70 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIANÇA / AUTORIDADE VERIFICÁVEL */}
      <section className="py-16 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <p className="mb-8 text-center text-xs font-bold tracking-widest text-lifitseg-dark/50 uppercase">
            Independência técnica com acesso às principais operadoras de Saúde do mercado
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {OPERADORAS_SAUDE.map((op) => (
              <div
                key={op.file}
                className={`flex flex-col items-center justify-center rounded-2xl border bg-white px-5 py-4 text-center shadow-sm transition-all hover:shadow-md ${
                  op.destaque ? 'border-primary/30 hover:border-primary/60' : 'border-black/10 hover:border-primary/40'
                }`}
              >
                <div className="relative mb-3 flex h-10 w-24 items-center justify-center">
                  <Image
                    src={`/seguradoras/${op.file}.png`}
                    alt={op.name}
                    width={96}
                    height={40}
                    className="max-h-10 w-auto object-contain"
                  />
                </div>
                <span className="text-xs font-bold tracking-tight text-lifitseg-dark/80">{op.name}</span>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm font-semibold text-lifitseg-dark/60">
            LifitSeg Consultoria &amp; Corretagem de Seguros — Registro SUSEP nº {siteConfig.juridico.registroSusep}
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-lifitseg-dark text-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Vamos descobrir se sua empresa está pagando o valor certo pelo benefício certo?
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
            Leva menos de 2 minutos. Sem compromisso, sem custo pra empresa.
          </p>
          <div className="pt-4">
            <button
              onClick={irParaDiagnostico}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-lifitseg-dark font-bold hover:opacity-90 transition-all cursor-pointer text-base shadow-xl"
            >
              Solicitar Diagnóstico
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={linkWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white/80 block"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Ou fale direto com um consultor pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* RODAPÉ MÍNIMO */}
      <footer className="py-8 bg-white border-t border-black/5 text-center text-xs text-lifitseg-dark/50">
        <p>Privacidade | LifitSeg — Todos os direitos reservados.</p>
      </footer>

      {/* CTA FIXO MOBILE */}
      <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-primary px-4 py-3 flex items-center justify-between gap-3 shadow-2xl">
        <button
          onClick={irParaDiagnostico}
          className="flex-1 text-center font-bold text-lifitseg-dark text-sm cursor-pointer"
        >
          Solicitar Diagnóstico →
        </button>
        <a
          href={linkWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fale conosco pelo WhatsApp"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
