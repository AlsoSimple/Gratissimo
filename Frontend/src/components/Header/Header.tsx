import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaXmark } from 'react-icons/fa6';
import logo from '../../assets/logo/logo-white.png';
import styles from './Header.module.scss';

interface NavLinkItem {
  to: string;
  label: string;
}

interface HeaderProps {
  navLinks: NavLinkItem[];
  userLinks: NavLinkItem[];
}

export const Header = ({ navLinks, userLinks }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link to="/">
          <img src={logo} alt="Gratissimo" className={styles.logo} />
        </Link>

        {/*burger for mobile*/}
        <button type="button" onClick={toggleMenu} className={styles.burger} aria-label="Menu">
          {isMenuOpen ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className={styles.mobileMenu}>
          <ul className={styles.mobileLinks}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} onClick={toggleMenu}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <ul className={`${styles.mobileLinks} ${styles.mobileUserLinks}`}>
            {userLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} onClick={toggleMenu}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
