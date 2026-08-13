'use client';

import { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function ContatoPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* HERO DA PÁGINA */}
      <section className="relative py-16 bg-[#071B2D] text-white text-center border-b border-[#123B57] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/contato-hero.jpg"
            alt="Caminhão em operação"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[#071B2D]/60" />
        </div>
        <div className="relative mx-auto max-w-[800px] px-5">
          <span className="text-sm font-bold text-[#7894A8] uppercase tracking-wider">Fale Conosco</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2">Vamos conversar sobre sua operação.</h1>
        </div>
      </section>

      {/* CANAIS + FORMULÁRIO */}
      <section className="py-20 bg-[#FAF9F6]">
        <div className="mx-auto max-w-[1100px] px-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* CANAIS DE CONTATO */}
            <div className="lg:col-span-5 space-y-4">
              <a
                href={siteConfig.contato.whatsappLink('Olá, gostaria de falar com o Depto. Comercial.')}
                target="_blank"
                rel="noreferrer"
                className="block bg-white p-5 rounded border border-gray-200 hover:border-[#7894A8] transition-colors"
              >
                <div className="text-xs font-bold text-[#7894A8] uppercase mb-1">WhatsApp Comercial</div>
                <div className="text-base font-semibold text-[#071B2D]">{siteConfig.contato.telefone}</div>
              </a>

              <a
                href={`tel:${siteConfig.contato.telefone.replace(/\D/g, '')}`}
                className="block bg-white p-5 rounded border border-gray-200 hover:border-[#7894A8] transition-colors"
              >
                <div className="text-xs font-bold text-[#7894A8] uppercase mb-1">Telefone</div>
                <div className="text-base font-semibold text-[#071B2D]">{siteConfig.contato.telefone}</div>
              </a>

              <a
                href={`mailto:${siteConfig.contato.email}`}
                className="block bg-white p-5 rounded border border-gray-200 hover:border-[#7894A8] transition-colors"
              >
                <div className="text-xs font-bold text-[#7894A8] uppercase mb-1">E-mail Comercial</div>
                <div className="text-base font-semibold text-[#071B2D] break-all">{siteConfig.contato.email}</div>
              </a>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contato.endereco)}`}
                target="_blank"
                rel="noreferrer"
                className="block bg-white p-5 rounded border border-gray-200 hover:border-[#7894A8] transition-colors"
              >
                <div className="text-xs font-bold text-[#7894A8] uppercase mb-1">Endereço — Ver no mapa</div>
                <div className="text-sm font-semibold text-[#071B2D]">{siteConfig.contato.endereco}</div>
              </a>

              <Link
                href="/cotacao"
                className="block text-center bg-[#C5A15A] text-[#071B2D] font-bold uppercase tracking-wide py-3.5 rounded hover:bg-[#071B2D] hover:text-white transition-colors"
              >
                Solicitar Cotação
              </Link>
            </div>

            {/* FORMULÁRIO DE MENSAGEM */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="bg-[#071B2D] text-white p-10 rounded text-center h-full flex flex-col items-center justify-center">
                  <h2 className="text-xl font-bold mb-2">Mensagem enviada com sucesso!</h2>
                  <p className="text-sm text-gray-300">Nossa equipe vai retornar em breve.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="bg-white p-8 rounded border border-gray-200 space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#071B2D] mb-1">Nome *</label>
                      <input required type="text" className="w-full border border-gray-300 p-2.5 rounded text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#071B2D] mb-1">Empresa</label>
                      <input type="text" className="w-full border border-gray-300 p-2.5 rounded text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#071B2D] mb-1">E-mail *</label>
                      <input required type="email" className="w-full border border-gray-300 p-2.5 rounded text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#071B2D] mb-1">Telefone / WhatsApp *</label>
                      <input required type="tel" className="w-full border border-gray-300 p-2.5 rounded text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#071B2D] mb-1">Cidade</label>
                      <input type="text" className="w-full border border-gray-300 p-2.5 rounded text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#071B2D] mb-1">Assunto</label>
                      <input type="text" className="w-full border border-gray-300 p-2.5 rounded text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#071B2D] mb-1">Mensagem *</label>
                    <textarea required rows={4} className="w-full border border-gray-300 p-2.5 rounded text-sm"></textarea>
                  </div>

                  <button type="submit" className="w-full bg-[#123B57] text-white font-bold uppercase tracking-wide py-3.5 rounded transition-colors hover:bg-[#071B2D]">
                    Enviar Mensagem
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
