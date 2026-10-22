# Relatório de validação — Táxi Aeroporto · Ricardo

**Data da revisão:** 22/10/2026  
**Status:** publicada no Cloudflare Workers e no GitHub após autorização do usuário.

## 1. Resumo executivo

Landing page estática publicada em `https://taxi-aeroporto-ricardo.japa-kamitm.workers.dev` e no repositório `KamiJapa/taxiricardo`. O site usa projeto Worker exclusivo para Ricardo. O site salvo do Luís e o projeto Bolonha não foram alterados. O conteúdo usa somente os dados confirmados no briefing.

## 2. Estrutura e arquivos

- `index.html`: landing page com navegação, serviços, veículo, experiência, agendamento, FAQ e CTAs.
- `styles.css` e `tailwind.css`: identidade visual e estilos responsivos.
- `script.js`: mensagens personalizadas para WhatsApp, menu móvel e ano automático.
- `privacidade.html` e `404.html`: páginas auxiliares.
- `favicon.svg`, `og-image.svg` e `robots.txt`: metadados e identidade de compartilhamento local.
- `assets/photos/`: quatro derivações WebP (incluindo duas larguras da imagem hero).
- `tests/static.test.mjs`, `package.json`, `tailwind.config.js` e `src/input.css`.
- `README.md`: instalação, comandos, configuração e pendências.

## 3. Identidade e conteúdo

Paleta usa verde-esmeralda, branco suave e carvão esverdeado. A marca tipográfica “TA” é uma proposta visual, não uma aprovação do Ricardo. Conteúdo contempla Táxi Aeroporto, Ricardo, atendimento 24h com agendamento, serviços informados e experiência desde 2016. Não há Instagram, endereço, avaliações, certificações ou capacidade de bagagem inventados.

## 4. Fotografias

As três fotos reais fornecidas foram usadas conforme a hierarquia solicitada: lateral/diagonal no hero, diagonal dianteira e frontal na galeria. Após autorização explícita do usuário para publicação, as cópias WebP foram enviadas ao GitHub e ao Cloudflare. As derivações não contêm metadados EXIF e as placas estão desfocadas. Os arquivos originais permaneceram intactos e não foram publicados.

Pesos medidos após geração:

| Arquivo | Tamanho |
|---|---:|
| `duster-lateral-720.webp` | 45.650 bytes |
| `duster-lateral-1440.webp` | 152.460 bytes |
| `duster-diagonal.webp` | 80.582 bytes |
| `duster-frontal.webp` | 66.696 bytes |

**Status das medidas após a última máscara:** APROVADO — tamanho e dimensões medidos; EXIF ausente nas quatro derivações.

## 5. WhatsApp e fluxos

Número centralizado: `5517981012405`; telefone visível `+55 17 98101-2405`. Links têm fallback sem JavaScript e o script codifica cada mensagem com `encodeURIComponent`. Nenhuma mensagem real foi enviada. Não existe formulário obrigatório.

## 6. SEO

Title, description, Open Graph, Twitter Cards, favicon, H1 único e JSON-LD `TaxiService` com telefone e tipos de serviço. O site está publicado em subdomínio `workers.dev` e `robots.txt` permite rastreamento. Canonical, sitemap e URL absoluta de Open Graph estão **PENDENTES** até existir domínio próprio. A imagem Open Graph está em SVG local; compatibilidade com redes sociais precisa ser confirmada.

## 7. Acessibilidade

Implementados landmarks, link para pular conteúdo, foco visível, alt text, `<details>/<summary>` nativos para FAQ/menu, áreas de toque e `prefers-reduced-motion`. **PENDENTE:** auditoria com axe, navegação real em teclado, zoom/reflow, leitor de tela e avaliação manual dos contrastes. Não se declara conformidade integral WCAG com base apenas no código.

## 8. Segurança e privacidade

Sem analytics, formulários, segredos ou dependências de runtime externas. Links WhatsApp usam `noopener noreferrer`. Política descreve o redirecionamento e identifica a hospedagem Cloudflare. CSP, Referrer-Policy e X-Content-Type-Options ainda não foram configurados; HSTS é gerenciado conforme a hospedagem e o domínio.

## 9. Performance

