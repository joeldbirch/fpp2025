import React from 'react'
import TheWrap from '../components/TheWrap/TheWrap.js'
import TheBanner from '../components/TheBanner/TheBanner.js'
import TheMenu from '../components/TheMenu/TheMenu.js'
import TheFooter from '../components/TheFooter/TheFooter.js'

import '../sass/_generic.global.scss'


export default ({children}) => (
  <TheWrap>
    <TheBanner>
      <TheMenu />
    </TheBanner>

    <div className="content">
      {children()}
    </div>

    <TheFooter />
  </TheWrap>
)
