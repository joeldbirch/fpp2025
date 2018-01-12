import React from 'react'
import styles from './Footer.module.scss'

const year = (new Date()).getFullYear()

export default ({ children }) => (
  <footer className={styles.footer} role="contentinfo">
    <p>&copy; faster pussycat productions 2006&#8212;{ year }</p>
  </footer>
)
