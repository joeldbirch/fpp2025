# Milestone 1: Gatsby → Astro migration (WordPress backend retained)

Rebuild the fppdesign-2018 Gatsby 5 site as Astro 7 SSG in `/home/joel/dev/fppastro`, keeping the headless WordPress backend (`https://admin.fppdesign.com.au/graphql`). EmDash CMS is out of scope (Milestone 2, see `docs/adr/0002`).

Reference docs: `CONTEXT.md`, `docs/adr/0001-lazysizes-over-astro-image.md`, `docs/adr/0002-incremental-migration-deferred-emdash.md`. Source site: `/home/joel/dev/fppdesign-2018`. WP reference: `/home/joel/dev/fpp-admin` (read-only reference for plugin/schema details — not needed for the build). htaccess credentials for the WP GraphQL endpoint live in `/home/joel/dev/fppdesign-2018/.env` — the implementer may read that file.

## How to resume across sessions

1. Read this file.
2. Find the first phase containing an unticked `- [ ]` item — that is where you are.
3. Completed phases are committed; `git log --oneline` shows phase commits.
4. Never skip a phase's **Validate** step before its **Commit** step.

## Git management

- Work directly on `main` (solo repo, pre-release).
- One commit per phase, after its validation passes. Suggested message given per phase.
- If a phase's validation fails and you can't fix it within the session, commit nothing; leave a `STATUS.md` note at repo root describing the blocker.
- Phase 0 prerequisite check: `git status` clean except for this plan file. If the plan itself is uncommitted, commit it first: `docs: milestone 1 implementation plan`.

## Key decisions (already made — do not relitigate)

1. **Keep React components**, port 1:1. Astro renders React server-side; zero client JS except lazysizes. Rename every `index.js` → `index.jsx` (Vite requires `.jsx` for JSX). Only 2 components change internally.
2. **Port SCSS as-is** (Astro compiles `.scss` natively). Replace the Typography.js runtime with extracted static CSS. Convert repeated rem values to CSS custom properties only where a value repeats 3+ times as a design token.
3. **Images**: keep lazysizes + jb-lazysizes CSS. Images are pre-sized on the WP Offload CDN (`assets.fppdesign.com.au`). Do NOT use `astro:assets`/`Image` (ADR 0001). Fixture content already contains server-rewritten lazysizes markup (`data-src`, `jb-aspect-*`).
4. **SSG only**, deploy to Netlify, `publish = "dist"`, Node 22 (package.json engines is `>=22.12.0`).
5. **Contact form is a Netlify form** (`data-netlify="true"`, `action="/thank-you/"`) embedded in WP content — works as-is in static output. `/thank-you/` is a WP page covered by the catch-all route.
6. **wufooForm.js is dead code** — nothing imports it. Do not port it, do not port `utils/typography.js`.

---

## Phase 1 — Dependencies & config

Astro 7.1.4 minimal template is already initialised. Do NOT re-scaffold.

- [x] Run `pnpm astro add react`
- [x] Run `pnpm add sass compass-vertical-rhythm lazysizes`
- [x] Replace `astro.config.mjs` contents with:

```js
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

export default defineConfig({
  site: 'https://fppdesign.com.au',
  trailingSlash: 'always',
  integrations: [react()],
})
```

**Validate**: `pnpm build` exits 0 (placeholder `src/pages/index.astro` still present — it gets deleted in Phase 6).

**Commit**: `git add -A && git commit -m "chore: add react, sass, lazysizes integrations"`

---

## Phase 2 — Static assets & manifest

Copy from `/home/joel/dev/fppdesign-2018/static/` into `public/`:

- [x] `_headers`, `_redirects` (verbatim — Netlify reads from output root)
- [x] `favicon.ico`, `apple-touch-icon.png`, `pinterest-1db85.html`
- [x] `icons/icon-192x192.png`, `icons/icon-512x512.png`
- [x] Delete scaffold leftover `public/favicon.svg`
- [x] Write `public/manifest.webmanifest` (replaces gatsby-plugin-manifest):

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

