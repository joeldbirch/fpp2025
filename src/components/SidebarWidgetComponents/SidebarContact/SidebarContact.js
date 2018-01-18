import React from 'react'

export default ({node}) => (
  <div className="widget">
    <h2>{node.frontmatter.title}</h2>
    <div dangerouslySetInnerHTML={{ __html: node.html }}/>
  </div>
)
