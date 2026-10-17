import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

// SITE_URL / SITE_BASE are set by CI. Locally the site is served from "/".
// Project page on GitHub Pages:  SITE_URL=https://<user>.github.io  SITE_BASE=/<repo>
// Custom domain (public/CNAME):  SITE_URL=https://example.com        SITE_BASE=/
const cfg = JSON.parse(readFileSync(new URL('./site.config.json', import.meta.url), 'utf8'));
const site = process.env.SITE_URL || cfg.site.url || 'http://localhost:4321';
const base = process.env.SITE_BASE || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'never' }, // keeps the Content-Security-Policy free of 'unsafe-inline'
  vite: { build: { assetsInlineLimit: 0 } },
  image: { layout: undefined },
});
