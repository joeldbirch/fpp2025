import React from 'react'
import TheWrap from './TheWrap'
import TheBanner from './TheBanner'
import TheMenu from './TheMenu'
import TheFooter from './TheFooter'
import BaseContentWrap from './BaseMainColumn'

export default ({ children, currentPath }) => (
  <TheWrap>
    <TheBanner><TheMenu currentPath={currentPath} /></TheBanner>
    <div className="middle"><BaseContentWrap>{children}</BaseContentWrap></div>
    <TheFooter />
  </TheWrap>
)
