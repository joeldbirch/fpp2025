import React from 'react'
import styles from './Wrap.module.scss'

export default ({ children }) => (
  <div className={styles.wrap}>
    {children}
  </div>
)
