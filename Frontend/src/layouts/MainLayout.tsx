import { useContext } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Header } from '../components/Header/Header';
import { Navigation } from '../components/Navigation/Navigation';
import { LoginCTA } from '../components/LoginCTA/LoginCTA';
import { Footer } from '../components/Footer/Footer';
import styles from './MainLayout.module.scss';

// Define navlinks
const navLinks = [
  { to: '/', label: 'Alle Jobs', end: true },
  { to: '/create-job', label: 'Opret annonce' },
  { to: '/news', label: 'Nyheder' },
];

// Main layout wrapper
export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // no cta on the login pages
  const isLoginPage = location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // "Min side" and "Log ud" if logged in
  const userLinks = user
    ? [
        { to: '/profile', label: 'Min side' },
        { label: 'Log ud', onClick: handleLogout },
      ]
    : [
        { to: '/register', label: 'Opret Profil' },
        { to: '/login', label: 'Log ind' },
      ];

  return (
    <div className={styles.wrapper}>
      <Header navLinks={navLinks} userLinks={userLinks} />
      <Navigation navLinks={navLinks} userLinks={userLinks} />
      {!isLoginPage && !user && <LoginCTA />}

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
