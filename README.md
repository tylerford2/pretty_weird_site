# Pretty Weird Apparel Co. — Website

A static marketing/funnel site for Pretty Weird Apparel Co. It showcases the
brand and product catalog and sends visitors out to a third-party storefront
for cart/checkout, and to email for custom DTF order requests. No backend,
no data storage — plain HTML/CSS/JS, deployed on GitHub Pages.

## Structure

```
index.html      Home
shop.html       Pre-made product catalog (links out to storefront)
custom.html     Custom DTF order request funnel (opens a pre-filled email)
about.html      Brand story / what is DTF printing
contact.html    Contact + socials
css/style.css   Shared design system
js/config.js    ⭐ Single place to set your storefront link, contact email, socials
js/main.js      Mobile nav + active-link handling
assets/images/  Logo files
CNAME           Custom domain for GitHub Pages (prettyweirdapparel.com)
robots.txt      Search engine crawl rules
sitemap.xml     Search engine sitemap
```

## 1. Before you launch — edit `js/config.js`

This is the only file you should need to touch regularly:

```js
window.PW_CONFIG = {
  shopUrl: '#',                          // your storefront link (see below)
  email: 'hello@prettyweirdapparel.com', // real inbox for order requests
  instagram: '',
  tiktok: '',
};
```

Every "Shop Now" / "Buy" button on the site reads `shopUrl`. Every email
link/button reads `email`. Update once, it updates everywhere.

### Picking a storefront platform
You haven't picked one yet — when you do (Shopify, Etsy, Big Cartel, Square
Online, etc.), just drop its store URL into `shopUrl`. Nothing else on this
site needs to change. If you want individual products on `shop.html` to link
to their own specific product pages instead of the general storefront, edit
the `data-shop-link` attributes on those buttons in `shop.html` directly
(swap `data-shop-link href="#"` for a real `href="https://..."` and drop the
`data-shop-link` attribute so `config.js` doesn't overwrite it).

## 2. Deploying to GitHub Pages

1. Create a new GitHub repo (e.g. `pretty-weird-website`).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages** → Source: **Deploy from a branch** →
   Branch: `main`, folder `/ (root)` → Save.
4. GitHub Pages will build the site at `https://<your-username>.github.io/<repo-name>/`.

## 3. Connecting your domain (prettyweirdapparel.com via IONOS)

The `CNAME` file in this repo already tells GitHub Pages to serve the site
at `prettyweirdapparel.com`. You need to point IONOS's DNS at GitHub:

**In IONOS DNS settings for prettyweirdapparel.com, add:**

| Type  | Host/Name | Value                  |
|-------|-----------|-------------------------|
| A     | @         | 185.199.108.153         |
| A     | @         | 185.199.109.153         |
| A     | @         | 185.199.110.153         |
| A     | @         | 185.199.111.153         |
| CNAME | www       | `<your-username>.github.io.` |

(Those four `A` records are GitHub Pages' standard IPs — add all four.)

**Then in your GitHub repo:** Settings → Pages → under "Custom domain" enter
`prettyweirdapparel.com` → Save. Check **Enforce HTTPS** once the
certificate is issued (can take a few hours after DNS propagates — DNS
changes can take up to 24–48 hrs to fully propagate).

## 4. SEO / webmaster setup

Already in place:
- Per-page `<title>`, meta description, canonical URL
- Open Graph + Twitter Card tags (for Facebook/social link previews)
- `ClothingStore` structured data (JSON-LD) on the homepage
- `robots.txt` and `sitemap.xml` (pointing at `prettyweirdapparel.com`)
- Mobile viewport meta + fully responsive layout (see testing notes below)

Still to do once the domain is live:

**Google Search Console** (search.google.com/search-console)
1. Add property → enter `prettyweirdapparel.com`.
2. Verify via the DNS TXT record method (IONOS) — most reliable option.
3. Submit `https://prettyweirdapparel.com/sitemap.xml` under Sitemaps.

**Bing Webmaster Tools** (bing.com/webmasters)
1. Easiest path: import the site directly from Google Search Console once
   that's verified (one click, no separate DNS record needed).
2. Or verify manually and submit the same sitemap URL.
3. Optionally add `<meta name="msvalidate.01" content="...">` — there's a
   commented placeholder for it in `index.html`'s `<head>`.

**Facebook / social previews**
Paste `https://prettyweirdapparel.com/` into Facebook's Sharing Debugger
(developers.facebook.com/tools/debug) after launch to confirm the logo/title/
description preview renders correctly, and to force Facebook to re-scrape if
you update the OG tags later.

**Image note:** OG/social previews currently use the square sunburst logo
(2000×2000). Facebook/Twitter prefer a 1200×630 (1.91:1) image — the square
works fine but a purpose-made banner image will look better in link
previews. Low priority, easy to swap into the `og:image` tags later.

## 5. Responsive / device testing

The layout uses fluid type (`clamp()`), CSS grid with `auto-fit`, and a
780px breakpoint for the mobile nav. Before launch, check at minimum:
- Mobile portrait (~375px), tablet (~768px), and desktop (~1440px) widths
- The hamburger menu opens/closes and closes after tapping a link
- The custom-order form submit button on a real phone (opens mail app)

## Notes

- No customer data, form submissions, or payment info touches this site —
  by design. The custom-order form builds a `mailto:` link client-side and
  hands off to the visitor's own email app.
- No build step. Just static files — edit and push.
