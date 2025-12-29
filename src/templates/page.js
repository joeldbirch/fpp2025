import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import TheHeading from '../components/TheHeading'
import BaseMainColumn from '../components/BaseMainColumn'
import BaseSideColumn from '../components/BaseSideColumn'
import SidebarWidgetFactory from '../components/SidebarWidgetFactory'

function Template({ data, pageContext }) {
  const siteMetadata = data.site.siteMetadata
  const currentPage = data.wpPage
  const title = pageContext.acf?.page_title || currentPage.title
  const content = currentPage.content

  return (
    <Layout>
      <div className="content">
        <TheHeading>{title}</TheHeading>
        <BaseMainColumn>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </BaseMainColumn>
        <BaseSideColumn>
          {pageContext.sidebarItems &&
            pageContext.sidebarItems
              .sort((a, b) =>
                (a.sidebarLayout?.template || '').localeCompare(
                  b.sidebarLayout?.template || ''
                )
              )
              .map((item, index) => <SidebarWidgetFactory key={index} nodes={[item]} />)}
        </BaseSideColumn>
      </div>
    </Layout>
  )
}

export const Head = ({ data, pageContext }) => {
  const siteMetadata = data.site.siteMetadata
  const currentPage = data.wpPage
  const title = pageContext.acf?.page_title || currentPage.title
  const pageTitle = [title, siteMetadata.title].join(' | ')

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageTitle} />
    </>
  )
}

export const pageQuery = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    wpPage(id: { eq: $id }) {
      title
      content
      slug
    }
  }
`
export default Template
