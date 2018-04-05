import React, {Component} from 'react'
import TheHeading from '../components/TheHeading'
import WufooForm from '../components/WufooForm'
import BaseMainColumn from '../components/BaseMainColumn'
import BaseSideColumn from '../components/BaseSideColumn'
import BaseContentWrap from '../components/BaseContentWrap'
import SidebarWidgetFactory from '../components/SidebarWidgetFactory'
import {sortByObjProp} from '../utils/helpers'
import wufooForm from '../utils/wufooForm'

class Template extends Component {
  componentDidMount() {
    let {slug} = this.props.data.wordpressPage
    wufooForm(slug)
  }

  render() {
    let {title, content, acf, slug} = this.props.data.wordpressPage
    let {sidebarItems} = this.props.pathContext
    let sortedSidebarItems = sortByObjProp(acf.page_sidebar_items, sidebarItems, 'wordpress_id')

    return (
      <BaseContentWrap>
        <TheHeading>{title}</TheHeading>
        <BaseMainColumn>
          {content}
        </BaseMainColumn>
        <BaseSideColumn>
          <SidebarWidgetFactory nodes={sortedSidebarItems} />
        </BaseSideColumn>
      </BaseContentWrap>
    )
  }
}

export const pageQuery = graphql`
  query currentPageQuery($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      slug
      acf {
        page_sidebar_items
      }
    }
  }
`
export default Template