**Validate**: `pnpm build` exits 0; `ls dist/` shows `_headers`, `_redirects`, `manifest.webmanifest`, `icons/`, `pinterest-1db85.html`.

**Commit**: `git commit -am "feat: static assets and web manifest"`

---

## Phase 3 — Styles, fonts, typography

- [x] Copy verbatim from fppdesign-2018: `src/sass/` (14 partials), `src/css/jb-lazysizes.min.css` (+ `.css` source), `src/fonts/`, `src/img/`. Relative `url()` refs in SCSS resolve under Vite unchanged.
- [x] Edit `src/sass/_generic.global.scss`: replace the `[id="___gatsby"]` selector with `body` (2 rule blocks — the `height: 100%` group and the `display: flex` block). Astro has no Gatsby wrapper div; body is the flex container.
- [x] Extract the Typography.js CSS (its runtime doesn't exist outside Gatsby):

```bash
curl -s https://fppdesign.com.au/ | python3 -c "
import sys, re
blocks = re.findall(r'<style[^>]*>(.*?)</style>', sys.stdin.read(), re.S)
hit = [b for b in blocks if 's-editable' in b]
print(hit[0].strip() if hit else 'NOT FOUND')
" > src/styles/typography.css
```

The `.s-editable` selector is unique to this site's typography overrides; if NOT FOUND, inspect the live page's style blocks and identify by `font-family:Georgia` + heading rules.

- [x] Hand-convert repeated rem values in `typography.css` to `:root` custom properties where the same value appears 3+ times (e.g. vertical-rhythm margins); leave one-offs literal.

**Validate**: `grep -c "s-editable" src/styles/typography.css` ≥ 1; `grep "___gatsby" src/sass/_generic.global.scss` returns nothing; `pnpm build` exits 0.

**Commit**: `git commit -am "feat: port sass framework, fonts, extracted typography css"`

---

## Phase 4 — React components

- [x] Copy `src/components/*` from fppdesign-2018, renaming every `index.js` → `index.jsx` (keep `style.module.scss` siblings). `import * as styles from './style.module.scss'` works unchanged.
- [x] Components ported unchanged: TheWrap, TheBanner, TheFooter, TheHeading, BaseMainColumn, BaseSideColumn, BaseContentWrap, SpotlightContainer, SidebarText, SidebarGallery, SidebarWidgetFactory.
- [x] `components/layout.jsx` — add `currentPath` prop, forward to TheMenu:

```jsx
export default ({ children, currentPath }) => (
  <TheWrap>
    <TheBanner><TheMenu currentPath={currentPath} /></TheBanner>
    <div className="middle"><BaseContentWrap>{children}</BaseContentWrap></div>
    <TheFooter />
  </TheWrap>
)
```

- [x] `components/TheMenu/index.jsx` — full rewrite (Gatsby `Link` → `<a>`, active state from prop):

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

- [x] Copy `src/utils/colors.js` verbatim (TheHeading imports it).
- [x] Copy `src/utils/helpers.js` but keep only `getCurrentYear` (used by TheFooter) — delete the rest (`getPath`, `getSidebarData`, `sortByObjProp`, `expires_in_days`, `commonStartOfWords`, `setAttrs`, `removeAttrs`, `extractFileNameFromAbsPath` are unused).
- [x] Do NOT port `utils/typography.js` or `utils/wufooForm.js` (dead code).

**Validate**: `find src/components -name "index.js"` returns nothing; `grep -rn "from 'gatsby'\|from \"gatsby\"" src/` returns nothing; `pnpm build` exits 0.

**Commit**: `git commit -am "feat: port react components from gatsby"`

---

## Phase 5 — Data layer

- [x] Copy `docs/representative-pages/*.json` → `src/data/*.json`
- [x] Create `src/lib/pages.js`:

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

- [x] Create `.env` containing `HTACCESS_USER` and `HTACCESS_PASSWORD` with values copied from `/home/joel/dev/fppdesign-2018/.env`. Ensure `.env` is listed in `.gitignore` (add it if missing).

**Validate**: `python3 -m json.tool src/data/home.json > /dev/null` (and the other 3 fixtures) parse; `ls src/data/` shows 4 files; `pnpm build` exits 0.

**Commit**: `git commit -am "feat: fixture data layer with WP graphql fetch"`

---

## Phase 6 — Layout, pages, Netlify config

- [x] Delete placeholder `src/pages/index.astro`
- [x] Create `src/layouts/Site.astro` — HTML shell + head (replaces gatsby-ssr.js + Gatsby Head), client-entry script (replaces gatsby-browser.js):

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

- [x] Create `src/pages/[...slug].astro` — replaces gatsby-node.js + templates/page.js:

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

- [x] Create `src/pages/404.astro` — port of 404.js: SiteLayout, TheHeading "Page Not Found", BaseMainColumn with the "doesn't exist" paragraph and a plain `<a href="/">Return to the home page</a>` link. Title "Page Not Found | Faster Pussycat Productions".
- [x] Create `netlify.toml`:

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

**Validate**: `pnpm build` exits 0; dist contains `index.html`, `portfolio/stationery/index.html`, `portfolio/cds/index.html`, `contact/index.html`, `404.html`; `grep -l 'data-netlify' dist/contact/index.html` matches.

**Commit**: `git commit -am "feat: pages, layout, catch-all route, netlify config"`

---

## Phase 7 — Visual parity (fixture content)

- [x] `pnpm dev`, compare against `https://fppdesign.com.au` equivalents:
  - [x] `/` vs live home
  - [x] `/portfolio/stationery/` vs live
  - [x] `/portfolio/cds/` vs live — sidebar gallery split-on-`<hr>` items AND text client list widget both render
  - [x] `/contact/` vs live — form renders
- [x] Styled `&` ampersand appears in headings containing `&` (Playfair italic, brand green)
- [x] Nav active state correct on each page
- [x] Browser console: `<html>` class flips `no-js` → `jb-yes-js js`; lazysizes swaps `data-src`→`src` on scroll
- [x] `view-source` contact page shows `<form ... data-netlify="true" action="/thank-you/">`

**Validate**: checklist complete. Fix-forward any parity issues in this phase.

**Commit** (if fixes were needed): `git commit -am "fix: visual parity corrections"`

---

## Phase 8 — WordPress wiring (requires user credentials)

- [x] Confirm `.env` is populated (values were copied from `fppdesign-2018/.env` in Phase 5).
- [x] `pnpm build` → dist contains all routes: `/thank-you/`, `/smoggy/*` (20), `/foster-kittens/*` (5), all `/portfolio/*` sections (8), `/`, `/contact/`. Total: 36 published routes + 404.html.
- [x] Remind user: production deploy needs `HTACCESS_USER`/`HTACCESS_PASSWORD` set in Netlify env — without them the build silently falls back to the 4 fixture pages.

**Validate**: `find dist -name index.html | wc -l` = 34 (plus `404.html`).

**Commit** (if query fragments needed adjustment): `git commit -am "feat: verified WP graphql query against live schema"`

---

## Out of scope (Milestone 2+)

EmDash CMS, Cloudflare Pages migration, service worker/offline support (gatsby-plugin-offline dropped), catch-links, CSS modernisation, component flattening, image pipeline changes.

## Assumptions

- WPGraphQL type names are Gatsby names minus `Wp` prefix; verify via GraphiQL if the query errors.
- JS not TS; pnpm; Node 22.
- The `<?xml encoding="UTF-8">` junk prefixing some WP content strings renders harmlessly (same as today); leave for parity.
