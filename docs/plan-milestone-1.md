# Milestone 1: Gatsby → Astro migration (WordPress backend retained)

Rebuild the fppdesign-2018 Gatsby 5 site as Astro 7 SSG in `/home/joel/dev/fppastro`, keeping the headless WordPress backend (`https://admin.fppdesign.com.au/graphql`). EmDash CMS is out of scope (Milestone 2, see `docs/adr/0002`).

Reference docs: `CONTEXT.md`, `docs/adr/0001-lazysizes-over-astro-image.md`, `docs/adr/0002-incremental-migration-deferred-emdash.md`. Source site: `/home/joel/dev/fppdesign-2018`. WP reference: `/home/joel/dev/fpp-admin` (do NOT read `.env`, `wp-config.php`, or any credentials).

## Key decisions (already made — do not relitigate)

1. **Keep React components**, port 1:1. Astro renders React server-side; zero client JS except lazysizes. Rename every `index.js` → `index.jsx` (Vite requires `.jsx` for JSX). Only 2 components change internally.
2. **Port SCSS as-is** (Astro compiles `.scss` natively). Replace the Typography.js runtime with extracted static CSS. Convert repeated rem values to CSS custom properties only where a value repeats 3+ times as a design token (per ADR discussion).
3. **Images**: keep lazysizes + jb-lazysizes CSS. Images are pre-sized on the WP Offload CDN (`assets.fppdesign.com.au`). Do NOT use `astro:assets`/`Image` (ADR 0001). Fixture content already contains server-rewritten lazysizes markup (`data-src`, `jb-aspect-*`).
4. **SSG only**, deploy to Netlify, `publish = "dist"`, Node 22 (package.json engines is `>=22.12.0`).
5. **Contact form is a Netlify form** (`data-netlify="true"`, `action="/thank-you/"`) embedded in WP content — works as-is in static output. `/thank-you/` is a WP page covered by the catch-all route.
6. **wufooForm.js is dead code** — nothing imports it. Do not port it, do not port `utils/typography.js`.

## Steps

### 1. Add integrations (scaffold already exists)

Astro 7.1.4 minimal template is already initialised in `/home/joel/dev/fppastro`. Do NOT re-scaffold. From the repo root:

```bash
pnpm astro add react
pnpm add sass compass-vertical-rhythm lazysizes
```

Delete the placeholder `src/pages/index.astro`.

### 2. Static assets → `public/`

Copy from `/home/joel/dev/fppdesign-2018/static/`:
- `_headers`, `_redirects` (verbatim — Netlify reads from output root)
- `favicon.ico`, `apple-touch-icon.png`, `pinterest-1db85.html`
- `icons/icon-192x192.png`, `icons/icon-512x512.png`

Delete scaffold leftovers `public/favicon.svg` (keep the copied `favicon.ico`). Write `public/manifest.webmanifest` (replaces gatsby-plugin-manifest):

