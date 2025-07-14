const path = require('path')
const {getSidebarData, getPath} = require('./src/utils/helpers')

exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions

  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          pages: allWordpressAcfPages {
            edges {
              node {
                title
                id
                link
                status
                acf {
                  page_sidebar_items
                  page_title
                }
              }
            }
          }
          sidebarItems: allWordpressAcfSidebarItems {
            edges {
              node {
                wordpress_id
                title
                content
                acf {
                  template
                }
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
        if (node.status === 'publish') {
          createPage({
            path: getPath(node.link),
            component: pageTemplate,
            context: {
              id: node.id,
              acf: node.acf,
              sidebarItems: getSidebarData(node.acf.page_sidebar_items, result.data.sidebarItems.edges),
            }
          })
        }
      })
      resolve()
    })
  })
}
