import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import TheHeading from '../components/TheHeading'
import BaseMainColumn from '../components/BaseMainColumn'

function NotFoundPage() {
  return (
    <Layout>
      <div className="content">
        <TheHeading>Page Not Found</TheHeading>
        <BaseMainColumn>
          <p>
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <p>
            <Link to="/">Return to the home page</Link>
          </p>
        </BaseMainColumn>
      </div>
    </Layout>
  )
}

export const Head = () => (
  <>
    <title>Page Not Found | Faster Pussycat Productions</title>
    <meta name="description" content="The requested page could not be found." />
  </>
)

export default NotFoundPage
