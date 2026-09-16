import { useState, useContext } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { isEmail } from '../../utils/validation';
import { Button } from '../Button/Button';
import styles from './LoginForm.module.scss';

export const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    if (!email) {
      setError('Intast email');
      return;
    }
    if (!isEmail(email)) {
      setError('Intast en correct email');
      return;
    }
    if (!password) {
      setError('Skriv dit password');
      return;
    }

    try {
      await login(email, password);
      navigate('/profile');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <h2 className={styles.title}>Log ind</h2>

      <label className={styles.field}>
        Email
        <input type="email" name="email" placeholder="Skriv din email..." className={styles.input} />
      </label>

      <label className={styles.field}>
        Password
        <input type="password" name="password" placeholder="Skriv dit password..." className={styles.input} />
      </label>

      {error && <p className={styles.error}>{error}</p>}

      <Button type="submit" className={styles.submit}>Log ind</Button>
      <Link to="/register" className={styles.switch}>Opret bruger</Link>
    </form>
  );
};
