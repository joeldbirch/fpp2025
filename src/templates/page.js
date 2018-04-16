import React, {Component} from 'react'
import Helmet from 'react-helmet'
import TheHeading from '../components/TheHeading'
import BaseMainColumn from '../components/BaseMainColumn'
import BaseSideColumn from '../components/BaseSideColumn'
import SidebarWidgetFactory from '../components/SidebarWidgetFactory'
import {sortByObjProp} from '../utils/helpers'
import wufooForm from '../utils/wufooForm'

class Template extends Component {
  componentDidMount () {
    let {slug} = this.props.data.wordpressPage
    wufooForm(slug)
  }

  render () {
    let {title, content, acf} = this.props.data.wordpressPage
    let {siteMetadata} = this.props.data.site
    let {sidebarItems} = this.props.pathContext
    let sortedSidebarItems = (acf.page_sidebar_items) ? sortByObjProp(acf.page_sidebar_items, sidebarItems, 'wordpress_id') || []
    let pageTitle = [acf.page_title || title, siteMetadata.title].join(' | ')
    let description = [acf.description || title, siteMetadata.title].join(' | ')

    return (
      <div className='content'>
        <Helmet>
          <title>{pageTitle}</title>
          <meta name='description' content={description} />
        </Helmet>

        <TheHeading>{title}</TheHeading>
        <BaseMainColumn>
          {content}
        </BaseMainColumn>
        <BaseSideColumn>
          <SidebarWidgetFactory nodes={sortedSidebarItems} />
        </BaseSideColumn>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query currentPageQuery($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    wordpressPage(id: { eq: $id }) {
      title
      content
      slug
      acf {
        page_title
        page_sidebar_items
      }
    }
  }
`
export default Template
