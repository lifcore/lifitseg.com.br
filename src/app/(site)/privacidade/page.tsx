import type { Metadata } from 'next'
import Breadcrumb from '@/components/common/Breadcrumb'
import { siteConfig } from '@/config/site'

// Política de Privacidade — corpo editorial do Chief Chat
// (`Lifitseg_Privacidade_e_Revisao_Site_v1.md`), ajustado por Claude ao que o
// código faz de fato (conferido em 16/10/2026):
// - origem: UTMs e IDs de clique (gclid, fbclid, li_fat_id) na sessão; com
//   medição, primeiro e último toque por 90 dias no navegador; revogar apaga;
// - medição: só contagens diárias por página/evento/campanha, sem
//   identificador de pessoa, sessão, clique ou IP (`registrar-evento-site`);
// - segurança dos formulários: IP transformado em código (hash) para
//   detectar envios repetidos; CNPJ conferido em base pública.
// - Etapa C (17/10/2026): com permissão de medição, Google Analytics dentro do
//   Google Tag Manager (TagsConsentidas.tsx); nunca nas rotas de saúde; revogar
//   apaga os cookies do Google e recarrega a página sem as ferramentas.
//   Nenhuma ferramenta de publicidade habilitada nesta versão.
// - Revisão do Chief (18/10/2026): IP como "identificador técnico" (hash não é
//   garantia de anonimização), cookies "de medição associados ao Google
//   Analytics", sem prazo de cookie GA4 não conferido. A política promete pedir
//   a escolha de novo antes de ligar publicidade: ao habilitar qualquer
//   ferramenta, subir a versão das Preferências (consentimento.ts) para que o
//   banner volte a aparecer.
// ANTES DE PUBLICAR (M-26): Raphael/jurídico valida bases legais, retenção
// efetiva e fornecedores; o Chief revisa a redação da seção de plataformas.

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como a Lifitseg utiliza dados pessoais nos contatos, no atendimento e na medição própria do site.',
}

// Data da revisão; trocar pela data efetiva no dia da publicação.
const ATUALIZADO_EM = '18 de outubro de 2026'

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lifitseg-dark" style={{ fontSize: '1.15rem' }}>{titulo}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  )
}

