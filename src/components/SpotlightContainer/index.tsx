import type { ReactNode } from 'react'
import styles from './style.module.scss'

export default ({ children, className }: { children?: ReactNode; className?: string }) => (
  <div className={`${styles.spotlight}  widget  ${className || ''}`}>
    {children}
  </div>
)
