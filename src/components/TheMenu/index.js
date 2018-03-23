import React from 'react'
import Link from 'gatsby-link'
import styles from './style.module.scss'


export default ({ children }) => (
  <nav className={styles.nav} role="navigation">
    <ul className={styles.list}>
      <li className={styles.item}>
        <Link
          exact
          className={styles.link}
          activeClassName={styles.active}
          to="/"
          title="FPP home page"
        >
          Home
        </Link>
      </li>
      <li className={styles.item}>
        <Link
          className={styles.link}
          activeClassName={styles.active}
          to="/portfolio"
          title="Our graphic design portfolio"
        >
          Portfolio
        </Link>
        </li>
      <li className={styles.item}>
        <Link
          className={styles.link}
          activeClassName={styles.active}
          to="/contact"
          title="Contact us via our email form"
        >
          Contact
        </Link>
      </li>
    </ul>
  </nav>
)
