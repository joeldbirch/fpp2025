const path = require('path')
const {getSidebarData, getPath} = require('./src/utils/helpers')

exports.onPreBuild = ({boundActionCreators}) => {
  const {createRedirect} = boundActionCreators
  createRedirect({
    fromPath: 'https://fppdesign.netlify.com/*',
    toPath: 'https://staging.fppdesign.com.au/:splat',
  })
  createRedirect({
    fromPath: 'http://fppdesign.netlify.com/*',
    toPath: 'https://staging.fppdesign.com.au/:splat',
  })
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
                title
                id
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
              sidebarItems: getSidebarData(node.acf.page_sidebar_items, result.data.sidebarItems.edges)
            }
          })
        }
      })
      resolve()
    })
  })
}
