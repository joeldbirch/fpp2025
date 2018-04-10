import React from 'react'
import SpotlightContainer from '../SpotlightContainer'
import styles from './style.module.scss'
import lazyImages from '../LazyWPImages'

const lazy = new lazyImages

export default ({node}) => {
  const wrapItemsOnHr = function (html) {
    const list = html.split('<hr />').map((item, i) => (
      <div
        key={i}
        className={styles.item}
        dangerouslySetInnerHTML={{ __html: lazy.filterContent(item) }}
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
