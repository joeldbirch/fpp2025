import React from 'react'
import styles from './style.module.scss'

export default ({ children }) => (
  <div className={styles.wrap}>
    {children}
  </div>
)
