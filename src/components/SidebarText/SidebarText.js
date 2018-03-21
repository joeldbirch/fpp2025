import React from 'react'
import SpotlightContainer from '../SpotlightContainer/SpotlightContainer.js'

export default ({title, content}) => {
  return (
    <SpotlightContainer className="test">
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: content }}/>
    </SpotlightContainer>
  )
}
