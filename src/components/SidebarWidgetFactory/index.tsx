import type { SidebarItem } from '../../lib/pages'
import SidebarText from '../SidebarText'
import SidebarGallery from '../SidebarGallery'
import { createElement } from 'react'

export default ({ nodes }: { nodes: SidebarItem[] }) => {
  const getComponent = (component: string | null | undefined = 'SidebarText') =>
    component === 'SidebarText' ? SidebarText : SidebarGallery

  const widgets = nodes.map((node) =>
    createElement(getComponent(node.sidebarLayout?.template), {
      node,
      key: `widget-${node.databaseId}`,
    })
  )

  return <div className="widgets">{widgets}</div>
}
