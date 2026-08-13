# Site Institucional LifitSeg — Relatório de Status e Continuidade
### Documento de referência para retomar o trabalho em nova conversa

**Como usar:** cole este documento no início de uma nova conversa com o Claude — ele dá o contexto completo do projeto do site (diferente do LifCore, é outro projeto) sem precisar reconstruir o histórico.

---

## 1. O que é este projeto

Site institucional da **LifitSeg** (consultoria/corretora de seguros e benefícios), separado do **LifCore** (CRM interno) — projetos independentes que só compartilham o mesmo backend Supabase.

**Stack:** Next.js 16 (App Router) + React + TypeScript + Tailwind CSS v4 + ESLint + Prettier + Lucide React

**Repositório:** github.com/lifcore/lifitseg.com.br (org "lifcore")
**Vercel:** vercel.com/lifitseg
**Equipe:** Raphael (diretor, não-técnico), Gemini (redator/arquiteto de conteúdo), Claude (engenheiro implementador) — sem o Chief (ChatGPT) nesta frente

---

## 2. Estrutura real de pastas (confirmada 13/08)

```
src/
├── app/
│   ├── (site)/              ← GRUPO DE ROTAS — Header/Footer só aparecem aqui dentro
│   │   ├── layout.tsx       ← importa Header/Footer/FloatingActionButtons
│   │   ├── page.tsx         ← Home (CUIDADO: precisa estar AQUI DENTRO, não solto em app/)
│   │   ├── beneficios-corporativos/page.tsx
│   │   ├── seguros-corporativos/page.tsx
│   │   ├── seguros-pessoais/page.tsx
│   │   └── sobre-e-conhecimento/page.tsx
│   ├── lp/                  ← Landing Pages avulsas (saude-odonto, veiculos-frota) — topbar própria, fora do grupo (site)
│   ├── layout.tsx           ← layout RAIZ — só html/fontes/metadata, nunca UI
│   ├── globals.css
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── common/ (Breadcrumb, FaqAccordion, InternalBanner, StandardCard)
│   ├── forms/ (ContatoForm.tsx, LeadModal.tsx)
│   ├── layout/ (FloatingActionButtons, Footer, Header)
│   └── sobre/ (CategoriaConhecimentoCard, TrabalheConoscoCTA)
├── config/ (lifcore.config.js, navigation.ts, site.ts)
├── hooks/ (useLifCoreLead.js)
├── services/ (lifcoreApi.js)
└── utils/ (tracking.ts)
```

⚠️ **Regra crítica de arquitetura:** Header/Footer só existem em `(site)/layout.tsx`. Qualquer página nova precisa nascer **dentro** de `(site)/`, nunca solta em `app/` — isso já causou bug 2x (Header/Footer sumindo da Home), incluindo hoje (13/08), quando a Home reescrita foi colada no lugar errado por engano.

---

## 3. Dados institucionais reais (config/site.ts — não inventar de novo)

```ts
nome: 'LifitSeg'
email: 'atendimento@lifitseg.com.br'
whatsapp: '5511940543808'
whatsappExibicao: '(11) 94054-3808'
endereco.completo: 'Rua Bom J. de Pirapora, 1018 - Andar 2 - Jardim Petrópolis, Jundiaí/SP - CEP 13207-605'
cnpj: '43.609.696/0001-60'
registroSusep: '232149012'
```

⚠️ `siteConfig` da LifitSeg **não tem** `contato.whatsappLink()`, `contato.telefone` nem `contato.endereco` — isso é do projeto Ação Transportes (outro `siteConfig`, mesmo padrão de nome de arquivo). Confundir os dois já quebrou o build uma vez.

---

## 4. Status atual — no ar e funcionando

- 5 páginas completas: Home, Benefícios Corporativos, Seguros Corporativos, Seguros Pessoais, Sobre e Conhecimento
- Header/Footer corrigidos (13/08) — Home estava fora do grupo `(site)`, movida pro lugar certo
- Logo: 66px de altura no Header, 88px no Footer
- Paleta nova aplicada (ver seção 6)

---

## 5. REV-SITE-001 — documento estratégico (recebido 12/08)

Diretriz central: **"refinar, não reconstruir"** — preservar identidade e estrutura já existentes. Plano em 5 fases:

### Fase 1 (Comunicação) — ✅ concluída
- Nova Hero da Home (headline/subheadline/CTAs)
- Seção nova "Para Quem Trabalhamos" (PF/PME/Empresas/Grandes Empresas)
- Linguagem menos abstrata ("arquitetos de gestão de riscos" suavizado)
- CTAs contextuais: Benefícios = "Avaliar minha carteira"; Seguros Pessoais = "Encontrar a proteção ideal"; Seguros Corporativos = mantido "Falar com um Especialista" (atende múltiplos públicos)
- Strategy Business reposicionado como gestão estratégica ampla, não só combate a reajuste
- LifCore sem expor "Supabase Edge Functions" ao cliente
- Bug do "reunirá" (futuro) corrigido pra presente em Sobre e Conhecimento

