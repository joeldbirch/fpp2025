import type { SidebarItem } from '../../lib/pages'
import SpotlightContainer from '../SpotlightContainer'
import styles from './style.module.scss'

export default ({ node }: { node: SidebarItem }) => {
  const wrapItemsOnHr = (html: string) => {
    const hr = html.includes('<hr />') ? '<hr />' : '<hr>'
    const list = html.split(hr).map((item, i) => (
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
    <SpotlightContainer className={`${styles.gallery}  widget-${node.databaseId}`}>
      <h2>{node.title}</h2>
      <div>
        {wrapItemsOnHr(node.content)}
      </div>
    </SpotlightContainer>
  )
}
