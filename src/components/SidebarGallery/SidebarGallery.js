import React from 'react'
import SpotlightContainer from '../SpotlightContainer/SpotlightContainer.js'
import styles from './style.module.scss'


export default ({node}) => {
  return (
    <SpotlightContainer className={`${styles.gallery}`}>
      <h2>{node.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: node.html }}/>
    </SpotlightContainer>
  )
}
