import React from 'react'
import SidebarText from '../SidebarText'
import SidebarGallery from '../SidebarGallery'

export default function SidebarWPWidget ({nodes}) {

  const widgets = function(nodes) {
    return nodes.reverse().map(({title, content, wordpress_id, template}) => {
      return (
        <SidebarText
          title={title}
          content={content}
          key={`widget-${wordpress_id}`}
        />
      )
    })
  }(nodes)

  return (
    <div className="widgets">
      {widgets}
    </div>
  )
}
