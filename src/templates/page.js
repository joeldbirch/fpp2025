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
    // Temporarily disabled WordPress data for build troubleshooting
    const siteMetadata = { title: 'Faster Pussycat Productions' }
    const title = 'Test Page'
    const content = '<p>Build test successful!</p>'
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
            <div>Sidebar placeholder</div>
          </BaseSideColumn>
        </div>
      </Layout>
    )
  }
}

// Temporarily disabled WordPress query for build troubleshooting
// export const pageQuery = graphql`
//   query($id: String!) {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     wordpressPage(id: { eq: $id }) {
//       title
//       content
//       slug
//       acf {
//         page_title
//         page_sidebar_items
//       }
//     }
//   }
// `
export default Template