```json
{
  "name": "Faster Pussycat Productions",
  "short_name": "FPP Design",
  "start_url": "/",
  "background_color": "#ffffff",
  "theme_color": "#599e01",
  "display": "minimal-ui",
  "icons": [
    { "src": "/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### 3. Typography + styles

Copy directories verbatim from fppdesign-2018: `src/sass/` (14 partials), `src/css/jb-lazysizes.min.css` (+ `.css` source), `src/fonts/`, `src/img/`. Relative `url()` refs in SCSS resolve under Vite unchanged.

Two edits to `src/sass/_generic.global.scss`: replace the `[id="___gatsby"]` selector with `body` (2 rule blocks — the `height: 100%` group and the `display: flex` block). Astro has no Gatsby wrapper div; the body is the flex container.

Extract the Typography.js CSS (its runtime doesn't exist outside Gatsby):

```bash
curl -s https://fppdesign.com.au/ | python3 -c "
import sys, re
blocks = re.findall(r'<style[^>]*>(.*?)</style>', sys.stdin.read(), re.S)
hit = [b for b in blocks if 's-editable' in b]
print(hit[0].strip() if hit else 'NOT FOUND')
" > src/styles/typography.css
```

The `.s-editable` selector is unique to this site's typography overrides; if NOT FOUND, inspect the live page's style blocks and identify by `font-family:Georgia` + heading rules. Then hand-convert repeated rem values to `:root` custom properties where the same value appears 3+ times (e.g. vertical-rhythm margins); leave one-offs literal.

### 4. Port React components

Copy `src/components/*` from fppdesign-2018, renaming every `index.js` → `index.jsx` (keep `style.module.scss` siblings). `import * as styles from './style.module.scss'` works unchanged in Astro/Vite.

Components ported unchanged: TheWrap, TheBanner, TheFooter, TheHeading, BaseMainColumn, BaseSideColumn, BaseContentWrap, SpotlightContainer, SidebarText, SidebarGallery, SidebarWidgetFactory.

`components/layout.jsx` — add `currentPath` prop, forward to TheMenu:

```jsx
export default ({ children, currentPath }) => (
  <TheWrap>
    <TheBanner><TheMenu currentPath={currentPath} /></TheBanner>
    <div className="middle"><BaseContentWrap>{children}</BaseContentWrap></div>
    <TheFooter />
  </TheWrap>
)
```

`components/TheMenu/index.jsx` — full rewrite (Gatsby `Link` → `<a>`, active state from prop):

```jsx
import * as styles from './style.module.scss'

const items = [
  { href: '/', label: 'Home', title: 'FPP home page', exact: true },
  { href: '/portfolio/', label: 'Portfolio', title: 'Our graphic design portfolio' },
  { href: '/contact/', label: 'Contact', title: 'Contact us via our email form' },
]

export default ({ currentPath = '/' }) => (
  <nav className={styles.nav} role="navigation">
    <ul className={styles.list}>
      {items.map((item) => {
        const active = item.exact ? currentPath === item.href : currentPath.startsWith(item.href)
        return (
          <li className={styles.item} key={item.href}>
            <a className={`${styles.link} ${active ? styles.active : ''}`} href={item.href} title={item.title}>
              {item.label}
            </a>
          </li>
        )
      })}
    </ul>
  </nav>
)
```

Copy `src/utils/colors.js` verbatim (TheHeading imports it). Copy `src/utils/helpers.js` but keep only `getCurrentYear` (used by TheFooter) — delete the rest (`getPath`, `getSidebarData`, `sortByObjProp`, `expires_in_days`, `commonStartOfWords`, `setAttrs`, `removeAttrs`, `extractFileNameFromAbsPath` are unused; the Gatsby node layer that consumed them is gone). Do NOT port `utils/typography.js` or `utils/wufooForm.js`.

### 5. Fixture data layer

Copy `docs/representative-pages/*.json` → `src/data/*.json`. Create `src/lib/pages.js`:

```js
const WP_GRAPHQL = 'https://admin.fppdesign.com.au/graphql'

const QUERY = `query AllPages {
  pages(first: 100, where: { status: PUBLISH }) {
    nodes {
      databaseId uri title content status
      pageMetadata { pageTitle }
      sidebarSelection {
        pageSidebarItems {
          nodes {
            ... on SidebarItem {
              databaseId title content
              sidebarLayout { template }
            }
          }
        }
      }
    }
  }
}`

export async function getAllPages() {
  const { HTACCESS_USER, HTACCESS_PASSWORD } = import.meta.env
  if (!HTACCESS_USER || !HTACCESS_PASSWORD) {
    const files = import.meta.glob('../data/*.json', { eager: true })
    return Object.values(files).map((m) => m.default)
  }
  const auth = Buffer.from(`${HTACCESS_USER}:${HTACCESS_PASSWORD}`).toString('base64')
  const res = await fetch(WP_GRAPHQL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Basic ${auth}` },
    body: JSON.stringify({ query: QUERY }),
  })
  const json = await res.json()
  if (json.errors) throw new Error(JSON.stringify(json.errors))
  return json.data.pages.nodes
}
```

WPGraphQL type names = Gatsby names minus the `Wp` prefix (`WpPage`→`Page`, `WpSidebarItem`→`SidebarItem`); ACF field names are identical. If the query errors on type names, verify against GraphiQL in wp-admin and adjust the fragment.

`ponytail:` `first: 100` is a hard ceiling covering all 34 current pages — bump or paginate when the count nears 100.

Create `.env` with empty placeholders `HTACCESS_USER=` / `HTACCESS_PASSWORD=` and note in README that real values come from the user (never read `fppdesign-2018/.env`).

### 6. Layout, pages, config

`src/layouts/Site.astro` — HTML shell + head (replaces gatsby-ssr.js + Gatsby Head), client-entry script (replaces gatsby-browser.js):

```astro
---
import '../sass/_generic.global.scss'
import '../css/jb-lazysizes.min.css'
import '../styles/typography.css'
import Layout from '../components/layout.jsx'
const { title, currentPath } = Astro.props
---
<html lang="en" class="no-js">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={title} />
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://assets.fppdesign.com.au" crossorigin />
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body>
    <Layout currentPath={currentPath}><slot /></Layout>
    <script>
      document.documentElement.className =
        document.documentElement.className.replace(/(\bno-js\b|\bjb-yes-js\b)/g, '') + ' jb-yes-js js '
      import('lazysizes')
    </script>
  </body>
</html>
```

Do NOT add `is:inline` to the script — Astro must bundle it so `import('lazysizes')` resolves.

`src/pages/[...slug].astro` — replaces gatsby-node.js + templates/page.js:

```astro
---
import SiteLayout from '../layouts/Site.astro'
import TheHeading from '../components/TheHeading/index.jsx'
import BaseMainColumn from '../components/BaseMainColumn/index.jsx'
import BaseSideColumn from '../components/BaseSideColumn/index.jsx'
import SidebarWidgetFactory from '../components/SidebarWidgetFactory/index.jsx'
import { getAllPages } from '../lib/pages.js'

export async function getStaticPaths() {
  const pages = await getAllPages()
  return pages
    .filter((p) => p.status === 'publish' && p.uri)
    .map((p) => ({
      params: { slug: p.uri.replace(/^\/|\/$/g, '') || undefined },
      props: { page: p },
    }))
}

const { page } = Astro.props
const title = page.pageMetadata?.pageTitle || page.title
const sidebarItems = (page.sidebarSelection?.pageSidebarItems?.nodes || [])
  .slice()
  .sort((a, b) => (a.sidebarLayout?.template || '').localeCompare(b.sidebarLayout?.template || ''))
---
<SiteLayout title={`${title} | Faster Pussycat Productions`} currentPath={Astro.url.pathname}>
  <div class="content">
    <TheHeading>{title}</TheHeading>
    <BaseMainColumn>
      <div set:html={page.content} />
    </BaseMainColumn>
    <BaseSideColumn>
      {sidebarItems.map((item) => <SidebarWidgetFactory nodes={[item]} />)}
    </BaseSideColumn>
  </div>
</SiteLayout>
```

`src/pages/404.astro` — port of 404.js: SiteLayout, TheHeading "Page Not Found", BaseMainColumn with the "doesn't exist" paragraph and a plain `<a href="/">Return to the home page</a>` link. Title "Page Not Found | Faster Pussycat Productions".

`astro.config.mjs`:

```js
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

export default defineConfig({
  site: 'https://fppdesign.com.au',
  trailingSlash: 'always',
  integrations: [react()],
})
```

`netlify.toml`:

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

## Verification

1. `pnpm build` without env vars → dist contains `index.html`, `portfolio/stationery/index.html`, `portfolio/cds/index.html`, `contact/index.html`, `404.html` (fixture pages only).
2. `pnpm dev` → visually compare all 4 pages against `https://fppdesign.com.au` equivalents. Verify: styled `&` ampersand in headings (e.g. portfolio "Get comfy & browse our portfolio"), sidebar gallery split-on-`<hr>` items + text client list on `/portfolio/cds/`, nav active states.
3. `view-source` contact page → `<form ... data-netlify="true" action="/thank-you/">` present.
4. Browser console: `<html>` class flips `no-js` → `jb-yes-js js`; lazysizes swaps `data-src`→`src` on scroll.
5. **User supplies real htaccess credentials** (implementer never reads the old `.env`) → `pnpm build` emits all 34 routes including `/thank-you/`, `/smoggy/*`, `/foster-kittens/*`, and remaining `/portfolio/*` sections.

## Out of scope (Milestone 2+)

EmDash CMS, Cloudflare Pages migration, service worker/offline support (gatsby-plugin-offline dropped), catch-links, CSS modernisation, component flattening, image pipeline changes.

## Assumptions

- WPGraphQL type names are Gatsby names minus `Wp` prefix; verify via GraphiQL if the query errors.
- Production deploy requires `HTACCESS_USER`/`HTACCESS_PASSWORD` set in Netlify env — without them the build silently falls back to the 4 fixture pages.
- JS not TS; pnpm; Node 22.
- The `<?xml encoding="UTF-8">` junk prefixing some WP content strings renders harmlessly (same as today); leave for parity.
