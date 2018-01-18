import React from 'react'

export default function SidebarWidgetFactory ({nodes}) {

  const getComponent = function ({templateKey: filename}) {
    filename = filename || 'SidebarText'
    return require(`../${filename}/${filename}.js`)
  }

  const widgets = function(nodes) {
    return nodes.reverse().map(({node}, i) => React.createElement(
        getComponent(node.frontmatter),
        {node, key: `widget${i}`}
      )
    )
  }(nodes)

  return (
    <div className="widgets">
      {widgets}
    </div>
  )
}
