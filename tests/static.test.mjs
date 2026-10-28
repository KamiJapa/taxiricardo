import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const js = await readFile(resolve(root, 'script.js'), 'utf8');
const styles = await readFile(resolve(root, 'styles.css'), 'utf8');

test('identidade e contatos comerciais confirmados', () => {
  assert.match(html, /Táxi Aeroporto/);
  assert.match(html, /data-whatsapp-phone="5517981012405"/);
  assert.match(html, /tel:\+5517981012405/);
  assert.match(html, /desde 2016/i);
  assert.match(html, /24h[^<]{0,60}agendamento/i);
  assert.doesNotMatch(html, /instagram\.com|taxiaeroporto\.com\.br/i);
});

test('CTAs do WhatsApp têm fallback, mensagem contextual e codificação', () => {
  const ctas = html.match(/data-wa\b/g) || [];
  assert.ok(ctas.length >= 10, `Esperados vários CTAs contextuais; encontrados ${ctas.length}`);
  assert.match(html, /href="https:\/\/wa\.me\/5517981012405\?text=/);
  assert.match(js, /encodeURIComponent\(message\)/);
  assert.match(js, /dataset\.whatsappPhone/);
});

test('página principal não depende de formulário e preserva navegação sem JS', () => {
  assert.doesNotMatch(html, /<form\b/i);
  assert.match(html, /<details/);
  assert.match(html, /<summary/);
  assert.match(html, /skip-link/);
  assert.match(styles, /prefers-reduced-motion/);
});

test('âncoras internas apontam para seções existentes e há um único H1', () => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id));
  const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map(([, id]) => id);
  assert.ok(anchors.every((id) => ids.has(id)), `Âncoras sem destino: ${anchors.filter((id) => !ids.has(id)).join(', ')}`);
  assert.equal((html.match(/<h1\b/gi) || []).length, 1);
});

test('imagens locais, alternativas e metadados existem', async () => {
  for (const path of [
    'assets/photos/duster-lateral-720.webp',
    'assets/photos/duster-lateral-1440.webp',
    'assets/photos/duster-diagonal.webp',
    'assets/photos/duster-frontal.webp',
    'favicon.svg', 'og-image.svg', 'robots.txt', 'privacidade.html', '404.html', 'tailwind.css',
  ]) await access(resolve(root, path));
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(([tag]) => tag);
  assert.ok(images.length >= 3);
  assert.ok(images.every((tag) => /\balt="[^"]+"/.test(tag)));
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.match(html, /<meta name="description" content="[^"]+">/);
  assert.match(html, /<meta property="og:image" content="https:\/\/taxi-aeroporto-ricardo\.japa-kamitm\.workers\.dev\/og-image\.png">/);
  const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(jsonLd, 'JSON-LD deve existir');
  const business = JSON.parse(jsonLd[1]);
  assert.equal(business.telephone, '+55 17 98101-2405');
  assert.deepEqual(business.serviceType, ['Viagens em geral', 'Transporte executivo', 'Transporte para aeroporto']);
});

test('privacidade explica o redirecionamento e limites da versão local', async () => {
  const privacy = await readFile(resolve(root, 'privacidade.html'), 'utf8');
  assert.match(privacy, /direcionado ao serviço do WhatsApp/i);
  assert.match(privacy, /Cloudflare, como provedor de hospedagem/i);
});

test('canonical, sitemap e compartilhamento usam a URL configurada', async () => {
  const { url } = JSON.parse(await readFile(resolve(root, 'site.config.json'), 'utf8'));
  const canonical = html.match(/rel="canonical" href="([^"]+)"/);
  assert.equal(canonical?.[1], `${url}/`);
  assert.ok(html.includes(`content="${url}/og-image.png"`));
  const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
  assert.ok(sitemap.includes(`<loc>${url}/</loc>`));
  assert.ok(sitemap.includes(`<loc>${url}/privacidade.html</loc>`));
  assert.ok((await readFile(resolve(root, 'robots.txt'), 'utf8')).includes(`Sitemap: ${url}/sitemap.xml`));
  const png = await readFile(resolve(root, 'og-image.png'));
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
});

test('mensagens e telefone funcionam mesmo sem JavaScript', async () => {
  for (const file of ['index.html', 'privacidade.html']) {
    const source = await readFile(resolve(root, file), 'utf8');
    for (const [tag] of source.matchAll(/<a\b[^>]*data-wa[^>]*>/g)) {
      const href = new URL(tag.match(/href="([^"]+)"/)[1]);
      assert.equal(href.origin, 'https://wa.me');
      assert.equal(href.pathname, '/5517981012405');
      assert.equal(href.searchParams.get('text'), tag.match(/data-message="([^"]+)"/)[1]);
    }
  }
});
