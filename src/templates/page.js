import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import TheHeading from '../components/TheHeading'
import BaseMainColumn from '../components/BaseMainColumn'
import BaseSideColumn from '../components/BaseSideColumn'
import SidebarWidgetFactory from '../components/SidebarWidgetFactory'
import { sortByObjProp } from '../utils/helpers'

class Template extends Component {
  render () {
    const { title, content, acf, slug } = this.props.data.wordpressPage
    const { siteMetadata } = this.props.data.site
    const { sidebarItems } = this.props.pageContext
    const sortedSidebarItems = sortByObjProp(acf.page_sidebar_items, sidebarItems, 'wordpress_id')
    const pageTitle = [acf.page_title || title, siteMetadata.title].join(' | ')
    const description = [acf.description || title, siteMetadata.title].join(' | ')

    return (
      <Layout>
        <div className="content">
          <Helmet>
            <title>{pageTitle}</title>
            <meta name="description" content={description} />
          </Helmet>

          <TheHeading>{title}</TheHeading>
          <BaseMainColumn>
            {content}
          </BaseMainColumn>
          <BaseSideColumn>
            <SidebarWidgetFactory nodes={sortedSidebarItems} />
          </BaseSideColumn>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query($id: String!) {
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
