# Táxi Aeroporto — Ricardo

Landing page estática em HTML5, Tailwind CSS 3.4.17 e JavaScript puro. Fotografias reais da Duster 2025, atendimento desde 2016 e WhatsApp +55 17 98101-2405. Atendimento 24h mediante agendamento e confirmação.

## Desenvolvimento
Requisitos: Node.js 20+, npm 10+ e Python 3 para o servidor de prévia.

```sh
npm ci
npm run build
npm run test:static
npm run preview
```

Abra http://127.0.0.1:4173. Para acompanhar mudanças no Tailwind, execute `npm run dev` em outro terminal. Os estilos autorais estão em `styles.css`. Não é necessário instalar pacotes no diretório pai. O preview Python é um servidor local; não interpreta `_headers` nem reproduz automaticamente o roteamento 404 do Cloudflare.

## SEO e publicação
`site.config.json` centraliza a URL pública. O build atualiza canonical, Open Graph, robots e sitemap. A URL `https://taxi-aeroporto-ricardo.japa-kamitm.workers.dev/` respondeu com a identidade e o contato corretos na revisão de 27/10/2026; ela é usada até eventual escolha de domínio próprio. `og-image.png` tem 1200×630 pixels, derivada da arte SVG local. Mudanças no domínio exigem editar a configuração e executar o build.

A versão revisada está publicada na URL acima. `_headers` foi verificado em produção, assim como a resposta HTTP 404 personalizada. `wrangler.jsonc` registra o Worker existente e serve somente `dist/`, gerado pelo build a partir de uma lista explícita de arquivos públicos.

Para publicar uma revisão autorizada, autentique sua conta Cloudflare e execute:

```sh
npx wrangler login --device
npm run deploy
```

Wrangler tem versão fixa no lockfile. Não salve tokens no repositório. Neste ambiente cloud, use `XDG_CONFIG_HOME=/workspace/.config` antes dos comandos Wrangler/deploy para reutilizar o login já autorizado. O GitHub é atualizado por commit/push; isso não substitui o deploy Cloudflare.

## Contato e comportamento
Os links WhatsApp têm mensagem codificada no HTML e em `data-message`. O script preserva o mesmo telefone; não confirma reservas. Menu e FAQ usam `details` nativo, funcionando sem JavaScript. Escape fecha o menu com JavaScript e devolve o foco ao controle.

## Evidências e pendências
Veja `RELATORIO_VALIDACAO_FINAL_RICARDO.md` para resultados, limitações e comparação com Luís; `DM_SIGNATURE_STANDARD.md` documenta os critérios reutilizáveis.

Pendências comerciais: aprovação de marca/textos, confirmação de cada destino atendido e eventual domínio próprio. A região geral São José do Rio Preto e região foi confirmada no último briefing. Não foram inventados aeroportos específicos, endereço, preços ou avaliações.
