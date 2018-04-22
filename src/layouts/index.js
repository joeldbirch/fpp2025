import React from 'react'
import Helmet from 'react-helmet'
import TheWrap from '../components/TheWrap'
import TheBanner from '../components/TheBanner'
import TheMenu from '../components/TheMenu'
import TheFooter from '../components/TheFooter'
import BaseContentWrap from '../components/BaseContentWrap'
import { isBrowser } from '../utils/helpers'
import '../sass/_generic.global.scss'
import '../css/jb-lazysizes.css'
if (isBrowser) require('lazysizes')

export default ({ children }) => (
  <TheWrap>
    <Helmet
      htmlAttributes={{
        lang: 'en',
      }}
    >
      <title>Faster Pussycat Productions</title>
      <meta name="description" content="The home of fast and furryous graphic design" />
      <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link rel="preconnect" href="https://assets.fppdesign.com.au" crossorigin />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
      <meta name="robots" content="noindex" />
      <script>
        document.documentElement.className =
        document.documentElement.className.replace(/(\bno-js\b|\bjb-yes-js\b)/g, '') + ' jb-yes-js
        js '
      </script>
    </Helmet>

    <TheBanner>
      <TheMenu />
    </TheBanner>

    <div className="middle">
      <BaseContentWrap>{children()}</BaseContentWrap>
    </div>

    <TheFooter />
  </TheWrap>
)
