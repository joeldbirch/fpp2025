import React from 'react'
import BaseContentWrap from '../components/BaseContentWrap/BaseContentWrap.js'
import TheHeading from '../components/TheHeading/TheHeading.js'

export default function Template({data}) {
  const {markdownRemark: page} = data
  return (
    <BaseContentWrap>
      <TheHeading>{page.frontmatter.title}</TheHeading>
      <main
        className="s-editable"
        style={{ margin: '0 auto', maxWidth: 650, padding: '0 1rem' }}
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
      <div className="sidebar">sidebar stuff</div>
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
      }
    }
  }
`
