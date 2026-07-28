import type { ReactNode } from 'react'
import styles from './style.module.scss'

export default ({ children }: { children?: ReactNode }) => (
  <header className={styles.banner} role="banner">
    <div className={styles.sitetitle}>
      <div className={styles.logo}>faster pussycat <span>productions</span></div>
    </div>
    {children}
  </header>
)
