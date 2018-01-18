import React from 'react'

export default function SidebarWidgetFactory ({nodes}) {

  const allSidebarWidgets = (nodes) => {
    return nodes.map(({node}, i) => {
        const filename = node.frontmatter.templateKey || 'SidebarText'
        return React.createElement(
          require(`../SidebarWidgetComponents/${filename}/${filename}.js`),
          {
            node,
            key: `widget${i}`
          }
        )
      })
  }
  const widgets = allSidebarWidgets(nodes)
  return (
    <div className="widgets">
      {widgets}
    </div>
  )
}
