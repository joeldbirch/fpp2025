import React from 'react'
import styles from './Menu.module.scss'

export default ({ children }) => (
  <nav className={styles.nav} role="navigation">
    <ul className={styles.list}>
      <li className={styles.item}><a className={styles.link} href="/" data-text="Home" title="Fppdesign home page">Home</a></li>
      <li className={styles.item}><a className={styles.link} href="/portfolio/" data-text="Portfolio" title="Our graphic design portfolio">Portfolio</a></li>
      <li className={styles.item}><a className={styles.link} href="/contact/" data-text="Contact" title="Contact us via our email form">Contact</a></li>
    </ul>
  </nav>
)
