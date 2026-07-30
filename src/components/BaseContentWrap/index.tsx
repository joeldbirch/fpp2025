import type { ReactNode } from 'react'
import styles from './style.module.scss'

export default ({ children }: { children?: ReactNode }) => (
  <div className={`
    overflow-hidden
    mx-auto
    px-6
    lap:px-11
    w-full
    desk:max-w-5xl
  `}>
    <div className={`${styles.editable}  s-editable`}>
      {children}
    </div>
  </div>
)
