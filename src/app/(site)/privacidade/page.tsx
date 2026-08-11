'use client'

import Breadcrumb from '@/components/common/Breadcrumb'
import { siteConfig } from '@/config/site'

/**
 * ATENÇÃO: o texto abaixo é um RASCUNHO ESTRUTURAL, não texto jurídico
 * pronto. Cobre as seções que a LGPD normalmente espera ver numa
 * política de privacidade, mas os detalhes reais (quais dados exatos
 * são retidos, por quanto tempo, com quem são compartilhados, quem é
 * o encarregado/DPO da LifitSeg) precisam ser preenchidos e revisados
 * por um advogado antes de considerar essa página "pronta" de verdade.
 * Procure por "REVISAR" nos comentários abaixo pra achar os pontos
 * que precisam de decisão/confirmação de vocês.
 */
export default function PoliticaPrivacidadePage() {
  const breadcrumbItems = [{ label: 'Política de Privacidade' }]
  const atualizadoEm = '11 de agosto de 2026' // REVISAR: atualizar toda vez que o texto mudar

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <section className="bg-lifitseg-offwhite py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-3xl font-black text-lifitseg-dark sm:text-4xl">
            Política de Privacidade
          </h1>
          <p className="mb-12 text-sm text-lifitseg-dark/50">
            Última atualização: {atualizadoEm}
          </p>

          <div className="space-y-10 text-sm leading-relaxed text-lifitseg-dark/80">
            <div>
              <h2 className="mb-3 text-lg font-bold text-lifitseg-dark">1. Quem somos</h2>
              <p>
                Esta política descreve como a {siteConfig.nomeCompleto} (CNPJ{' '}
                {siteConfig.juridico.cnpj}) coleta, usa e protege os dados pessoais de
                quem visita este site ou preenche algum de nossos formulários de
                contato, em conformidade com a Lei Geral de Proteção de Dados
                (Lei nº 13.709/2018 — LGPD).
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-bold text-lifitseg-dark">2. Quais dados coletamos</h2>
              <p className="mb-2">
                Quando você preenche um formulário neste site, podemos coletar:
                nome, e-mail, telefone, nome da empresa (quando aplicável), CPF ou
                CNPJ (quando informado voluntariamente) e o conteúdo da mensagem
                enviada.
              </p>
              <p>
                {/* REVISAR: confirmar se isso reflete exatamente o que é armazenado hoje no LifCore/Supabase */}
                Também coletamos automaticamente dados de navegação, como
                parâmetros de origem de campanha (UTM), quando você chega ao site
                através de um link de anúncio ou divulgação.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-bold text-lifitseg-dark">3. Para que usamos esses dados</h2>
              <p>
                Usamos os dados informados para entrar em contato sobre a
                solicitação feita, apresentar propostas e soluções em seguros e
                benefícios, e manter um relacionamento comercial com você ou sua
                empresa. Não vendemos nem alugamos dados pessoais para terceiros.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-bold text-lifitseg-dark">4. Base legal</h2>
              <p>
                {/* REVISAR: confirmar com jurídico qual base legal da LGPD se aplica a cada tratamento */}
                O tratamento dos seus dados é feito com base no seu consentimento,
                dado no momento em que você preenche um dos formulários deste
                site, e/ou na execução de procedimentos preliminares relacionados
                a um contrato do seu interesse.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-bold text-lifitseg-dark">5. Compartilhamento de dados</h2>
              <p>
                {/* REVISAR: listar parceiros reais — seguradoras, plataforma de e-mail/CRM, etc. */}
                Seus dados podem ser compartilhados com seguradoras e operadoras
                parceiras estritamente para fins de cotação e contratação de
                apólices, e com fornecedores de tecnologia que operam nossa
                plataforma interna (LifCore), sempre sob obrigação de
                confidencialidade.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-bold text-lifitseg-dark">6. Seus direitos</h2>
              <p>
                Conforme a LGPD, você pode solicitar a qualquer momento a
                confirmação de que tratamos seus dados, acesso a eles,
                correção de dados incompletos ou desatualizados, anonimização,
                bloqueio ou eliminação de dados desnecessários, portabilidade, e
                revogação do consentimento dado.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-bold text-lifitseg-dark">7. Cookies</h2>
              <p>
                {/* REVISAR: atualizar esta seção se/quando Pixel de terceiros (Meta, Google Ads) for ativado */}
                Este site utiliza apenas armazenamento técnico de sessão para
                lembrar de onde você veio (parâmetros de campanha), sem uso de
                cookies de rastreamento de terceiros no momento.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-bold text-lifitseg-dark">8. Como falar conosco sobre seus dados</h2>
              <p>
                {/* REVISAR: definir quem é o encarregado (DPO) e o canal oficial de privacidade */}
                Para exercer qualquer um dos direitos acima, ou tirar dúvidas
                sobre esta política, entre em contato pelo e-mail{' '}
                <strong className="text-lifitseg-dark">{siteConfig.contato.email}</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
