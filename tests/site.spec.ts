import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = ['/', '/services/', '/products/', '/about/', '/contact/', '/privacy/', '/credits/', '/404.html'];

for (const p of pages) {
  test(`accessibility + basics: ${p}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(p);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/.+/);
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(r.violations.map((v) => `${v.id}: ${v.nodes[0].html.slice(0, 120)}`)).toEqual([]);
    expect(errors).toEqual([]); // includes Content-Security-Policy violations
  });
}

test('no third-party requests on any page', async ({ page }) => {
  const external: string[] = [];
  page.on('request', (r) => {
    const u = new URL(r.url());
    if (u.hostname !== 'localhost' && !u.protocol.startsWith('data')) external.push(r.url());
  });
  for (const p of pages) await page.goto(p, { waitUntil: 'networkidle' });
  expect(external).toEqual([]);
});

test('every internal link resolves', async ({ page, request }) => {
  const seen = new Set<string>();
  for (const p of pages) {
    await page.goto(p);
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => (a as HTMLAnchorElement).href));
    for (const h of hrefs) {
      const u = new URL(h);
      if (u.hostname !== 'localhost' || seen.has(u.pathname)) continue;
      seen.add(u.pathname);
      const res = await request.get(u.href);
      expect(res.status(), u.href).toBe(200);
    }
  }
});

test('mobile menu opens, closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto('/');
  const btn = page.getByRole('button', { name: 'Menu' });
  await btn.click();
  await expect(page.getByLabel('Main').getByRole('link', { name: 'Services' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByLabel('Main').getByRole('link', { name: 'Services' })).toBeHidden();
});

test('SEO essentials', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', /^https?:\/\//);
  await expect(page.locator('meta[name=description]')).toHaveAttribute('content', /.{40,}/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og\.png$/);
  const ld = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  expect(ld['@type']).toBe('MedicalBusiness');
  for (const f of ['/robots.txt', '/sitemap-index.xml', '/site.webmanifest', '/og.png']) expect((await request.get(f)).status(), f).toBe(200);
});

for (const w of [360, 768, 1280, 1920]) {
  test(`no horizontal overflow at ${w}px`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: 900 });
    for (const p of pages) {
      await page.goto(p);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(over, `${p} @${w}`).toBeLessThanOrEqual(0);
    }
  });
}

test('contact page works without a form key (fallback) ', async ({ page }) => {
  await page.goto('/contact/');
  const form = page.locator('#contact-form');
  if (await form.count()) {
    await form.getByRole('button', { name: 'Send enquiry' }).click();
    await expect(page.locator('#name')).toBeFocused(); // native validation blocks empty submit
  } else {
    await expect(page.getByRole('link', { name: /^Call/ })).toBeVisible();
  }
});
