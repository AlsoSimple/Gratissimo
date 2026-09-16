import { NavLink, Link } from 'react-router-dom';
import styles from './Navigation.module.scss';

interface NavLinkItem {
  to: string;
  label: string;
  end?: boolean;
}

interface UserLinkItem {
  to?: string;
  label: string;
  onClick?: () => void;
}

interface NavigationProps {
  navLinks: NavLinkItem[];
  userLinks: UserLinkItem[];
}

export const Navigation = ({ navLinks, userLinks }: NavigationProps) => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.links}>
        {navLinks.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className={styles.userLinks}>
        {userLinks.map((link) => (
          <li key={link.label}>
            {link.to ? (
              <Link to={link.to} className={styles.userLink}>
                {link.label}
              </Link>
            ) : (
              <button type="button" onClick={link.onClick} className={styles.userLink}>
                {link.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
