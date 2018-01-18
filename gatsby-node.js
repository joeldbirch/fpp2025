const path = require('path')

exports.createPages = ({boundActionCreators, graphql}) => {
  const {createPage} = boundActionCreators
  const pageTemplate = path.resolve('src/templates/page.js')

  const filterSidebarNodes = function ({edges: nodes}, widgetTitles) {
    return nodes.filter(({node: {frontmatter}}) => frontmatter.type === 'sidebar' &&  widgetTitles.indexOf(frontmatter.title) !== -1)
  }

  return graphql(`{
    allMarkdownRemark {
      edges {
        node {
          html
          id
          frontmatter {
            type
            path
            title
            sidebarWidgets
            templateKey
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
          component: pageTemplate,
          context: {
            sidebars: filterSidebarNodes(res.data.allMarkdownRemark, node.frontmatter.sidebarWidgets || []),
          }
        })
      }
    })
  })
}
