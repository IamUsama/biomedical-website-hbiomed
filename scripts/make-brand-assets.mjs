// Generates public/og.png (1200x630) from site.config.json + public/brand/icon.png.
// Run:  node scripts/make-brand-assets.mjs     (sharp is already a dependency)
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
const cfg = JSON.parse(readFileSync('site.config.json', 'utf8'));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const wrap = (t, n) => { const out = []; let l = ''; for (const w of t.split(' ')) { if ((l + ' ' + w).trim().length > n) { out.push(l); l = w; } else l = (l + ' ' + w).trim(); } out.push(l); return out; };
const lines = wrap(cfg.company.tagline.split('. ')[0], 52).slice(0, 3);
const icon = await sharp('public/brand/icon.png').resize(120, 120).png().toBuffer();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="#0f1b33"/><rect y="610" width="1200" height="20" fill="#1ca0db"/>
<text x="80" y="300" font-family="Helvetica,Arial,sans-serif" font-weight="700" font-size="64" fill="#ffffff">${esc(cfg.company.name)}</text>
${lines.map((l, i) => `<text x="80" y="${370 + i * 40}" font-family="Helvetica,Arial,sans-serif" font-size="30" fill="#b7c6d8">${esc(l)}</text>`).join('')}
</svg>`;
await sharp(Buffer.from(svg)).composite([{ input: icon, left: 80, top: 100 }]).png().toFile('public/og.png');
console.log('public/og.png written');
