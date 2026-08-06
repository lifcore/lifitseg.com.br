'use client';

import { useState } from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import { LeadModal } from '@/components/forms/LeadModal';
import {
  ShieldCheck,
  Users,
  BookOpen,
  Eye,
  TrendingUp,
  HeartHandshake,
  Lock,
  Award,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Clock,
} from 'lucide-react';

export default function SobrePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleOpenLeadModal = () => {
    setIsModalOpen(true);
  };

  const breadcrumbItems = [
    { label: 'Institucional', href: '#' },
    { label: 'Sobre a LifitSeg', href: null },
  ];

  // Dados dos Valores (2x4 cards)
  const values = [
    { icon: <ShieldCheck className="w-6 h-6 text-[#E0A63D]" />, title: 'Ética', desc: 'Integridade absoluta em cada recomendação e dado tratado.' },
    { icon: <Users className="w-6 h-6 text-[#E0A63D]" />, title: 'Atenção', desc: 'Olhar genuíno e individualizado para cada detalhe da operação.' },
    { icon: <BookOpen className="w-6 h-6 text-[#E0A63D]" />, title: 'Conhecimento', desc: 'Embasamento técnico atuarial e regulatório em primeiro lugar.' },
    { icon: <Eye className="w-6 h-6 text-[#E0A63D]" />, title: 'Transparência', desc: 'Clareza cristalina em custos, contratos e cenários.' },
    { icon: <TrendingUp className="w-6 h-6 text-[#E0A63D]" />, title: 'Evolução Contínua', desc: 'Busca constante por inovação de processos e governança.' },
    { icon: <HeartHandshake className="w-6 h-6 text-[#E0A63D]" />, title: 'Relacionamento', desc: 'Parcerias de longo prazo construídas sobre confiança.' },
    { icon: <Lock className="w-6 h-6 text-[#E0A63D]" />, title: 'Responsabilidade', desc: 'Zelo estrito pela segurança financeira de pessoas e empresas.' },
    { icon: <Award className="w-6 h-6 text-[#E0A63D]" />, title: 'Comprometimento', desc: 'Presença ativa do diagnóstico inicial até o suporte diário.' },
  ];

  // FAQs Institucionais
  const faqs = [
    {
      q: 'Como funciona o atendimento da LifitSeg?',
      a: 'Nosso atendimento é estruturado no modelo consultivo partner-to-partner. Cada cliente possui um executivo dedicado que compreende a operação a fundo, unindo análise técnica de dados com proximidade no relacionamento.',
    },
    {
      q: 'A LifitSeg atende todo o Brasil?',
      a: 'Sim. Contamos com infraestrutura digital e parcerias estratégicas homologadas com as maiores operadoras e seguradoras do país, prestando suporte corporativo em âmbito nacional.',
    },
    {
      q: 'Como entrar em contato com a equipe?',
      a: 'Você pode falar conosco diretamente através do WhatsApp corporativo, e-mail dedicado, preenchendo o formulário de contato nesta página ou agendando uma reunião técnica com um de nossos especialistas.',
    },
    {
      q: 'Quais soluções a empresa oferece?',
      a: 'Oferecemos gestão completa em Benefícios Corporativos (Planos de Saúde, Odontológicos e Apoio ao RH) e um leque robusto de Soluções em Seguros (Auto, Frota, Empresarial, Responsabilidade Civil, Vida e Riscos Especiais).',
    },
    {
      q: 'Como solicitar uma consultoria para minha empresa?',
      a: 'Basta clicar em qualquer botão de "Falar com um Especialista" ou preencher nosso formulário de contato. Nossa equipe realizará um diagnóstico inicial sem compromisso da sua estrutura atual.',
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      {/* SEÇÃO 1 — HERO (Verde) */}
      <section className="relative py-24 lg:py-32 bg-[#05191b] text-[#F7F4EF] border-b border-[#E0A63D]/20 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600"
            alt="Equipe reunida em ambiente corporativo moderno"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#0b3337] text-[#E0A63D] text-xs font-bold uppercase tracking-widest mb-6 border border-[#E0A63D]/30 shadow-sm">
            Sobre a LifitSeg
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-8 leading-tight">
            Conhecimento, relacionamento e evolução contínua fazem parte da nossa forma de trabalhar.
          </h1>
          <p className="text-base sm:text-lg text-[#F7F4EF]/80 max-w-2xl mx-auto leading-relaxed font-normal">
            A LifitSeg nasceu com o propósito de oferecer uma consultoria próxima, técnica e comprometida com a gestão de benefícios e seguros. Ao longo da nossa trajetória buscamos construir relações duradouras, compartilhar conhecimento e apoiar nossos clientes em decisões cada vez mais conscientes.
          </p>
        </div>
      </section>

      {/* SEÇÃO 2 — QUEM SOMOS (Branco) */}
      <section className="py-24 bg-white border-b border-[#05191b]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="space-y-6">
              <span className="text-[#05191b] font-bold tracking-widest text-xs uppercase bg-[#E0A63D]/10 px-3 py-1 rounded-full border border-[#E0A63D]/30">
                Apresentação Institucional
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#05191b] leading-tight">Quem Somos</h2>
              <div className="space-y-4 text-[#05191b]/70 text-base leading-relaxed">
                <p>
                  <strong className="text-[#05191b]">História:</strong> Fundada com a convicção de que o mercado corporativo precisava de uma consultoria independente e focada em técnica atuarial, a LifitSeg construiu uma reputação sólida baseada em governança e clareza.
                </p>
                <p>
                  <strong className="text-[#05191b]">Propósito:</strong> Descomplicar a gestão de riscos e benefícios, garantindo estabilidade financeira para empresas e máxima segurança para os colaboradores.
                </p>
                <p>
                  <strong className="text-[#05191b]">Forma de atuação:</strong> Trabalhamos lado a lado com os gestores, utilizando inteligência analítica para tomada de decisões seguras.
                </p>
                <p>
                  <strong className="text-[#05191b]">Filosofia consultiva:</strong> Não vendemos produtos de prateleira; encaixamos exatamente a solução necessária para a realidade exata da organização.
                </p>
              </div>
              <div className="pt-4">
                <button
                  onClick={handleOpenLeadModal}
                  className="bg-[#0b3337] hover:bg-[#05191b] text-[#F7F4EF] font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm"
                >
                  Conheça nossa metodologia
                </button>
              </div>
            </div>

            <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-[#05191b]/10">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200"
                alt="Escritório ou reunião da equipe LifitSeg"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 — NOSSOS VALORES (Off White) */}
      <section className="py-24 bg-[#F7F4EF] border-b border-[#05191b]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#0b3337] font-bold tracking-widest text-xs uppercase bg-[#0b3337]/5 px-3 py-1 rounded-full border border-[#0b3337]/10">
              Pilares Culturais
            </span>
            <h2 className="text-3xl font-black text-[#05191b] mt-4 mb-3">Nossos Valores</h2>
            <p className="text-[#05191b]/60 text-sm">Os princípios inegociáveis que guiam cada entrega da nossa equipe.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white border border-[#05191b]/10 p-8 rounded-2xl hover:border-[#E0A63D]/50 hover:shadow-xl hover:shadow-[#05191b]/5 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0b3337]/5 flex items-center justify-center mb-6">
                    {val.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#05191b] mb-2">{val.title}</h3>
                  <p className="text-xs text-[#05191b]/60 leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 4 — TRABALHE CONOSCO (Off White) */}
      <section className="py-24 bg-[#F7F4EF] border-b border-[#05191b]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl border border-[#05191b]/10">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200"
                alt="Equipe trabalhando na LifitSeg"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <span className="text-[#0b3337] font-bold tracking-widest text-xs uppercase bg-[#0b3337]/5 px-3 py-1 rounded-full border border-[#0b3337]/10">
                Carreiras
              </span>
              <h2 className="text-3xl font-black text-[#05191b] leading-tight">Quer fazer parte da nossa equipe?</h2>
              <p className="text-[#05191b]/70 text-base leading-relaxed">
                Na LifitSeg, buscamos profissionais comprometidos com conhecimento, relacionamento e desenvolvimento contínuo. Se você tem paixão por excelência técnica e deseja atuar em um ambiente corporativo moderno e colaborativo, queremos conhecer seu perfil.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleOpenLeadModal}
                  className="bg-[#E0A63D] hover:bg-[#c99333] text-[#05191b] font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm"
                >
                  Enviar currículo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5 — CONTATO (Branco) */}
      <section className="py-24 bg-white border-b border-[#05191b]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#0b3337] font-bold tracking-widest text-xs uppercase bg-[#E0A63D]/10 px-3 py-1 rounded-full border border-[#E0A63D]/30">
              Canais Oficiais
            </span>
            <h2 className="text-3xl font-black text-[#05191b] mt-4 mb-3">Entre em Contato</h2>
            <p className="text-[#05191b]/60 text-sm">Estamos prontos para atender sua empresa com agilidade e precisão técnica.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Informações e Mapa */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#F7F4EF] p-8 rounded-3xl border border-[#05191b]/10 space-y-6">
                <h3 className="text-xl font-bold text-[#05191b] mb-4">Informações de Atendimento</h3>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm text-[#0b3337]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#05191b]/50 font-bold uppercase">WhatsApp</div>
                    <div className="text-sm font-bold text-[#05191b]">(11) 94054-3808</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm text-[#0b3337]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#05191b]/50 font-bold uppercase">E-mail</div>
                    <div className="text-sm font-bold text-[#05191b]">atendimento@lifitseg.com.br</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm text-[#0b3337]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#05191b]/50 font-bold uppercase">Endereço</div>
                    <div className="text-sm font-bold text-[#05191b]">
                      Rua Bom J. de Pirapora, 1018 - Andar 2<br />
                      Jardim Petrópolis, Jundiaí/SP - CEP 13207-605
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm text-[#0b3337]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#05191b]/50 font-bold uppercase">Horário</div>
                    <div className="text-sm font-bold text-[#05191b]">Segunda a Sexta, das 9h às 18h</div>
                  </div>
                </div>
              </div>

              {/* Simulação do Mapa */}
              <div className="h-[220px] rounded-3xl overflow-hidden border border-[#05191b]/10 relative shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800"
                  alt="Mapa de localização"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-[#05191b]/20 flex items-center justify-center">
                  <span className="bg-[#05191b] text-[#E0A63D] px-4 py-2 rounded-xl text-xs font-bold shadow-lg border border-[#E0A63D]/30">
                    Ver no Google Maps
                  </span>
                </div>
              </div>
            </div>

            {/* Formulário de Contato Rápido */}
            <div className="lg:col-span-7 bg-[#05191b] p-8 sm:p-12 rounded-3xl text-[#F7F4EF] shadow-2xl relative">
              <h3 className="text-2xl font-bold mb-2">Envie sua mensagem</h3>
              <p className="text-xs text-[#F7F4EF]/70 mb-8">Nossa equipe retornará rapidamente para iniciar o atendimento.</p>

              <form onSubmit={(e) => { e.preventDefault(); handleOpenLeadModal(); }} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#E0A63D]">Nome Completo</label>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      required
                      className="w-full bg-[#0b3337] border border-[#E0A63D]/30 rounded-xl px-4 py-3.5 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E0A63D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#E0A63D]">E-mail Corporativo</label>
                    <input
                      type="email"
                      placeholder="seu.email@empresa.com"
                      required
                      className="w-full bg-[#0b3337] border border-[#E0A63D]/30 rounded-xl px-4 py-3.5 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E0A63D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#E0A63D]">Telefone / WhatsApp</label>
                    <input
                      type="text"
                      placeholder="(11) 99999-9999"
                      required
                      className="w-full bg-[#0b3337] border border-[#E0A63D]/30 rounded-xl px-4 py-3.5 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E0A63D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#E0A63D]">Assunto</label>
                    <select className="w-full bg-[#0b3337] border border-[#E0A63D]/30 rounded-xl px-4 py-3.5 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E0A63D]">
                      <option>Benefícios Corporativos</option>
                      <option>Soluções em Seguros</option>
                      <option>Trabalhe Conosco</option>
                      <option>Outros Assuntos</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[#E0A63D]">Mensagem</label>
                  <textarea
                    rows={4}
                    placeholder="Como podemos ajudar sua empresa?"
                    required
                    className="w-full bg-[#0b3337] border border-[#E0A63D]/30 rounded-xl px-4 py-3.5 text-sm text-[#F7F4EF] focus:outline-none focus:border-[#E0A63D]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E0A63D] hover:bg-[#c99333] text-[#05191b] font-bold py-4 rounded-xl transition-all shadow-xl text-base"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6 — FAQ GERAL (Off White) */}
      <section className="py-24 bg-[#F7F4EF] border-b border-[#05191b]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#0b3337] font-bold tracking-widest text-xs uppercase bg-[#0b3337]/5 px-3 py-1 rounded-full border border-[#0b3337]/10">
              Esclarecimentos
            </span>
            <h2 className="text-3xl font-black text-[#05191b] mt-4 mb-3">Perguntas Frequentes</h2>
            <p className="text-[#05191b]/60 text-sm">Respostas diretas sobre nossa estrutura, atendimento e soluções.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#05191b]/10 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-6 font-bold text-[#05191b] flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#E0A63D] transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-sm text-[#05191b]/70 leading-relaxed border-t border-[#05191b]/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 7 — CTA (Verde com Fundo Institucional) */}
      <section className="relative py-28 bg-[#05191b] overflow-hidden border-t border-[#E0A63D]/20">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600"
            alt="Fundo institucional LifitSeg"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#0b3337] text-[#E0A63D] text-xs font-bold uppercase tracking-widest mb-6 border border-[#E0A63D]/30">
            Próximo Passo
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#F7F4EF] mb-6 tracking-tight">Vamos conversar?</h2>
          <p className="text-[#F7F4EF]/70 text-base sm:text-lg mb-10 leading-relaxed font-light">
            Conheça a forma como trabalhamos e descubra como podemos apoiar você ou sua empresa na gestão estratégica de riscos e benefícios.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleOpenLeadModal}
              className="bg-[#E0A63D] hover:bg-[#c99333] text-[#05191b] font-bold px-8 py-4 rounded-xl transition-all shadow-xl text-sm"
            >
              Falar com um Especialista
            </button>
            <button
              onClick={handleOpenLeadModal}
              className="bg-transparent border border-[#F7F4EF]/20 hover:border-[#E0A63D] hover:text-[#E0A63D] text-[#F7F4EF] font-bold px-8 py-4 rounded-xl transition-all text-sm"
            >
              Entrar em Contato
            </button>
          </div>
        </div>
      </section>

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} origem="sobre" />
    </>
  );
}
