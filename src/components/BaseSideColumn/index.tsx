import type { ReactNode } from 'react'
import styles from './style.module.scss'

export default ({ children }: { children?: ReactNode }) => (
  <div className={`${styles.side}  side`}>
    {children}
  </div>
)
