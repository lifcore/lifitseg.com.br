'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Truck, Car, Shield, ArrowRight, CheckCircle2, Wrench } from 'lucide-react';
import { captureAndPersistUtms } from '@/utils/tracking';
import { LeadModal } from '@/components/forms/LeadModal'; // Reutilização obrigatória — named export, caminho real do componente

// Lista fechada de produtos desta LP — nunca cai no fallback genérico
// do LeadModal (que é focado em Saúde). Sem isso, o seletor
// "Interesse Principal" mostraria produto errado numa LP de Auto/Frota.
const PRODUTOS_VEICULOS_FROTA = [
  'Seguro Auto Pessoal',
  'Seguro Frota Corporativa',
  'Seguro de Veículos Utilitários',
  'Seguro para Transportadores',
]

export default function LandingPageVeiculosFrota() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('Seguro Frota Corporativa');

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
      <header className="border-b border-primary/20 bg-lifitseg-dark/95 backdrop-blur-md sticky top-0 z-40">
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
              <Truck className="w-4 h-4" /> Gestão de Frotas & Seguro Auto
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-lifitseg-dark leading-[1.1]">
              Proteção para seu veículo. Gestão para sua frota.
            </h1>
            <p className="text-lg text-lifitseg-dark/70 leading-relaxed max-w-2xl">
              Do veículo de uso pessoal às operações complexas com múltiplos veículos, analisamos o perfil de risco e apresentamos soluções compatíveis com a necessidade de cada cliente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => handleOpenModal('Seguro Frota Corporativa')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-lifitseg-dark text-white font-semibold shadow-lg hover:bg-lifitseg-dark/90 transition-all cursor-pointer group"
              >
                Solicitar Análise de Frotas/Auto
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/10 aspect-[4/3] bg-lifitseg-dark/5">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000"
                alt="Operação logística e frota veicular"
                className="w-full h-full object-cover"
              />
              {/* TODO conteúdo: trocar por next/image + asset próprio antes de ir ao ar — hotlink Unsplash é só placeholder */}
            </div>
          </div>
        </div>
      </section>

      {/* PARA CADA NECESSIDADE */}
      <section className="py-16 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Soluções adaptadas a cada escala</h2>
            <p className="text-lifitseg-dark/60 mt-2">Abordagem técnica direcionada tanto para o patrimônio individual quanto para o parque logístico.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Seguro Auto Pessoal', desc: 'Proteção personalizada e assistência dedicada para veículos particulares.' },
              { title: 'Frotas Corporativas', desc: 'Controle de sinistralidade, coberturas robustas e otimização de custos.' },
              { title: 'Veículos Utilitários', desc: 'Garantia de continuidade operacional para o comércio e serviços.' },
              { title: 'Transportadores', desc: 'Soluções integradas de responsabilidade e salvaguarda de ativos.' },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#F4F6F4] border border-black/5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-lifitseg-dark/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTORIA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Mitigação de riscos e inteligência patrimonial</h2>
            <p className="text-lifitseg-dark/70 leading-relaxed">
              Gerenciar uma frota ou proteger um veículo exige mais do que uma apólice padrão. Avaliamos perfil de motoristas, rotas, franquias adequadas e exigências contratuais para garantir estabilidade operacional.
            </p>
            <ul className="space-y-3">
              {['Gestão consultiva de sinistros', 'Avaliação de perfil e perfil de risco', 'Otimização de custos sem perda de cobertura'].map((el, i) => (
                <li key={i} className="flex items-center gap-3 font-medium text-lifitseg-dark">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> {el}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-lifitseg-dark text-white p-8 lg:p-10 rounded-3xl space-y-6 shadow-xl">
            <h3 className="text-2xl font-bold">Fale com um especialista em frotas</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Entenda como podemos estruturar a proteção ideal para o seu veículo particular ou para a frota da sua empresa com total segurança consultiva.
            </p>
            <button
              onClick={() => handleOpenModal('Seguro Frota Corporativa')}
              className="w-full py-4 rounded-xl bg-primary text-lifitseg-dark font-bold hover:bg-primary/90 transition-all cursor-pointer"
            >
              Iniciar Conversa Consultiva
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
        origem="lp-veiculos-frota"
        produtos={PRODUTOS_VEICULOS_FROTA}
      />
    </div>
  );
}
