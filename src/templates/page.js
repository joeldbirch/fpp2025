import React from 'react'
import TheHeading from '../components/TheHeading'
import BaseMainColumn from '../components/BaseMainColumn'
import BaseSideColumn from '../components/BaseSideColumn'
import BaseContentWrap from '../components/BaseContentWrap'
import SidebarWidgetFactory from '../components/SidebarWidgetFactory'

export default function Template(props) {
  const {title, content} = props.data.wordpressPage
  const {sidebarItems} = props.pathContext
  return (
    <BaseContentWrap>
      <TheHeading>{title}</TheHeading>
      <BaseMainColumn>
        {content}
      </BaseMainColumn>
{      <BaseSideColumn>
        <SidebarWidgetFactory nodes={sidebarItems} />
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
