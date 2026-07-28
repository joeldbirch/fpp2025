import React from 'react'
import * as styles from './style.module.scss'

export default ({ children }) => (
  <main className={styles.main}>
    {children}
  </main>
)
