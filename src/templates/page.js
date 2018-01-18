import React from 'react'
import TheHeading from '../components/TheHeading/TheHeading.js'
import BaseMainColumn from '../components/BaseMainColumn/BaseMainColumn.js'
import BaseSideColumn from '../components/BaseSideColumn/BaseSideColumn.js'
import BaseContentWrap from '../components/BaseContentWrap/BaseContentWrap.js'
import SidebarWidgetFactory from '../components/SidebarWidgetFactory/SidebarWidgetFactory.js'

export default function Template({data: {markdownRemark: page}, pathContext}) {
  const [{html}, {sidebars: sidebarNodes}, {title}] = [page, pathContext, page.frontmatter]
  return (
    <BaseContentWrap>
      <TheHeading>{title}</TheHeading>
      <BaseMainColumn>
        {html}
      </BaseMainColumn>
      <BaseSideColumn>
        <SidebarWidgetFactory nodes={sidebarNodes} />
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
