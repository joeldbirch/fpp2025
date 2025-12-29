import React from 'react'
import TheWrap from '../components/TheWrap'
import TheBanner from '../components/TheBanner'
import TheMenu from '../components/TheMenu'
import TheFooter from '../components/TheFooter'
import BaseContentWrap from '../components/BaseContentWrap'
import '../sass/_generic.global.scss'
import '../css/jb-lazysizes.min.css'

export default ({ children }) => (
  <TheWrap>
    <TheBanner>
      <TheMenu />
    </TheBanner>

    <div className="middle">
      <BaseContentWrap>{children}</BaseContentWrap>
    </div>

    <TheFooter />
  </TheWrap>
)