export default function PoliticaPrivacidadePage() {
  const email = siteConfig.contato.email
  return (
    <>
      <Breadcrumb items={[{ label: 'Política de Privacidade' }]} />
      <article className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl text-lifitseg-dark sm:text-4xl">Política de Privacidade</h1>
          <p className="mt-3 text-sm text-lifitseg-text-soft">Última atualização: {ATUALIZADO_EM}</p>

          <div className="mt-10 space-y-10 text-lifitseg-text">
            <Secao titulo="Quem trata seus dados">
              <p>
                A {siteConfig.juridico.razaoSocial}, CNPJ {siteConfig.juridico.cnpj}, utiliza dados pessoais para atender contatos, orientar sobre benefícios e seguros e operar seus canais digitais. Para assuntos de privacidade, entre em contato por{' '}
                <a href={`mailto:${email}`} className="font-semibold text-lifitseg-green underline underline-offset-2">{email}</a>.
              </p>
            </Secao>

            <Secao titulo="Informações fornecidas por você">
              <p>
                Ao solicitar atendimento, podemos receber os dados apresentados no formulário, como nome, empresa, canal de contato, município e assunto de interesse. Na saúde empresarial, também podem ser solicitados faixa de vidas, objetivo e, conforme o formulário, CNPJ e cargo. Nos seguros, pedimos o tipo de seguro e, para empresas, o objetivo do contato. As informações solicitadas variam conforme a necessidade.
              </p>
              <p>
                Quem se apresenta para parceria ou para integrar a equipe informa dados de contato e de atuação profissional em um canal próprio, separado do atendimento a clientes.
              </p>
              <p>
                Não envie diagnósticos, documentos médicos ou dados de beneficiários no formulário comercial inicial. Quando documentos específicos forem necessários ao atendimento, a equipe orientará o canal adequado.
              </p>
            </Secao>

            <Secao titulo="Para que utilizamos essas informações">
              <p>
                Utilizamos as informações para responder à solicitação, encaminhar o atendimento, compreender a necessidade apresentada e apoiar procedimentos relacionados à contratação ou à gestão solicitada. A permissão opcional de medição não é condição para receber atendimento.
              </p>
              <p>
                Para proteger os formulários contra envios automáticos e repetidos, o endereço IP pode ser transformado em um identificador técnico para prevenir envios repetidos. Esse tratamento é usado para segurança dos formulários. Quando um CNPJ é informado, ele pode ser conferido em base pública de dados cadastrais de empresas.
              </p>
            </Secao>

            <Secao titulo="Origem da visita e armazenamento no navegador">
              <p>
                O site pode registrar a página de entrada, o domínio de referência, parâmetros de campanha e identificadores de clique de anúncios. Sem permissão de medição, a origem fica vinculada à sessão atual no navegador e é utilizada para informar a origem do contato que você decidir enviar. Com sua permissão, informações de primeiro e último acesso de origem podem ser guardadas no navegador por até 90 dias, conforme a atualização do histórico. Recusar ou revogar a medição remove esse histórico persistente.
              </p>
              <p>
                Sua escolha de preferência é guardada no navegador para ser respeitada nas visitas seguintes. Essa preferência tem finalidade diferente do histórico de origem. Você pode alterá-la a qualquer momento pelo link &quot;Alterar preferências de privacidade&quot;, no rodapé. Limpar o armazenamento do navegador também pode remover suas escolhas.
              </p>
            </Secao>

            <Secao titulo="Medição e plataformas externas">
              <p>
                Quando autorizada, a medição própria registra interações como visualizações de página, cliques em botões e início ou envio de formulários. Esses registros são somados por dia, página e campanha, sem identificar a pessoa que navegou. A origem da visita, por outro lado, pode acompanhar o contato que você decidir enviar.
              </p>
              <p>
                Se você permitir medição, o site também usa o Google Analytics, do Google, carregado pelo Google Tag Manager, para entender o uso do site. Sem essa permissão, nenhuma das duas ferramentas é carregada, e elas nunca são carregadas nas páginas de referências de saúde. O Google Analytics recebe a página visitada, os parâmetros de campanha permitidos e os eventos de navegação definidos pela Lifitseg; textos digitados em formulários não são enviados. Essas ferramentas usam cookies de medição associados ao Google Analytics, como _ga. Ao retirar a permissão, esses cookies são apagados do navegador e as ferramentas deixam de ser carregadas.
              </p>
              <p>
                Nesta versão do site não há ferramentas de publicidade habilitadas, e nenhum dado é enviado a plataformas de anúncios. Se alguma for habilitada no futuro, esta política será atualizada antes e a sua escolha de privacidade será pedida novamente. Não envie dados de saúde, documentos ou descrições de casos a ferramentas de publicidade.
              </p>
            </Secao>

            <Secao titulo="Compartilhamento, conservação e direitos">
              <p>
                Dados necessários ao atendimento podem envolver prestadores de tecnologia, como hospedagem do site e banco de dados, e, quando a solicitação exigir, participantes da contratação ou da gestão do benefício ou seguro, como operadoras e seguradoras. Não vendemos dados pessoais.
              </p>
              <p>
                Os prazos de conservação variam conforme a finalidade, a relação contratual e as obrigações aplicáveis. O prazo de 90 dias descrito acima se refere ao histórico de origem no navegador; não é o prazo de todos os registros de atendimento.
              </p>
              <p>
                Você pode entrar em contato para solicitar informações sobre o tratamento e exercer os direitos aplicáveis, como acesso, correção e solicitações de exclusão ou revogação, observados os requisitos legais e de identificação necessários ao atendimento. Canal:{' '}
                <a href={`mailto:${email}`} className="font-semibold text-lifitseg-green underline underline-offset-2">{email}</a>.
              </p>
            </Secao>
          </div>
        </div>
      </article>
    </>
  )
}
