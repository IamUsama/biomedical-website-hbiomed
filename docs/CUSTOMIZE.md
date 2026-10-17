# Customising the site

Everything lives in `site.config.json`. After any change run `npm run build && npm test`.

| Section | What it controls |
|---|---|
| `site.url` | Final public address (also set by CI). Used for canonical links, sitemap, previews. |
| `company.*` | Name, tagline (footer + hero), SEO title/description, address, phone & WhatsApp (digits only, `923001234567`), email, hours, map link, social links. `showTaxNumber` publishes NTN in the footer. |
| `contact.web3formsKey` | Enables the enquiry form (see README). |
| `hero` | Eyebrow, headline, lead text, background photo key. |
| `services[]` | Cards on Home and Services. `icon` is any [Lucide](https://lucide.dev/icons) icon name. |
| `products[]` | Product groups with photo and bullet list. |
| `process[]` | The four "How it works" steps. |
| `about` | Title, paragraphs, tick-list, photo. |
| `photoAlt` | Describes each photo for screen readers — update when you change a photo. |
| `legal` | Privacy contact email and "last updated" date. |
| `vendor.show` | Shows "Website by ShaikhTECH" in the footer. |

## Colours

Edit the variables at the top of `src/styles/global.css` (`--cyan-dark` is used for text and buttons — keep it dark enough for contrast; the tests will fail if accessibility drops).

## Photos

Files in `src/assets/photos/` are optimised automatically at build time. Use only photos you may legally use, and list them in `photo-credits.json` (shown on the /credits/ page). Prefer equipment and empty rooms; avoid identifiable patients.

## Adding a page

Create `src/pages/<name>.astro` using `Base.astro`, add the link in `src/layouts/Base.astro` (`nav`), and add the path to `tests/site.spec.ts`.
