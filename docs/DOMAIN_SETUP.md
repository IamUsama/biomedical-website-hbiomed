# Publishing and custom domain

## Option A — GitHub Pages (free)

Free GitHub accounts can publish Pages only from a **public** repository, so the code of a customer's site will be public (it contains no secrets — the form key is public by design). Paid plans can keep the repo private.

1. Repo → **Settings → Pages → Source: GitHub Actions**.
2. Repo → **Settings → Secrets and variables → Actions → Variables** → add `DEPLOY_PAGES` = `true`.
3. Push to `main` (or run the *Deploy to GitHub Pages* workflow). The site appears at `https://<user>.github.io/<repo>/`.

## Custom domain (recommended: a short `.com`)

1. Buy the domain from a registrar with at-cost renewals and free WHOIS privacy (Cloudflare Registrar or Namecheap). Use the company name, no hyphens or extras, e.g. `hbiomedservices.com`.
2. At the registrar's DNS settings:
   - Four **A** records on `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Four **AAAA** records on `@` → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - One **CNAME** on `www` → `<user>.github.io` (use `iamusama.github.io` for this account)
   - If using Cloudflare DNS, set these records to **DNS only** (grey cloud).
3. In the repo create `public/CNAME` containing just the domain (e.g. `hbiomedservices.com`) and push. CI then builds for the domain root automatically.
4. **Settings → Pages → Custom domain** → enter the domain, wait for the DNS check, tick **Enforce HTTPS**.
5. Also set `site.url` in `site.config.json` to the final `https://…` address.
6. Business email on the domain (optional): use the registrar's email forwarding to the existing Gmail so the public address looks professional.

## Option B — Netlify / Cloudflare Pages

Connect the repo, build command `npm run build`, output `dist`. `public/_headers` supplies the security headers. Set env `SITE_URL=https://yourdomain`.

## After going live

- Search Google for `site:yourdomain` after a few days; submit `https://yourdomain/sitemap-index.xml` in Google Search Console and create the Google Business Profile with the same name, address and phone.
- Run PageSpeed Insights on the live URL.
