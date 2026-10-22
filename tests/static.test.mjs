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
  assert.match(html, /href="https:\/\/wa\.me\/5517981012405"/);
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
  assert.doesNotMatch(html, /rel="canonical"/);
});

test('privacidade explica o redirecionamento e limites da versão local', async () => {
  const privacy = await readFile(resolve(root, 'privacidade.html'), 'utf8');
  assert.match(privacy, /direcionado ao serviço do WhatsApp/i);
  assert.match(privacy, /hospedagem ainda não foi escolhida/i);
});
