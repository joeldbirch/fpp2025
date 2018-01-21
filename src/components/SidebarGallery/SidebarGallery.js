import React from 'react'
import SpotlightContainer from '../SpotlightContainer/SpotlightContainer.js'
import styles from './style.module.scss'


export default ({node}) => {

  const wrapItemsOnHr = function (html) {
    const list = html.split('<hr>').map((item, i) => (
      <div
        key={i}
        className={styles.item}
        dangerouslySetInnerHTML={{ __html: item }}
      />
    ))
    return (
      <div className={styles.list}>
        {list}
      </div>
    )
  }

  return (
    <SpotlightContainer className={`${styles.gallery}`}>
      <h2>{node.frontmatter.title}</h2>
      <div>
        {wrapItemsOnHr(node.html)}
      </div>
    </SpotlightContainer>
  )
}
