const path = require('path')

exports.createPages = ({boundActionCreators, graphql}) => {
  const {createPage} = boundActionCreators
  const pageTemplate = path.resolve('src/templates/page.js')
  return graphql(`{
    allMarkdownRemark {
      edges {
        node {
          html
          id
          frontmatter {
            name
            type
            path
            title
            sidebarWidgets
          }
        }
      }
    }
  }`).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors)
    }

    res.data.allMarkdownRemark.edges.forEach(({node}) => {
      if (node.frontmatter.type !== 'sidebar') {
        createPage({
          path: node.frontmatter.path,
          component: pageTemplate
        })
      }
    })
  })
}
