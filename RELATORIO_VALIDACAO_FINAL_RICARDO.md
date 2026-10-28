# Validação — Ricardo · DM Signature

Revisão de 27/10/2026, publicada no Cloudflare e autorizada para sincronização com o GitHub. Alterações anteriores em README, package.json, testes e lockfile foram incorporadas.

## Diagnóstico inicial
A base já tinha fotos reais, WebP, dimensões explícitas, menu/FAQ nativos, conteúdo de disponibilidade e uma identidade esmeralda coerente. Faltavam mensagens contextualizadas sem JavaScript, canonical/sitemap, imagem social PNG e instalação documentada. Havia textos de 7–12 px, símbolos sem glifos no navegador e serviços em três cards repetidos. O relatório anterior misturava evidências históricas de deploy e testes ainda pendentes.

## Implementação
- Hero com título editorial e marca Ricardo, oferta geográfica confirmada, CTA “Agendar minha viagem” e disponibilidade condicionada a agendamento.
- Serviços em linhas numeradas, com título, explicação e contato específico. Tipografia de leitura ampliada, melhor contraste e espaçamento responsivo.
- Fotografias reais preservadas byte a byte. Sem carros gerados na implementação; placas continuam protegidas.
- FAQ ampliada para orçamento e ausência de confirmação automática. Processo pede origem, destino, data e horário.
- WhatsApp com mensagem codificada no próprio HTML, menu com Escape e retorno de foco; ícones SVG substituem setas sem glifo.
- URL oficial centralizada, canonical, sitemap, robots, JSON-LD geográfico e imagem PNG 1200×630.
- Página 404 com caminhos absolutos, noindex e contraste revisado. Políticas de segurança em `_headers`, a validar no host após publicação.

## Arquivos
`index.html`, `styles.css`, `script.js`: apresentação e comportamento. `privacidade.html`, `404.html`: coerência visual e navegação. `site.config.json`, `scripts/seo.mjs`, `robots.txt`, `sitemap.xml`: geração de SEO. `og-image.png`: exportação raster da arte local. `_headers`: políticas do host. `package.json`, `package-lock.json`: instalação/build. `tests/static.test.mjs`: expectativas reais, SEO e fallback. `README.md`, este relatório e `DM_SIGNATURE_STANDARD.md`: operação, evidências e padrão reutilizável.

## Design system
Carvão #111b1b, esmeralda #126b51, menta #81c9ad, papel #f5f7f5. Corpo Segoe UI/Arial/sans-serif; títulos e marca com Georgia e itálico. Container máximo 1240 px; seções de 56–100 px; controles principais de 52 px; leitura de 15–17 px. Superfícies alternadas, linhas discretas e fotos em molduras retangulares. Movimento reduzido preservado; conteúdo nunca depende de animações.

## Testes e evidências
- `npm ci`, build e testes executados também em `/tmp/ricardo-isolated`, sem node_modules do diretório pai.
- Suíte estática ampliada para 8 testes: conteúdo, WhatsApp, semântica, âncoras, arquivos/SEO, privacidade, canonical/sitemap/PNG e mensagens sem JavaScript.
- Playwright Python com Chromium local: 320, 375, 390, 430, 768, 1024, 1440 e 1920 px. Sem overflow horizontal, menu e Escape, sete FAQs e 13 links WhatsApp com mensagens decodificadas corretas. Nenhuma mensagem foi enviada.
- Contexto com JavaScript desativado: menu e FAQ abrem e links preservam mensagens. Nenhum erro de execução JS observado.
- axe-core: contraste e nomes acessíveis revisados após a primeira auditoria. Resultado final: zero violações reportadas nas oito larguras e nas páginas privacidade/404, nos estados auditados. Evidência em `/tmp/ricardo-qa/results.json`.
- Lighthouse mobile local: performance 97, acessibilidade 100, boas práticas 100, SEO 100. LCP 2,6 s, CLS 0, TBT 0 ms. São medidas de laboratório: LCP ficou 0,1 s acima da meta de referência; INP real não foi medido. Cache/latência do servidor Python não representam produção.
- Screenshots desktop/mobile, galeria carregada e imagem social foram inspecionados. Capturas e JSON completos estão em `/tmp/ricardo-qa/`.

Não foram testados Safari, Firefox, leitor de tela humano, dispositivos físicos ou métricas de campo. Axe/Lighthouse não certificam WCAG integralmente. Reflow foi exercitado em viewport de 320 px; zoom nativo do navegador não foi auditado separadamente. O servidor de prévia não aplica `_headers` nem roteia uma URL inexistente para a página 404 personalizada.

## Comparação com Luís e conceito
O site publicado Luís respondeu HTTP 200. Chromium rejeitou o certificado apresentado pelo proxy; a comparação visual foi feita com o checkout de `KamiJapa/taxiLuis` servido localmente, sem desabilitar TLS. Luís usa azul, maior densidade na primeira dobra e foto dominante. Ricardo mantém verde, tipografia editorial, serviços em linhas e fotos documentais do próprio carro. A comparação é visual e de código; não foram medidas métricas de desempenho do Luís, portanto não há alegação de superioridade objetiva.

Conceito: `/workspace/generated_images/exec-4561079e-bd17-48b5-a4c3-f7bd9dbb11f6.png`. A imagem foi examinada como direção visual. Desvios intencionais: fotos reais em vez das ilustrativas geradas; textos verdadeiros em vez das promessas geradas; manutenção das seções de experiência/veículo separadas; CTA com disponibilidade explícita; identidade Táxi Aeroporto preservada. Comparação feita em paleta, título editorial, serviços em linhas, CTA e adaptação mobile. Não se declara fidelidade pixel a pixel ao conceito gerado.

## Avaliação editorial
Notas abaixo são julgamento de revisão, não resultados de ferramentas: design 90 (identidade e hierarquia fortes, aprovação comercial pendente); UX 92 (fluxo direto e estados nativos); mobile 92 (oito larguras e controles legíveis); conversão 91 (contato contextual, sem dados reais de conversão); código 88 (stack pequena, CSS ainda possui regras históricas sobrepostas); originalidade 90 (esmeralda e fotos próprias); acabamento 90 (ícones, contraste e leitura refinados). Performance 97, acessibilidade 100 e SEO 100 são apenas as notas Lighthouse desta execução. A meta editorial 95 não é declarada atingida automaticamente.

## Pendências e publicação
Versão implementada e publicada para revisão do cliente. Aprovar marca/textos, confirmar cada destino e decidir eventual domínio próprio. A região geral veio do briefing atualizado. A URL Workers existente foi verificada com identidade/telefone corretos e adotada até alteração. Commit, push e publicação foram autorizados posteriormente pelo cliente. Verificação de produção: HTML, CSS, JavaScript, foto, imagem social, robots e sitemap conferem com o pacote; headers de segurança presentes e URL inexistente retorna a página personalizada com HTTP 404. O domínio próprio continua dependente de decisão comercial. O fluxo reproduzível de publicação agora está em `wrangler.jsonc` e `scripts/package.mjs`.
