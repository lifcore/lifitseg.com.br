'use client';

import { useState } from 'react';

export default function CotacaoPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* HERO DA PÁGINA */}
      <section className="py-16 bg-[#071B2D] text-white text-center border-b border-[#123B57]">
        <div className="mx-auto max-w-[800px] px-5">
          <span className="text-sm font-bold text-[#7894A8] uppercase tracking-wider">Próximo Passo</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2">Solicitar Cotação</h1>
          <p className="text-gray-300 text-sm mt-4">
            Conte pra gente os detalhes da sua operação. Nossos especialistas analisam a demanda e retornam com a melhor solução.
          </p>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section className="py-20 bg-[#FAF9F6]">
        <div className="mx-auto max-w-[800px] px-5">
          {submitted ? (
            <div className="bg-[#071B2D] text-white p-10 rounded text-center">
              <h2 className="text-xl font-bold mb-2">Solicitação enviada com sucesso!</h2>
              <p className="text-sm text-gray-300">Nossa equipe comercial vai analisar sua demanda e entrar em contato em breve.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="bg-white p-8 rounded border border-gray-200 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#071B2D] mb-1">Empresa / Razão Social *</label>
                  <input required type="text" className="w-full border border-gray-300 p-2.5 rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#071B2D] mb-1">Nome do Responsável *</label>
                  <input required type="text" className="w-full border border-gray-300 p-2.5 rounded text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#071B2D] mb-1">E-mail *</label>
                  <input required type="email" className="w-full border border-gray-300 p-2.5 rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#071B2D] mb-1">WhatsApp / Telefone *</label>
                  <input required type="tel" className="w-full border border-gray-300 p-2.5 rounded text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#071B2D] mb-1">Cidade de Origem *</label>
                  <input required type="text" className="w-full border border-gray-300 p-2.5 rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#071B2D] mb-1">Cidade de Destino *</label>
                  <input required type="text" className="w-full border border-gray-300 p-2.5 rounded text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#071B2D] mb-1">Tipo de Carga *</label>
                  <select required className="w-full border border-gray-300 p-2.5 rounded text-sm">
                    <option value="">Selecione...</option>
                    <option>Carga Geral</option>
                    <option>Refrigerada</option>
                    <option>Congelada</option>
                    <option>Química / Perigosa</option>
                    <option>Veículo Dedicado</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#071B2D] mb-1">Peso / Volume Estimado</label>
                  <input type="text" placeholder="Ex: 2 toneladas / 5m³" className="w-full border border-gray-300 p-2.5 rounded text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#071B2D] mb-1">Detalhes adicionais</label>
                <textarea rows={4} className="w-full border border-gray-300 p-2.5 rounded text-sm" placeholder="Prazo, frequência, restrições ou outras informações relevantes"></textarea>
              </div>

              <button type="submit" className="w-full bg-[#C5A15A] text-[#071B2D] font-bold uppercase tracking-wide py-3.5 rounded transition-colors hover:bg-[#071B2D] hover:text-white">
                Enviar Solicitação
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
