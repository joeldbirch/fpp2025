import React from 'react'

export default function Template({data}) {
  const {markdownRemark: page} = data
  return (
    <div className="content">
      <h1>{page.frontmatter.title}</h1>
      <main dangerouslySetInnerHTML={{ __html: page.html }}>

      </main>
      <div className="sidebar">sidebar stuff</div>
    </div>

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
