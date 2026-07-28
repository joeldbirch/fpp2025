import type { ReactNode } from 'react'
import TheWrap from './TheWrap'
import TheBanner from './TheBanner'
import TheMenu from './TheMenu'
import TheFooter from './TheFooter'
import BaseContentWrap from './BaseContentWrap'

export default ({ children, currentPath }: { children?: ReactNode; currentPath: string }) => (
  <TheWrap>
    <TheBanner><TheMenu currentPath={currentPath} /></TheBanner>
    <div className="middle"><BaseContentWrap>{children}</BaseContentWrap></div>
    <TheFooter />
  </TheWrap>
)
