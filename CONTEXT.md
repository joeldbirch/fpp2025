# FPP Astro

Migration of the ../fppdesign-2018 Gatsby site to Astro, retaining the headless WordPress backend initially, with EmDash CMS adoption deferred to a later milestone.

## Language

**Page**:
A WordPress page surfaced as a route on the site. Every page shares the same template: title, HTML content body, and optional sidebar widgets.
_Avoid_: Post, entry, route

**Sidebar widget**:
A block of content rendered in the right-hand sidebar column. Two types exist: SidebarText (title + HTML) and SidebarGallery (title + HTML split on `<hr>` into a thumbnail list).
_Avoid_: Sidebar item, sidebar component

**Content**:
The raw HTML body of a page or sidebar widget, sourced from WordPress and rendered via `dangerouslySetInnerHTML`. May contain inline images, links, and Wufoo form embeds.
_Avoid_: Body, markup, rich text

**Template**:
The layout that wraps a page. The site has a single page template (`page.js` → `[...slug].astro`) with a two-column layout: main content (66%) and sidebar (29%).
_Avoid_: Layout, page type
