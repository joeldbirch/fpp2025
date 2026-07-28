import styles from './style.module.scss'

const items = [
  { href: '/', label: 'Home', title: 'FPP home page', exact: true },
  { href: '/portfolio/', label: 'Portfolio', title: 'Our graphic design portfolio' },
  { href: '/contact/', label: 'Contact', title: 'Contact us via our email form' },
]

export default ({ currentPath = '/' }: { currentPath?: string }) => (
  <nav className={styles.nav} role="navigation">
    <ul className={styles.list}>
      {items.map((item) => {
        const active = item.exact ? currentPath === item.href : currentPath.startsWith(item.href)
        return (
          <li className={styles.item} key={item.href}>
            <a className={`${styles.link} ${active ? styles.active : ''}`} href={item.href} title={item.title}>
              {item.label}
            </a>
          </li>
        )
      })}
    </ul>
  </nav>
)
