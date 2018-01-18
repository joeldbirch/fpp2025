import React from 'react'
import TheHeading from '../components/TheHeading/TheHeading.js'
import BaseMainColumn from '../components/BaseMainColumn/BaseMainColumn.js'
import BaseSideColumn from '../components/BaseSideColumn/BaseSideColumn.js'
import BaseContentWrap from '../components/BaseContentWrap/BaseContentWrap.js'
import SidebarWidgetFactory from '../components/SidebarWidgetFactory/SidebarWidgetFactory.js'

export default function Template(props) {
  const {markdownRemark: page} = props.data
  return (
    <BaseContentWrap>
      <TheHeading>{page.frontmatter.title}</TheHeading>
      <BaseMainColumn>
        {page.html}
      </BaseMainColumn>
      <BaseSideColumn>
        <SidebarWidgetFactory nodes={props.pathContext.sidebars} />
      </BaseSideColumn>
    </BaseContentWrap>
  )
}

export const pageQuery = graphql`
  query Page($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        sidebarWidgets
      }
    }
  }
`
