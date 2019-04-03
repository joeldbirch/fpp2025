import React from 'react'
import SidebarText from '../SidebarText'
import SidebarGallery from '../SidebarGallery'

export default function SidebarWidgetFactory ({nodes}) {
  const getComponent = function (component = 'SidebarText') {
    return (component === 'SidebarText') ? SidebarText : SidebarGallery
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
