const path = require('path')
const { getSidebarData, getPath } = require('./src/utils/helpers')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      pages: allWpPage {
        nodes {
          title
          id
          link
          status
          pageMetadata {
            pageTitle
          }
          sidebarSelection {
            pageSidebarItems {
              nodes {
                ... on WpSidebarItem {
                  databaseId
                  title
                  content
                  sidebarLayout {
                    template
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    console.log(result.errors)
    throw result.errors
  }

  const pageTemplate = path.resolve('src/templates/page.js')
  result.data.pages.nodes.forEach((node) => {
    if (node.status === 'publish' && node.link) {
      const sidebarItems = node.sidebarSelection?.pageSidebarItems?.nodes || []
      createPage({
        path: getPath(node.link),
        component: pageTemplate,
        context: {
          id: node.id,
          acf: {
            page_sidebar_items: sidebarItems.map((item) => item.databaseId),
            page_title: node.pageMetadata?.pageTitle,
          },
          sidebarItems: sidebarItems,
        },
      })
    }
  })
}
