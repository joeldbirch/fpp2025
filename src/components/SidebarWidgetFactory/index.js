import React from 'react'

export default function SidebarWidgetFactory ({nodes}) {
  const getComponent = function (filename) {
    filename = filename || 'SidebarText'
    return require(`../${filename}/index.js`)
  }

  const widgets = (function (nodes) {
    return nodes.map(node => {
      return React.createElement(
        getComponent(node.acf.template),
        {
          node,
          key: `widget-${node.wordpress_id}`
        }
      )
    })
  }(nodes))

  return (
    <div className='widgets'>
      {widgets}
    </div>
  )
}
