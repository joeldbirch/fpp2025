import React from 'react'
import { getCurrentYear } from '../../utils/helpers'
import styles from './style.module.scss'


export default ({ children }) => (
  <footer className={styles.footer} role="contentinfo">
    <p>
      &copy; faster pussycat productions 2006&#8212;{ getCurrentYear() }
    </p>
  </footer>
)
