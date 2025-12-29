import React from 'react'
import * as styles from './style.module.scss'

export default ({ children }) => (
  <div className={`${styles.side}  side`}>
    {children}
  </div>
)
