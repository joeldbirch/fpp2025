import React from 'react'
import * as styles from './style.module.scss'

export default ({ children }) => (
  <div className={styles.innerwrap}>
    <div className={`${styles.editable}  s-editable`}>
      {children}
    </div>
  </div>
)
