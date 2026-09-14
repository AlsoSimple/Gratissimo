import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Navigation } from '../components/Navigation/Navigation';
import { Footer } from '../components/Footer/Footer';
import styles from './MainLayout.module.scss';

// Define navlinks
const navLinks = [
  { to: '/jobs', label: 'Alle Jobs' },
  { to: '/create-job', label: 'Opret annonce' },
  { to: '/news', label: 'Nyheder' },
];

const userLinks = [
  { to: '/register', label: 'Opret Profil' },
  { to: '/login', label: 'Log ind' },
];

// Main layout wrapper
export function MainLayout() {
  return (
    <div className={styles.wrapper}>
      <Header navLinks={navLinks} userLinks={userLinks} />
      <Navigation navLinks={navLinks} userLinks={userLinks} />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
