'use client';

import { useState } from 'react';

export default function TrabalheConoscoPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* HERO / CULTURA */}
      <section className="relative py-16 bg-[#071B2D] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/trabalhe-conosco-2.jpg"
            alt="Motorista profissional em frente a caminhão"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[#071B2D]/60" />
        </div>
        <div className="relative mx-auto max-w-[800px] px-5 text-center">
          <span className="text-sm font-bold text-[#7894A8] uppercase tracking-wider">Carreiras</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">Faça parte da nova fase da Ação.</h1>
          <p className="text-gray-200 leading-relaxed">
            Buscamos profissionais comprometidos com segurança, profissionalismo e desenvolvimento contínuo, prontos para crescer junto com a nossa nova fase de modernização.
          </p>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section className="py-16 bg-[#FAF9F6]">
        <div className="mx-auto max-w-[1100px] px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="/images/trabalhe-conosco.jpg"
                alt="Profissional utilizando equipamentos de proteção individual"
                className="w-full h-auto object-cover"
              />
            </div>

            <div>
              {submitted ? (
                <div className="bg-[#071B2D] text-white p-8 rounded text-center">
                  <h2 className="text-xl font-bold mb-2">Currículo cadastrado com sucesso!</h2>
                  <p className="text-xs text-gray-300">Agradecemos o interesse. Entraremos em contato caso haja oportunidades compatíveis.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-white p-8 rounded border border-gray-200 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#071B2D] mb-1">Nome Completo *</label>
                      <input required type="text" className="w-full border border-gray-300 p-2.5 rounded text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#071B2D] mb-1">Telefone / Celular *</label>
                      <input required type="tel" className="w-full border border-gray-300 p-2.5 rounded text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#071B2D] mb-1">E-mail *</label>
                      <input required type="email" className="w-full border border-gray-300 p-2.5 rounded text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#071B2D] mb-1">Cidade / Estado *</label>
                      <input required type="text" className="w-full border border-gray-300 p-2.5 rounded text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#071B2D] mb-1">Cargo Desejado *</label>
                      <input required type="text" className="w-full border border-gray-300 p-2.5 rounded text-sm" placeholder="Ex: Motorista, Logística, Administrativo" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#071B2D] mb-1">Categoria CNH (se aplicável)</label>
                      <input type="text" className="w-full border border-gray-300 p-2.5 rounded text-sm" placeholder="Ex: CNH C, D, E" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071B2D] mb-1">Resumo das Experiências</label>
                    <textarea rows={3} className="w-full border border-gray-300 p-2.5 rounded text-sm"></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071B2D] mb-1">Upload de Currículo (PDF)</label>
                    <input type="file" accept=".pdf" className="w-full border border-gray-300 p-2.5 rounded text-sm bg-white" />
                  </div>

                  <button type="submit" className="w-full bg-[#123B57] text-white font-bold py-3.5 rounded transition-colors hover:bg-[#071B2D]">
                    Enviar Candidatura
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
