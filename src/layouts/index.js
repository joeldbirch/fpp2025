import React from 'react'
import Helmet from 'react-helmet'
import TheWrap from '../components/TheWrap'
import TheBanner from '../components/TheBanner'
import TheMenu from '../components/TheMenu'
import TheFooter from '../components/TheFooter'

import '../sass/_generic.global.scss'


export default ({children}) => (
  <TheWrap>
    <Helmet>
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
