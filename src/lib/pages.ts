import { getCollection } from 'astro:content'
import { getImage } from 'astro:assets'
import type { ImageMetadata } from 'astro'
import { dirname } from 'node:path'

// WordPress-shaped interfaces — kept intact so [...slug].astro and the React
// sidebar components work unchanged. Content now comes from Vault CMS
// markdown collections (src/content/pages, src/content/sidebar).

export interface SidebarLayout {
  template: string | null
}

export interface SidebarItem {
  databaseId: number
  title: string
  content: string
  sidebarLayout?: SidebarLayout | null
}

export interface SidebarSelection {
  pageSidebarItems?: {
    nodes: SidebarItem[]
  } | null
}

export interface PageMetadata {
  pageTitle: string | null
}

export interface Page {
  databaseId: number
  uri: string
  title: string
  content: string
  status: string
  pageMetadata?: PageMetadata | null
  sidebarSelection?: SidebarSelection | null
}

const idHash = (id: string) => [...id].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 7)

// Obsidian drops images next to the note; markdown then references them relatively.
// Astro's markdown renderer emits <img __ASTRO_IMAGE_="…json…"> placeholders for those
// and only swaps them for real <img> tags inside render() — we render the raw HTML
// string instead, so do the swap here (mirrors Astro's own runtime logic).
const vaultImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/**/*.{avif,gif,jpg,jpeg,png,svg,webp}',
  { eager: true },
)
// keys normalised to root-relative posix paths, matching entry.filePath's form
const imageByFsPath = new Map(
  Object.entries(vaultImages).map(([id, mod]) => [id.replace(/^\/+/, ''), mod.default]),
)
const joinRootRelative = (dir: string, src: string) =>
  `${dir}/${src}`.replace(/^\/+/, '').replace(/\/+/g, '/')

const IMAGE_PLACEHOLDER = /__ASTRO_IMAGE_="([^"]+)"/g
const escapeAttr = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')

async function resolveVaultImages(html: string, mdFilePath: string): Promise<string> {
  const matches = [...html.matchAll(IMAGE_PLACEHOLDER)]
  if (matches.length === 0) return html

  const tags = new Map<string, string>()
  for (const [, raw] of matches) {
    try {
      const props = JSON.parse(
        raw.replace(/&(?:#x22|quot);/g, '"').replace(/&(?:#x27|apos);/g, "'"),
      )
      const { src, index: _index, ...rest } = props
      const image = URL.canParse(src)
        ? await getImage({ ...rest, src }) // remote, already authorised via image config
        : await getImage({
            ...rest,
            src: imageByFsPath.get(joinRootRelative(dirname(mdFilePath), decodeURI(src))),
          })
      if (!image) continue
      const attrs: Record<string, unknown> = { ...image.attributes, src: image.src }
      if (image.srcSet?.values?.length) attrs.srcset = image.srcSet.attribute
      delete attrs.index
      tags.set(
        raw,
        Object.entries(attrs)
          .filter(([, v]) => v != null)
          .map(([k, v]) => `${k}="${escapeAttr(String(v))}"`)
          .join(' '),
      )
    } catch {
      // image missing or failed to parse — leave placeholder, renders as empty img
    }
  }
  return html.replace(IMAGE_PLACEHOLDER, (full, raw) => tags.get(raw) ?? full)
}

const renderedHtml = async (entry: { rendered?: { html?: string }; filePath?: string }) =>
  entry.rendered?.html && entry.filePath ? await resolveVaultImages(entry.rendered.html, entry.filePath) : (entry.rendered?.html ?? '')

export async function getAllPages(): Promise<Page[]> {
  const [pages, sidebar] = await Promise.all([getCollection('pages'), getCollection('sidebar')])

  const sidebarNodes = async (slugs: string[]) =>
    Promise.all(
      slugs
        .map((slug) => sidebar.find((s) => s.id === slug))
        .filter((s): s is (typeof sidebar)[number] => Boolean(s))
        .map(async (s) => ({
          databaseId: idHash(s.id),
          title: s.data.title,
          content: await renderedHtml(s),
          sidebarLayout: { template: s.data.template ?? null },
        })),
    )

  return Promise.all(
    pages.map(async (p) => ({
      databaseId: idHash(p.id),
      uri: p.id === 'index' ? '/' : `/${p.id}`,
      title: p.data.title,
      content: await renderedHtml(p),
      status: p.data.draft ? 'draft' : 'publish',
      pageMetadata: { pageTitle: p.data.pageTitle ?? null },
      sidebarSelection: {
        pageSidebarItems: { nodes: await sidebarNodes(p.data.sidebar ?? []) },
      },
    })),
  )
}
