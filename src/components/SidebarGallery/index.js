import React from 'react'
import SpotlightContainer from '../SpotlightContainer'
import styles from './style.module.scss'

export default ({node}) => {
  let wrapItemsOnHr = function (html) {
    let hr = (html.indexOf('<hr />') !== -1) ? '<hr />' : '<hr>'
    let list = html.split(hr).map((item, i) => (
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
    <SpotlightContainer className={`${styles.gallery}  widget-${node.wordpress_id}`}>
      <h2>{node.title}</h2>
      <div>
        {wrapItemsOnHr(node.content)}
      </div>
    </SpotlightContainer>
  )
}
