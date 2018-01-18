import React from 'react'
import SpotlightContainer from '../SpotlightContainer/SpotlightContainer.js'

export default ({node}) => (
  <SpotlightContainer className="test">
    <h2>{node.frontmatter.title}</h2>
    <div dangerouslySetInnerHTML={{ __html: node.html }}/>
  </SpotlightContainer>
)
