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
