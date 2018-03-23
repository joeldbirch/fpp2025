import React from 'react'
import styles from './style.module.scss'

export default ({children, className}) => (
  <div className={`${styles.spotlight}  widget  ${(className) ? className : ''}`}>
    {children}
  </div>
)
