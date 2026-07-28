import type { ReactNode } from 'react'
import styles from './style.module.scss'

export default ({ children }: { children?: ReactNode }) => (
  <main className={styles.main}>
    {children}
  </main>
)
