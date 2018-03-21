const path = require('path')

const getSidebarData = function(pageSidebarIds, sidebarNodes) {

  const sidebarData = sidebarNodes.filter(({node}) => {
    const sidebarIds = pageSidebarIds || []
    return sidebarIds.indexOf(node.wordpress_id) > -1
  }).map(({node}) => node)
  return sidebarData
}


exports.createPages = ({boundActionCreators, graphql}) => {
  const {createPage} = boundActionCreators

  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          pages: allWordpressPage {
            edges {
              node {
                id
                slug
                link
                status
                acf {
                  page_sidebar_items
                }
              }
            }
          }
          sidebarItems: allWordpressWpSidebarItems {
            edges {
              node {
                wordpress_id
                title
                content
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        console.log(result.errors);
        reject(result.errors)
      }

      const pageTemplate = path.resolve('src/templates/page.js')
      result.data.pages.edges.forEach(({node}) => {
        console.log(node);
        if (node.status === 'publish') {
          createPage({
            path: `/${(node.slug === 'home') ? '' : node.slug}`,
            component: pageTemplate,
            context: {
              id: node.id,
              sidebarItems: getSidebarData(node.acf.page_sidebar_items, result.data.sidebarItems.edges)
            }
          })
        }
      })
      resolve()
    })
  })
}
