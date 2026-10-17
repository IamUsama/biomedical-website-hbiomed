import type { APIRoute } from 'astro';
import { c, url } from '../lib/site';
export const GET: APIRoute = () =>
  new Response(JSON.stringify({ name: c.name, short_name: c.shortName || c.name, start_url: url('/'), scope: url('/'), display: 'browser', background_color: '#ffffff', theme_color: '#0e74a4', icons: [{ src: url('/brand/icon.png'), sizes: '438x438', type: 'image/png', purpose: 'any' }] }), { headers: { 'Content-Type': 'application/manifest+json' } });
