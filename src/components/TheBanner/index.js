import React from 'react'
import * as styles from './style.module.scss'

export default ({ children }) => (
  <header className={styles.banner} role="banner">
    <div className={styles.sitetitle}>
      <div className={styles.logo}>faster pussycat <span>productions</span></div>
    </div>
    {children}
  </header>
)
