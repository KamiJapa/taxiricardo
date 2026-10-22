# Táxi Aeroporto — Ricardo

Landing page estática para apresentação dos serviços e início de agendamentos pelo WhatsApp. Publicada em [taxi-aeroporto-ricardo.japa-kamitm.workers.dev](https://taxi-aeroporto-ricardo.japa-kamitm.workers.dev) e versionada em [KamiJapa/taxiricardo](https://github.com/KamiJapa/taxiricardo).

## Stack e estrutura

- HTML semântico, CSS responsivo e JavaScript sem framework.
- Tailwind CSS 3.4.17 para build de utilitários; estilos de apresentação próprios em `styles.css`.
- Node.js para build e testes estáticos.
- `assets/photos/`: derivações WebP das três fotos fornecidas. Placas borradas e metadados removidos localmente. Os originais não foram alterados nem copiados para o projeto.
- `src/input.css`: entrada Tailwind.
- `tests/static.test.mjs`: verificações estáticas de conteúdo, links, arquivos e requisitos básicos.
- `index.html`, `privacidade.html` e `404.html`: páginas do site.
- `RELATORIO_VALIDACAO_FINAL_RICARDO.md`: resultados e pendências desta revisão.

## Requisitos

- Node.js 20 ou superior.
- npm 10 ou superior.

## Instalação e execução local

```bash
npm ci
npm run dev
```

Sirva a pasta com qualquer servidor estático local. Não é necessário configurar credenciais ou serviços externos. Para gerar a folha Tailwind otimizada:

```bash
npm run build
```

**Limitação desta revisão:** o ambiente não conseguiu consultar `registry.npmjs.org` (`ENOTFOUND`) e não tinha metadados Tailwind no cache offline. Por isso, o `package-lock.json` ainda não foi gerado e `npm ci` não pode ser concluído aqui. O build foi executado com Tailwind já instalado no workspace pai; para instalação isolada, restaure o acesso ao registry, gere/valide o lockfile e repita `npm ci`.

## Testes

```bash
npm run test:static
```

Playwright não está incluído como dependência porque não estava disponível no ambiente local desta entrega. Os testes de navegador e as auditorias Lighthouse/axe estão pendentes; não foram simulados.

## Configuração de contato

O telefone fica centralizado em `data-whatsapp-phone` no elemento `<html>` de cada página. Os CTAs trazem um `href` de fallback para o mesmo número e mensagens de contexto em `data-message`; `script.js` codifica a mensagem usando `encodeURIComponent`. A página também oferece o telefone como link `tel:`.

## SEO e publicação

O site está publicado no subdomínio padrão do Cloudflare Workers. `robots.txt` permite rastreamento. Canonical, sitemap e imagem Open Graph com URL absoluta ficam pendentes até a definição de um domínio próprio. O SVG Open Graph pode exigir uma versão PNG conforme a plataforma de compartilhamento.

O JSON-LD usa apenas nome, telefone e tipos de serviço confirmados; não declara endereço ou área de cobertura. Cabeçalhos de segurança e política de privacidade devem ser revistos após a escolha de domínio próprio e eventuais serviços de terceiros.

## Pendências comerciais

- Domínio e extensão definitivos.
- Confirmação da área operacional e municípios atendidos.
- Aprovação do logotipo proposto e dos textos pelo Ricardo.
- Confirmação de outros serviços além dos descritos.
- Aprovação do logotipo proposto e dos textos pelo Ricardo.
- Revisão da política de privacidade após definição de domínio e serviços de terceiros.
- Validação comercial final.

Não há Instagram, formulário, analytics, avaliações ou integrações externas nesta versão.
