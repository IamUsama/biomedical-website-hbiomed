# H Biomed Services — website

> Client edition of the ShaikhTECH Biomedical Website template (`IamUsama/biomedical-website`). Client-specific content lives in `site.config.json`; keep generic improvements in the template repo.

A fast, simple, accessible marketing website for a medical-equipment company. Static (Astro), no cookies, no trackers, no third-party requests. All text, contact details and photos come from one file — `site.config.json` — so a new customer takes minutes, not days.

Built by ShaikhTECH · usamashaikh99@gmail.com · +923337779890

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321 with live reload
npm run build      # static site in dist/
npm test           # accessibility, links, SEO, layout, privacy checks
```

Requires Node 22+.

## Make it a new customer's site (≈ 30 minutes)

1. Copy this repo (or use "Use this template").
2. Edit **`site.config.json`** — name, tagline, phone, address, services, products, about text.
3. Replace `public/brand/icon.png` (square logo, ≥ 256 px) and run `node scripts/make-brand-assets.mjs` to regenerate `public/og.png` (link-preview image).
4. Add or swap photos in `src/assets/photos/` (keep the file names or edit `photo` keys in the config) and update `photo-credits.json`.
5. `npm run build && npm test`.
6. Publish — see [docs/DOMAIN_SETUP.md](docs/DOMAIN_SETUP.md).

Full field-by-field guide: [docs/CUSTOMIZE.md](docs/CUSTOMIZE.md) · Facts to confirm with the customer: [docs/CONTENT_CHECKLIST.md](docs/CONTENT_CHECKLIST.md).

## What is included

- Pages: Home, Services, Products, About, Contact, Privacy, Photo credits, 404
- SEO: titles, descriptions, canonical URLs, Open Graph/Twitter cards, JSON-LD (`MedicalBusiness`), sitemap, robots.txt, web manifest
- Performance: self-hosted font, AVIF/WebP responsive images, zero framework JavaScript (two tiny scripts), long-cache hashed assets
- Accessibility: WCAG 2.1 AA checked with axe on every page, skip link, keyboard menu, visible focus, reduced-motion support
- Security & privacy: strict Content-Security-Policy, no cookies/analytics, honeypot-protected contact form (Web3Forms), `_headers` for Netlify/Cloudflare
- Contact: call / WhatsApp / email links plus an enquiry form; if no form key is set the page shows direct-contact buttons instead
- CI: build, type-check, HTML validation and Playwright tests on every push; optional GitHub Pages deployment workflow

## Contact form

Create a free access key at https://web3forms.com using the company email, paste it into `contact.web3formsKey`. The key is designed to be public. Until then the Contact page shows call/WhatsApp/email buttons.

## Licence

Code © ShaikhTECH — all rights reserved; see LICENSE. Photographs are third-party (Unsplash License) — see `photo-credits.json`.
