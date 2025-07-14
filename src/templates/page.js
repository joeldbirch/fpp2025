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
    const { data } = this.props
    const siteMetadata = data.site.siteMetadata
    const currentPage = data.wordpressAcfPages
    const title = currentPage.acf.page_title || currentPage.title
    const content = currentPage.content
    const pageTitle = [title, siteMetadata.title].join(' | ')
    const description = [title, siteMetadata.title].join(' | ')

    return (
      <Layout>
        <div className="content">
          <Helmet>
            <title>{pageTitle}</title>
            <meta name="description" content={description} />
          </Helmet>

          <TheHeading>{title}</TheHeading>
          <BaseMainColumn>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </BaseMainColumn>
          <BaseSideColumn>
            {this.props.pageContext.sidebarItems &&
              this.props.pageContext.sidebarItems
                .sort(sortByObjProp('acf.template'))
                .map((item, index) => (
                  <SidebarWidgetFactory key={index} itemData={item} />
                ))}
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
    wordpressAcfPages(id: { eq: $id }) {
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
