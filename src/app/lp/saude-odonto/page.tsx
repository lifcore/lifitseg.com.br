'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, HeartPulse, Users, Stethoscope, ArrowRight, CheckCircle2, TrendingDown, CalendarClock, MessageCircleWarning, UserX } from 'lucide-react';
import { captureAndPersistUtms } from '@/utils/tracking';
import { LeadModal } from '@/components/forms/LeadModal'; // Reutilização obrigatória — named export, caminho real do componente

// Lista fechada de produtos desta LP — nunca cai no fallback genérico
// do LeadModal (que inclui Auto/Frota). Sem isso, o seletor
// "Interesse Principal" mostraria produto errado numa LP de Saúde.
const PRODUTOS_SAUDE_ODONTO = [
  'Plano de Saúde Empresarial',
  'Plano Odontológico Empresarial',
  'Plano de Saúde Individual/Familiar',
  'Seguro de Vida em Grupo',
]

export default function LandingPageSaudeOdonto() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('Plano de Saúde Empresarial');

  useEffect(() => {
    captureAndPersistUtms();
  }, []);

  const handleOpenModal = (productDefault: string) => {
    setSelectedProduct(productDefault);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F4] text-lifitseg-dark font-sans selection:bg-primary/20">
      {/* Topbar mínima de LP */}
      <header className="border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="LifitSeg" width={150} height={46} className="h-11 w-auto object-contain" priority />
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide">
              <TrendingDown className="w-4 h-4" /> Revisão sem compromisso
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-lifitseg-dark leading-[1.1]">
              Pagando cada vez mais caro e recebendo cada vez menos suporte do seu plano de saúde?
            </h1>
            <p className="text-lg text-lifitseg-dark/70 leading-relaxed max-w-2xl">
              Reajuste alto, demora pra marcar consulta ou exame, e ninguém do outro lado da linha pra resolver de verdade. Analisamos seu plano atual e mostramos, sem custo, se existe uma alternativa que resolve isso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => handleOpenModal('Plano de Saúde Empresarial')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-lifitseg-dark text-white font-semibold shadow-lg hover:bg-lifitseg-dark/90 transition-all cursor-pointer group"
              >
                Quero Revisar Meu Plano
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/10 aspect-[4/3] bg-lifitseg-dark/5">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000"
                alt="Atendimento consultivo em saúde"
                className="w-full h-full object-cover"
              />
              {/* TODO conteúdo: trocar por next/image + asset próprio antes de ir ao ar — hotlink Unsplash é só placeholder */}
            </div>
          </div>
        </div>
      </section>

      {/* DORES REAIS */}
      <section className="py-16 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Reconhece algum destes problemas?</h2>
            <p className="text-lifitseg-dark/60 mt-2">São os motivos mais comuns pelos quais famílias e empresas nos procuram.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingDown, title: 'Reajustes Altos', desc: 'O valor sobe todo ano e ninguém explica exatamente por quê — nem se dá pra pagar menos em outro lugar.' },
              { icon: CalendarClock, title: 'Demora no Atendimento', desc: 'Marcar consulta ou exame virou uma via-crúcis, e o problema de saúde não espera.' },
              { icon: MessageCircleWarning, title: 'Falta de Informação', desc: 'Perguntas simples sobre cobertura e carência sem resposta clara de ninguém.' },
              { icon: UserX, title: 'Sem Suporte de Verdade', desc: 'Corretor que só aparece na hora da venda e some quando você precisa de ajuda de verdade.' },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="p-6 rounded-2xl bg-[#F4F6F4] border border-black/5 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-lifitseg-dark/70 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ABORDAGEM CONSULTIVA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Como resolvemos cada um desses problemas</h2>
            <p className="text-lifitseg-dark/70 leading-relaxed">
              Não acreditamos em catálogos engessados ou venda empurrada. Auditamos o plano atual, mapeamos onde o reajuste e a rede estão pesando no seu bolso, e negociamos com operadoras qualificadas uma alternativa real — com alguém que continua respondendo depois que você contrata.
            </p>
            <ul className="space-y-3">
              {['Análise técnica de rede credenciada', 'Estudo de coparticipação inteligente', 'Suporte contínuo na gestão de vidas'].map((el, i) => (
                <li key={i} className="flex items-center gap-3 font-medium text-lifitseg-dark">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> {el}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-lifitseg-dark text-white p-8 lg:p-10 rounded-3xl space-y-6 shadow-xl">
            <h3 className="text-2xl font-bold">Inicie sua conversa especializada</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Converse com especialistas orientados a entender a sua real necessidade, seja para reestruturar o plano da sua empresa ou escolher a melhor opção pessoal.
            </p>
            <button
              onClick={() => handleOpenModal('Plano de Saúde Empresarial')}
              className="w-full py-4 rounded-xl bg-primary text-lifitseg-dark font-bold hover:bg-primary/90 transition-all cursor-pointer"
            >
              Falar com um Consultor
            </button>
          </div>
        </div>
      </section>

      {/* RODAPÉ MÍNIMO */}
      <footer className="py-8 bg-white border-t border-black/5 text-center text-xs text-lifitseg-dark/50">
        <p>Privacidade | LifitSeg — Todos os direitos reservados.</p>
      </footer>

      {/* LEAD MODAL — nomes de prop batendo com o componente real (defaultProduto/origem/produtos, em português) */}
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
