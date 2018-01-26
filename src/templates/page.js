import React from 'react'
import TheHeading from '../components/TheHeading/TheHeading.js'
import BaseMainColumn from '../components/BaseMainColumn/BaseMainColumn.js'
import BaseSideColumn from '../components/BaseSideColumn/BaseSideColumn.js'
import BaseContentWrap from '../components/BaseContentWrap/BaseContentWrap.js'
import SidebarWPWidgets from '../components/SidebarWPWidgets/SidebarWPWidgets.js'

export default function Template(props) {
  const currentPage = props.data.wordpressPage
  const sidebarNodes = []
  return (
    <BaseContentWrap>
      <TheHeading>{currentPage.title}</TheHeading>
      <BaseMainColumn>
        {currentPage.content}
      </BaseMainColumn>
      <BaseSideColumn>
        <SidebarWPWidgets nodes={[...currentPage.acf.page_sidebar_items]} />
      </BaseSideColumn>
    </BaseContentWrap>
  )
}

export const pageQuery = graphql`
  query currentPageQuery($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      acf {
        page_sidebar_items {
          wordpress_id
          post_title
          post_content
        }
      }
    }
  }
`
