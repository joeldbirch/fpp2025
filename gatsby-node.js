const path = require('path')
const getFilename = require('./src/utils/helpers.js').extractFileNameFromAbsPath


exports.createPages = ({boundActionCreators, graphql}) => {
  const {createPage} = boundActionCreators
  const pageTemplate = path.resolve('src/templates/page.js')

  const filterSidebarNodes = function (edges, widgets) {
    return edges.filter(({node}) => widgets.indexOf(getFilename(node.fileAbsolutePath)) !== -1) || []
  }

  return graphql(`{
    allMarkdownRemark {
      edges {
        node {
          html
          id
          fileAbsolutePath
          frontmatter {
            type
            path
            title
            showSidebars
            templateKey
          }
        }
      }
    }
  }`).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors)
    }
    const allMarkdown = res.data.allMarkdownRemark
    const sidebarNodes = allMarkdown.edges.filter(({node}) => node.frontmatter.type === 'sidebar')

    allMarkdown.edges.forEach(({node}) => {
      if (node.frontmatter.type !== 'sidebar') {
        createPage({
          path: node.frontmatter.path,
          component: pageTemplate,
          context: {
            sidebars: filterSidebarNodes(sidebarNodes, node.frontmatter.showSidebars),
          }
        })
      }
    })
  })
}
