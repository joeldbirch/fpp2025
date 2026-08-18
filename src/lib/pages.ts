import { getCollection } from 'astro:content'

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

export async function getAllPages(): Promise<Page[]> {
  const [pages, sidebar] = await Promise.all([getCollection('pages'), getCollection('sidebar')])

  return pages.map((p) => ({
    databaseId: idHash(p.id),
    uri: p.id === 'index' ? '/' : `/${p.id}`,
    title: p.data.title,
    content: p.rendered?.html ?? '',
    status: p.data.draft ? 'draft' : 'publish',
    pageMetadata: { pageTitle: p.data.pageTitle ?? null },
    sidebarSelection: {
      pageSidebarItems: {
        nodes: (p.data.sidebar ?? [])
          .map((slug) => sidebar.find((s) => s.id === slug))
          .filter((s): s is (typeof sidebar)[number] => Boolean(s))
          .map((s) => ({
            databaseId: idHash(s.id),
            title: s.data.title,
            content: s.rendered?.html ?? '',
            sidebarLayout: { template: s.data.template ?? null },
          })),
      },
    },
  }))
}
