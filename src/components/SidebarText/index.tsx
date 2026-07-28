import type { SidebarItem } from '../../lib/pages'
import SpotlightContainer from '../SpotlightContainer'

export default ({ node }: { node: SidebarItem }) => {
  return (
    <SpotlightContainer className={`widget-${node.databaseId}`}>
      <h2>{node.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: node.content }} />
    </SpotlightContainer>
  )
}
