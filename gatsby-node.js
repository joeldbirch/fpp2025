const path = require('path')


exports.createPages = ({boundActionCreators, graphql}) => {
  const {createPage} = boundActionCreators

  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          allWordpressPage {
            edges {
              node {
                id
                slug
                status
                acf {
                  page_sidebar_items {
                    wordpress_id
                    post_title
                    post_content
                  }
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
      result.data.allWordpressPage.edges.forEach(({node}) => {
        if (node.status === 'publish') {
          createPage({
            path: `/${(node.slug === 'home') ? '' : node.slug}`,
            component: pageTemplate,
            context: {
              id: node.id,
            }
          })
        }
      })
      resolve()
    })
  })
}
