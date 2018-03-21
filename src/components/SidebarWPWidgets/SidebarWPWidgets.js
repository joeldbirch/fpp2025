import React from 'react'
import SidebarText from '../SidebarText/SidebarText.js'

export default function SidebarWPWidget ({nodes}) {

  const widgets = function(nodes) {
    console.log(nodes);
    return nodes.filter(node => node).reverse().map((node, i) => {
      const {post_title: title, post_content: content} = node
      return (
        <SidebarText
          title={title}
          content={content}
          key={`widget${i}`}
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
