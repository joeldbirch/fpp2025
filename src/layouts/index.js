import React from 'react'
import Helmet from 'react-helmet'
import TheWrap from '../components/TheWrap'
import TheBanner from '../components/TheBanner'
import TheMenu from '../components/TheMenu'
import TheFooter from '../components/TheFooter'

import '../sass/_generic.global.scss'


export default ({children}) => (
  <TheWrap>
    <Helmet htmlAttributes={{ lang : 'en' }}>
      <title>Faster Pussycat Productions</title>
      <meta name="description" content="The home of fast and furryous graphic design" />
      <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link rel="preconnect" href="https://assets.fppdesign.com.au" crossorigin />
      <link rel="preconnect" href="https://d33wubrfki0l68.cloudfront.net" crossorigin />
      <meta name="robots" content="noindex" />
    </Helmet>

    <TheBanner>
      <TheMenu />
    </TheBanner>

    <div className="content">
      {children()}
    </div>

    <TheFooter />
  </TheWrap>
)