Imagens WebP locais, dimensões explícitas, imagem hero prioritária, imagens abaixo da dobra lazy-loaded, sem fontes remotas ou biblioteca de animação. Métricas LCP/CLS/INP e Lighthouse estão **PENDENTES**, pois não foi executada auditoria de navegador nesta entrega.

## 10. Testes executados

| Comando/checagem | Status | Evidência |
|---|---|---|
| `npm ci` | BLOQUEADO | Sem `package-lock.json`; tentativa de gerar lockfile offline retornou `ENOTCACHED`; tentativa online retornou `ENOTFOUND` para `registry.npmjs.org`. `npm ci` sem lockfile retornou `EUSAGE`. |
| `npm run build` | APROVADO COM AVISOS | Exit code 0. Tailwind 3.4.17 compilou; aviso de base Browserslist desatualizada e nenhum utilitário Tailwind encontrado (layout usa CSS próprio). |
| `npm run test:static` | APROVADO | 6 testes aprovados, 0 falhas. |
| `git diff --check` | BLOQUEADO | O diretório do projeto não tem repositório Git local; a execução retornou “Not a git repository”. Não foi inicializado apenas para esta checagem. |
| Referências de fotos locais e alt | APROVADO | Checagem estática aprovada: arquivos existem e as três imagens têm alt. |
| Playwright Chromium/Firefox/WebKit | NÃO APLICÁVEL NO AMBIENTE ATUAL | Playwright e browsers não foram encontrados no workspace durante a inspeção. Não instalados. |
| Viewports listados no briefing | PENDENTE | Sem execução de browser local. |
| Lighthouse / axe-core | PENDENTE | Ferramentas não disponíveis nesta revisão. |
| Inspeção visual das placas | APROVADO | Três derivações WebP abertas após a máscara final; nenhuma placa legível. |
| Deploy Cloudflare e páginas principais | APROVADO | `cf deploy` concluiu; `/`, `/privacidade.html` e uma foto retornaram HTTP 200. Worker exclusivo `taxi-aeroporto-ricardo`. |
| Publicação no GitHub | APROVADO | Commit `f297aceedd62ee4e7a4601617f598df44472b133` publicado na branch `main`. |

## 11. Problemas e correções

Durante a primeira inspeção visual, as regiões de borrão ficaram fora das placas. As máscaras foram recalculadas com base em recortes locais e reaplicadas nas dimensões finais das imagens. As três saídas foram abertas novamente e conferidas. Não houve alteração dos originais.

## 12. Checklist DM

| Item | Status |
|---|---|
| Página 404 personalizada | APROVADO — arquivo implementado; roteamento depende do host |
| CTAs e WhatsApp correto | PENDENTE — testar após execução estática |
| Links com mensagem personalizada | PENDENTE — testar após execução estática |
| Informações comerciais reais | APROVADO — conforme dados fornecidos |
| FAQ | APROVADO — cinco perguntas, conteúdo de disponibilidade qualificado |
| Navegação mobile | PENDENTE — validação real em browser |
| CTA fixo em mobile | APROVADO — implementado em CSS/HTML; validação visual pendente |
| Robots, title e description | APROVADO — robots permite rastreamento; title/description publicados |
| Open Graph/Twitter e favicon | PENDENTE — arquivos presentes; preview externo/URL definitiva pendentes |
| Dados estruturados | PENDENTE — sintaxe e validação por ferramenta ainda não executadas |
| Privacidade | APROVADO — texto coerente com versão local; revisão pré-publicação pendente |
| Fotos otimizadas e placa protegida | APROVADO — saídas inspecionadas localmente; tamanhos finais pendentes |
| Responsividade e acessibilidade | PENDENTE — falta validação automatizada/manual em navegador |
| Segurança do host | PENDENTE — cabeçalhos dependem de hospedagem futura |

## 13. Pendências comerciais e próximos passos

Confirmar domínio próprio/extensão, área operacional, municípios, aprovação do logotipo e textos, serviços adicionais e validação comercial final. Depois, revisar canonical/OG absoluto, sitemap, privacidade e cabeçalhos de segurança. A autorização para publicar as fotos foi recebida e aplicada apenas às derivações WebP borradas.
