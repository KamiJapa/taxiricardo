# Táxi Aeroporto — Ricardo

Landing page estática para apresentação dos serviços e início de agendamentos pelo WhatsApp. Esta entrega é local e está pronta para revisão; não foi publicada.

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

## SEO e publicação futura

Não há domínio confirmado. Portanto, não existe canonical, URL absoluta de compartilhamento nem sitemap. O `robots.txt` impede indexação nesta versão local e deve ser atualizado antes de qualquer publicação autorizada. O SVG Open Graph pode exigir uma versão PNG absoluta conforme a plataforma escolhida.

Antes de publicar, escolher hospedagem, definir domínio, atualizar URLs sociais/metadados quando necessário, rever robots/sitemap e configurar cabeçalhos de segurança no host. HSTS depende de hospedagem HTTPS. O JSON-LD usa apenas nome, telefone e tipos de serviço confirmados; não declara endereço ou área de cobertura.

## Pendências comerciais

- Domínio e extensão definitivos.
- Confirmação da área operacional e municípios atendidos.
- Aprovação do logotipo proposto e dos textos pelo Ricardo.
- Autorização específica para uso público das fotografias.
- Confirmação de outros serviços além dos descritos.
- Revisão da política de privacidade após definição do host e dos serviços de terceiros.
- Validação comercial final.

Não há Instagram, formulário, analytics, avaliações ou integrações externas nesta versão.
