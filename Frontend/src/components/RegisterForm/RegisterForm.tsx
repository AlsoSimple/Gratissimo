import { useState, useContext } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { isEmail, isStrongPassword, isPhone } from '../../utils/validation';
import { Button } from '../Button/Button';
import styles from './RegisterForm.module.scss';

export const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    const repeatPassword = String(formData.get('repeatPassword'));
    const firstname = String(formData.get('firstname'));
    const lastname = String(formData.get('lastname'));
    const phone = String(formData.get('phone'));

    if (!email) {
      setError('Intast email');
      return;
    }
    if (!isEmail(email)) {
      setError('Intast en correct email');
      return;
    }
    if (!isStrongPassword(password)) {
      setError('Password skal være mindst 8 tegn med stort og lille bogstav, tal og specialtegn');
      return;
    }
    if (password !== repeatPassword) {
      setError('De to passwords er ikke ens');
      return;
    }
    if (!firstname) {
      setError('Skriv dit fornavn');
      return;
    }
    if (!lastname) {
      setError('Skriv dit efternavn');
      return;
    }
    if (!isPhone(phone)) {
      setError('Telefon nummer skal være 8 cifre');
      return;
    }

    try {
      await register({ email, password, firstname, lastname, phone: Number(phone) });
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <h2 className={styles.title}>Opret ny profil</h2>

      <label className={styles.field}>
        Email
        <input type="email" name="email" placeholder="Skriv din email..." className={styles.input} />
      </label>

      <label className={styles.field}>
        Password
        <input type="password" name="password" placeholder="Skriv dit password..." className={styles.input} />
      </label>

      <label className={styles.field}>
        Gentag password
        <input type="password" name="repeatPassword" placeholder="Skriv dit password..." className={styles.input} />
      </label>

      <label className={styles.field}>
        Fornavn
        <input type="text" name="firstname" placeholder="Skriv dit fornavn..." className={styles.input} />
      </label>

      <label className={styles.field}>
        Efternavn
        <input type="text" name="lastname" placeholder="Skriv dit efternavn..." className={styles.input} />
      </label>

      <label className={styles.field}>
        Telefon nummer
        <input type="tel" name="phone" placeholder="Skriv dit telefon nummer..." className={styles.input} />
      </label>

      {error && <p className={styles.error}>{error}</p>}

      <Button type="submit" className={styles.submit}>Opret profil</Button>
      <Link to="/login" className={styles.switch}>Log ind</Link>
    </form>
  );
};
