# Táxi Ricardo Aeroporto — demonstração

Landing page estática e não oficial para apresentar uma possibilidade de presença digital. O contato abre o WhatsApp confirmado com uma mensagem pré-preenchida; a página não agenda nem confirma corridas.

## Abrir localmente

O arquivo `styles.css` está incluído, então a página pode ser aberta diretamente por `index.html` ou servida por qualquer servidor estático. A página não faz chamadas a scripts, fontes ou imagens externas.

## Reconstruir o CSS Tailwind

Com Node.js e acesso ao registro npm, execute `npm install` e depois `npm run build`. O comando gera `styles.css` a partir de `src/input.css` e das classes usadas na página. A configuração está em `tailwind.config.js`.

## Publicação temporária gratuita

Envie os arquivos deste projeto a um serviço de hospedagem estática que ofereça endereço temporário (por exemplo, Netlify Drop ou GitHub Pages). Configure o serviço para servir `index.html` na raiz. Use somente o endereço temporário disponibilizado pela plataforma; nenhum domínio foi escolhido ou comprado. Não publique em nome do cliente sem autorização.

Esta demonstração inclui `noindex, nofollow` para desencorajar indexação. A hospedagem deve fornecer HTTPS; nenhuma configuração de hospedagem ou cabeçalho de segurança foi feita neste código ou validada antes de publicar.

## Estrutura

- `index.html`: conteúdo semântico, metadados e SVG da composição visual.
- `src/input.css`: entrada do Tailwind e estilos personalizados responsivos.
- `styles.css`: CSS compilado para hospedar com a página.
- `script.js`: menu mobile e entradas suaves respeitando movimento reduzido.
- `tailwind.config.js` e `package.json`: configuração e build do CSS.

