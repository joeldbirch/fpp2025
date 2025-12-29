import React from 'react'
import SidebarText from '../SidebarText'

export default function SidebarWPWidget ({nodes}) {
  const widgets = (function (nodes) {
    return nodes.reverse().map(({title, content, databaseId, template}) => {
      return (
        <SidebarText
          title={title}
          content={content}
          key={`widget-${databaseId}`}
        />
      )
    })
  }(nodes))

  return (
    <div className='widgets'>
      {widgets}
    </div>
  )
}
