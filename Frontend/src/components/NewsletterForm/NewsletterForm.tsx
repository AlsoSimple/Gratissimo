import styles from './NewsletterForm.module.scss';

export const NewsletterForm = () => {
  return (
    <form className={styles.form}>
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
    </form>
  );
};
