import { cp, mkdir, rm } from 'node:fs/promises';

// Public allowlist: source, tests, credentials and dependencies stay out of deploys.
const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of [
  'index.html', 'privacidade.html', '404.html', 'styles.css', 'tailwind.css',
  'script.js', 'favicon.svg', 'og-image.svg', 'og-image.png', 'robots.txt',
  'sitemap.xml', '_headers', 'assets',
]) {
  await cp(new URL(file, root), new URL(file, output), { recursive: true });
}
console.log('Public site packaged in dist/');
