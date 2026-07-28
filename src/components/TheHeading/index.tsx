import type { ReactNode } from 'react'
import { brandColor } from '../../utils/colors'
import styles from './style.module.scss'

const Ampersand = () => {
  return (
    <span
      style={{
        color: brandColor,
        fontFamily: '"Playfair Display", serif',
        fontStyle: 'italic',
        lineHeight: 0.9,
      }}
    >
      &amp;
    </span>
  )
}

const applyCustomAmpersands = (text: string): string | ReactNode[] => {
  const parts = text.split('&')
  if (parts.length === 1) return text
  return parts.reduce<ReactNode[]>((acc, part, i) => {
    if (i === 0) return [part]
    return [...acc, <Ampersand key={i} />, part]
  }, [])
}

export default ({ children }: { children?: ReactNode }) => {
  return (
    <div className={styles.headingwrap}>
      <h1 style={{ margin: 0 }}>{typeof children === 'string' ? applyCustomAmpersands(children) : children}</h1>
    </div>
  )
}
