import { useLocation } from 'react-router-dom';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import styles from './Login.module.scss';

export function Login() {
  const location = useLocation();
  const isRegister = location.pathname === '/register';

  return (
    <>
      <section className={styles.intro}>
        <h1 className={styles.title}>Log ind eller opret dig som bruger</h1>
        <p className={styles.text}>
          Når du opretter en profil på Gratissimo får du adgang til at oprette, slette og
          redigere i job annoncer. Som privatperson får du mulighed for at gemme de jobs
          du kunne være interesseret i.
        </p>
        <span className={styles.hint}>Log ind for at gå til min side</span>
      </section>

      <section className={styles.page}>
        {isRegister ? <RegisterForm /> : <LoginForm />}
      </section>
    </>
  );
}
