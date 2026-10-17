import cfg from '../../site.config.json';

export const site = cfg;
export const c = cfg.company;

/** Prefix an internal path with the deployment base ("/" or "/<repo>/"). */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = path.replace(/^\//, '');
  return `${base}/${p}`;
}

/** 923001234567 -> "+92 300 1234567" for display. Falls back to the raw digits. */
export function prettyPhone(p: string): string {
  const m = /^92(\d{3})(\d{7})$/.exec(p);
  return m ? `+92\u00A0${m[1]}\u00A0${m[2]}` : p;
}

export const telHref = (p: string) => `tel:+${p}`;
export const waHref = (p: string, text = '') => `https://wa.me/${p}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

const icons = import.meta.glob('/node_modules/lucide-static/icons/*.svg', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
export function icon(name: string): string {
  const svg = icons[`/node_modules/lucide-static/icons/${name}.svg`];
  if (!svg) throw new Error(`Unknown icon "${name}" (see https://lucide.dev/icons)`);
  return svg.replace(/<!--[\s\S]*?-->/g, '').replace(/ class="[^"]*"/, '').replace(/ width="24" height="24"/, ' width="24" height="24" aria-hidden="true" focusable="false"');
}

const photos = import.meta.glob('/src/assets/photos/*.{jpg,jpeg,png}', { eager: true, import: 'default' }) as Record<string, ImageMetadata>;
export function photo(key: string): ImageMetadata {
  const hit = Object.entries(photos).find(([p]) => p.split('/').pop()!.replace(/\.[a-z]+$/, '') === key);
  if (!hit) throw new Error(`Unknown photo "${key}" in src/assets/photos`);
  return hit[1];
}
export const photoAlt = (key: string) => (cfg.photoAlt as Record<string, string>)[key] ?? '';
