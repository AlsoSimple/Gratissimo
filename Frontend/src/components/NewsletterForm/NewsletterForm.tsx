import { useState } from 'react';
import type { FormEvent } from 'react';
import { API_URL } from '../../utils/api';
import { isEmail } from '../../utils/validation';
import styles from './NewsletterForm.module.scss';

export const NewsletterForm = () => {
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    const form = event.currentTarget;
    const email = String(new FormData(form).get('email'));

    if (!isEmail(email)) {
      setMessage('Intast en correct email');
      return;
    }

    const res = await fetch(`${API_URL}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      setMessage('Den email er allerede tilmeldt');
      return;
    }

    form.reset();
    setMessage('Tak for din tilmelding!');
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.bar}>
        <label className={styles.field}>
          <span className={styles.icon}>@</span>
          <input
            type="email"
            name="email"
            placeholder="Indtast email..."
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>Tilmeld</button>
      </div>
      {message && <span className={styles.message}>{message}</span>}
    </form>
  );
};
