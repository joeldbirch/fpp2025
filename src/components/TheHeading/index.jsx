import React from 'react'
import { brandColor } from '../../utils/colors'
import * as styles from './style.module.scss'

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

const applyCustomAmpersands = (text) => {
  if (typeof text !== 'string') return text
  const parts = text.split('&')
  if (parts.length === 1) return text
  return parts.reduce((acc, part, i) => {
    if (i === 0) return [part]
    return [...acc, <Ampersand key={i} />, part]
  }, [])
}

export default ({ children }) => {
  return (
    <div className={styles.headingwrap}>
      <h1 style={{ margin: 0 }}>{applyCustomAmpersands(children)}</h1>
    </div>
  )
}
