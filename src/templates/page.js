import React from 'react'
import TheHeading from '../components/TheHeading'
import BaseMainColumn from '../components/BaseMainColumn'
import BaseSideColumn from '../components/BaseSideColumn'
import BaseContentWrap from '../components/BaseContentWrap'
import SidebarWidgetFactory from '../components/SidebarWidgetFactory'
import {sortByObjProp} from '../utils/helpers'

export default function Template(props) {
  let {title, content, acf} = props.data.wordpressPage
  let {sidebarItems} = props.pathContext
  let sortedSidebarItems = sortByObjProp(acf.page_sidebar_items, sidebarItems, 'wordpress_id')

  return (
    <BaseContentWrap>
      <TheHeading>{title}</TheHeading>
      <BaseMainColumn>
        {content}
      </BaseMainColumn>
{      <BaseSideColumn>
        <SidebarWidgetFactory nodes={sortedSidebarItems} />
      </BaseSideColumn>}
    </BaseContentWrap>
  )
}

export const pageQuery = graphql`
  query currentPageQuery($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      acf {
        page_sidebar_items
      }
    }
  }
`
