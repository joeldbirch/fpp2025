import type { ReactNode } from 'react'
import styles from './style.module.scss'

export default ({ children }: { children?: ReactNode }) => (
  <div className={styles.innerwrap}>
    <div className={`${styles.editable}  s-editable`}>
      {children}
    </div>
  </div>
)