### Fase 2 (Confiança) — 🟡 parcial
- Fundador publicado: **Raphael Abaid**, Sócio Diretor, único fundador. Formado em Logística, MBA em Gestão de Saúde (Centro Universitário São Camilo), certificação SUSEP, cursos técnicos de consultor de negócios. Avatar de iniciais "RA" (sem foto ainda)
- Avaliações Google publicadas: **4.9 · 41 avaliações**, link real: https://share.google/lQoH1vfK1Kqz2W04m
- ⏳ Bloqueado: clientes/depoimentos autorizados (aguardando autorização formal) — seção "Empresas que confiam na nossa gestão" só será criada com dado real

### Fase 3 (Visual) — ✅ concluída
Paleta nova em `globals.css`:
| Token | Valor |
|---|---|
| `lifitseg-dark` | `#082124` |
| `lifitseg-dark-deep` | `#041416` |
| `lifitseg-surface` | `#102D2F` |
| `primary` | `#C9A45A` |
| `lifitseg-offwhite` | `#F7F4EF` (mudou de `#e1e7e1`) |
| `lifitseg-text` (novo) | `#293A38` |
| `lifitseg-text-soft` (novo) | `#687673` |
| `lifitseg-success` (novo) | `#4A9589` |

As 4 páginas de solução (antes hex solto `#00393f`/`#e2a535`/`#094448`/`#e1e7e1`, decisão antiga válida na época, não bug) convertidas pra classes de tema. `FaqAccordion.tsx` tinha cores ainda mais antigas (`#05191b`/`#E0A63D`, nunca atualizado desde a criação) — corrigido junto. Hero da Home trocou foto de ambiente vazio por foto real de interação consultiva.

### Fase 4 (Experiência) — 🟡 parcial
- ✅ FAQ: primeira pergunta aberta por padrão (antes tudo fechado) — `FaqAccordion.tsx` + FAQs inline de Benefícios/Seguros Pessoais
- ⏳ Resto (mobile, formulários ponta a ponta, navegação, acessibilidade) depende de teste no site publicado, não é edição de arquivo

### Fase 5 (Técnico) — 🟡 parcial
- ✅ `sitemap.ts` corrigido (só listava a Home, agora lista as 5 páginas + /privacidade)
- 🔴 **Achado crítico, ainda aberto:** `ContatoForm` (seção "Fale com a LifitSeg") e `TrabalheConoscoCTA` (botão "Enviar Currículo") chamam Edge Functions do Supabase que **não existem** (`receber-fale-conosco` e `receber-trabalhe-conosco` — só `receber-lead-site`, do LeadModal, está publicada). Em dev não aparece (mock sempre simula sucesso); em produção, visitante recebe erro 404 e o lead se perde silenciosamente
  - Confirmado por Raphael (13/08): Trabalhe Conosco será integração real, banco (`candidatos_recrutamento`) ainda não foi desenvolvido
  - ContatoForm: Raphael não recorda o desenho original, mas confirma que "deveria disparar algo direto" — decisão de design pendente, prioridade alta pro time entrar

---

## 6. Pendências abertas (por prioridade)

**🔴 Alta — backend:**
1. Function `receber-trabalhe-conosco` (aguarda banco `candidatos_recrutamento`)
2. Function `receber-fale-conosco` (aguarda decisão de design — cai direto no CRM? notificação por e-mail? os dois?)

**🟡 Conteúdo:**
3. Foto profissional do Raphael (fundador)
4. Bio do fundador mais pessoal (atual é só fatos objetivos)
5. Autorização de clientes pra seção de prova social
6. Confirmar horário de atendimento real (hoje fixo "Segunda a sexta, 9h às 18h", nunca validado como dado oficial)

**🟢 Teste manual no site publicado:**
7. Navegação mobile (menu, dropdown Soluções)
8. Formulários ponta a ponta
9. Contraste/acessibilidade da paleta nova
10. Revisão visual geral das 5 páginas

---

## 7. Bugs já resolvidos nesta sessão (13/08) — não repetir

- Header.tsx/Footer.tsx entregues com `export default` quebraram o build — projeto espera `export function` (named export)
- `page.tsx` da Home movido por engano pra fora do grupo `(site)` — Header/Footer sumiram, corrigido movendo de volta pra dentro
- 6 pastas inteiras do projeto **Ação Transportes** (`contato`, `cotacao`, `empresa`, `solucoes`, `tecnologia-e-gestao`, `trabalhe-conosco`) foram coladas por engano dentro do `src/app` da LifitSeg — build quebrou porque essas páginas usam um `siteConfig` com formato diferente (`contato.whatsappLink()`, `contato.telefone`, `contato.endereco`, que não existem no `siteConfig` da LifitSeg). Apagadas.

---

## 8. Regras operacionais fixas

- Sempre **baixar o arquivo e arrastar pro VS Code** — nunca copiar/colar manual (bug de indentação corrompida)
- Salvar tudo antes de rodar qualquer comando
- Conferir a pasta de destino antes de colar — os dois projetos (LifitSeg e Ação Transportes) têm nomes de arquivo iguais (`page.tsx`, `Header.tsx`, `Footer.tsx`, `layout.tsx`) e isso já causou mistura de arquivo errado várias vezes
- `git status` antes do commit
- Todo deploy: `git add . && git commit -m "..." && git push` — Vercel builda automático
