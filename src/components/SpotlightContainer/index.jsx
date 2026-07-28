import React from 'react'
import * as styles from './style.module.scss'

export default ({children, className}) => (
  <div className={`${styles.spotlight}  widget  ${className || ''}`}>
    {children}
  </div>
)
