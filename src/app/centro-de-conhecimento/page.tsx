'use client';

import { useState } from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import { LeadModal } from '@/components/forms/LeadModal';
import { ArrowRight } from 'lucide-react';

export default function CentroConhecimentoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const handleOpenLeadModal = () => {
    setIsModalOpen(true);
  };

  const breadcrumbItems = [
    { label: 'Institucional', href: '#' },
    { label: 'Centro de Conhecimento', href: null },
  ];

  // Categorias do Centro de Conhecimento
  const categories = [
    'Todos',
    'Benefícios Corporativos',
    'Plano de Saúde',
    'Plano Odontológico',
    'Seguro Auto',
    'Seguro Empresarial',
    'Seguro de Vida',
    'Gestão de Riscos',
    'Legislação',
    'ANS',
    'Mercado Segurador',
  ];

  // Artigos de Exemplo
  const articles = [
    {
      id: 1,
      category: 'Plano de Saúde',
      title: 'Como avaliar a sinistralidade do seu plano de saúde empresarial',
      summary: 'Entenda os indicadores fundamentais que influenciam o reajuste anual e descubra como gerenciar a saúde populacional da sua equipe.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
      readTime: '4 min de leitura',
    },
    {
      id: 2,
      category: 'Benefícios Corporativos',
      title: 'Estratégias de retenção de talentos através de pacotes de benefícios estruturados',
      summary: 'Descubra como alinhar o orçamento corporativo a um ecossistema de benefícios que realmente agregue valor percebido pelos colaboradores.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
      readTime: '6 min de leitura',
    },
    {
      id: 3,
      category: 'Seguro Empresarial',
      title: 'Responsabilidade Civil D&O: Proteção patrimonial para executivos e diretores',
      summary: 'Saiba por que a cobertura de RC para administradores se tornou indispensável na governança corporativa moderna.',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
      readTime: '5 min de leitura',
    },
    {
      id: 4,
      category: 'ANS',
      title: 'Resoluções Normativas da ANS: O que muda para as PMEs em 2026',
      summary: 'Um panorama regulatório prático sobre as novas diretrizes da agência reguladora e seus reflexos nos contratos coletivos.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
      readTime: '7 min de leitura',
    },
  ];

  const filteredArticles = selectedCategory === 'Todos' ? articles : articles.filter((a) => a.category === selectedCategory);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      {/* SEÇÃO 1 — HERO (Verde) */}
      <section className="relative py-24 lg:py-32 bg-[#05191b] text-[#F7F4EF] border-b border-[#E0A63D]/20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#0b3337] text-[#E0A63D] text-xs font-bold uppercase tracking-widest mb-6 border border-[#E0A63D]/30 shadow-sm">
            Biblioteca Técnica
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-8 leading-tight">
            Centro de Conhecimento
          </h1>
          <p className="text-base sm:text-lg text-[#F7F4EF]/80 max-w-2xl mx-auto leading-relaxed font-normal">
            Artigos, análises regulatórias e guias práticos elaborados por especialistas para auxiliar gestores de RH, diretores e tomadores de decisão.
          </p>
        </div>
      </section>

      {/* SEÇÃO 2 — ARTIGOS (Branco) */}
      <section className="py-24 bg-white border-b border-[#05191b]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filtro de Categorias */}
          <div className="flex flex-wrap gap-2 mb-12 pb-4 border-b border-[#05191b]/10">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#05191b] text-[#E0A63D] shadow-md'
                    : 'bg-[#F7F4EF] text-[#05191b]/70 hover:bg-[#05191b]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid de Artigos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-[#F7F4EF]/50 rounded-2xl border border-[#05191b]/10 overflow-hidden hover:border-[#E0A63D]/50 hover:shadow-xl transition-all flex flex-col justify-between group">
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-[#05191b] text-[#E0A63D] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="text-[11px] text-[#05191b]/50 mb-2 font-mono">{article.readTime}</div>
                    <h3 className="text-base font-bold text-[#05191b] mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-xs text-[#05191b]/60 leading-relaxed line-clamp-3 mb-4">{article.summary}</p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-0">
                  <button
                    onClick={handleOpenLeadModal}
                    className="flex items-center gap-2 text-[#E0A63D] text-xs font-bold hover:text-[#0b3337] transition-colors"
                  >
                    Leia mais
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 — CTA (Verde) */}
      <section className="relative py-28 bg-[#05191b] overflow-hidden border-t border-[#E0A63D]/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#0b3337] text-[#E0A63D] text-xs font-bold uppercase tracking-widest mb-6 border border-[#E0A63D]/30">
            Próximo Passo
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#F7F4EF] mb-6 tracking-tight">
            Quer uma análise técnica da sua estrutura atual?
          </h2>
          <p className="text-[#F7F4EF]/70 text-base sm:text-lg mb-10 leading-relaxed font-light">
            Fale com um especialista e receba um diagnóstico sem compromisso.
          </p>
          <button
            onClick={handleOpenLeadModal}
            className="bg-[#E0A63D] hover:bg-[#c99333] text-[#05191b] font-bold px-10 py-4 rounded-xl transition-all shadow-2xl shadow-[#E0A63D]/20 text-base"
          >
            Falar com um Especialista
          </button>
        </div>
      </section>

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} origem="centro-de-conhecimento" />
    </>
  );
}
