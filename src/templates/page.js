import React from 'react'
import TheHeading from '../components/TheHeading/TheHeading.js'
import BaseMainColumn from '../components/BaseMainColumn/BaseMainColumn.js'
import BaseSideColumn from '../components/BaseSideColumn/BaseSideColumn.js'
import BaseContentWrap from '../components/BaseContentWrap/BaseContentWrap.js'
import SidebarWPWidgets from '../components/SidebarWPWidgets/SidebarWPWidgets.js'

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
        <SidebarWPWidgets nodes={sidebarItems} />
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
