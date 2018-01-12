import React from 'react'
import Link from 'gatsby-link'
import styles from './Menu.module.scss'


export default ({ children }) => (
  <nav className={styles.nav} role="navigation">
    <ul className={styles.list}>
      <li className={styles.item}><Link exact className={styles.link} activeClassName={styles.active} to="/" data-text="Home" title="FPP home page">Home</Link></li>
      <li className={styles.item}><Link className={styles.link} activeClassName={styles.active} to="/portfolio" data-text="Portfolio" title="Our graphic design portfolio">Portfolio</Link></li>
      <li className={styles.item}><Link className={styles.link} activeClassName={styles.active} to="/contact" data-text="Contact" title="Contact us via our email form">Contact</Link></li>
    </ul>
  </nav>
)
