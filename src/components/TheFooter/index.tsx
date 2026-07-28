import { getCurrentYear } from '../../utils/helpers'
import styles from './style.module.scss'

export default () => (
  <footer className={styles.footer} role='contentinfo'>
    <p>
      &copy; faster pussycat productions <span>2006&#8212;{ getCurrentYear() }</span>
    </p>
  </footer>
)
