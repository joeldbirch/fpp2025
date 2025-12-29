import React from 'react'
import SpotlightContainer from '../SpotlightContainer'

export default ({node}) => {
  return (
    <SpotlightContainer className={`widget-${node.databaseId}`}>
      <h2>{node.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: node.content }} />
    </SpotlightContainer>
  )
}
