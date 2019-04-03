import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import TheHeading from '../components/TheHeading'
import BaseMainColumn from '../components/BaseMainColumn'
import BaseSideColumn from '../components/BaseSideColumn'
import SidebarWidgetFactory from '../components/SidebarWidgetFactory'
import { sortByObjProp } from '../utils/helpers'
import wufooForm from '../utils/wufooForm'

class Template extends Component {
  componentDidMount() {
    let { slug } = this.props.data.wordpressPage
    wufooForm(slug)
  }

  render() {
    let { title, content, acf } = this.props.data.wordpressPage
    let { siteMetadata } = this.props.data.site
    let { sidebarItems } = this.props.pageContext
    let sortedSidebarItems = sortByObjProp(acf.page_sidebar_items, sidebarItems, 'wordpress_id')
    let pageTitle = [acf.page_title || title, siteMetadata.title].join(' | ')
    let description = [acf.description || title, siteMetadata.title].join(' | ')

    return (
      <Layout>
        <div className="content">
          <Helmet>
            <title>{pageTitle}</title>
            <meta name="description" content={description} />
          </Helmet>

          <TheHeading>{title}</TheHeading>
          <BaseMainColumn>{content}</BaseMainColumn>
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
