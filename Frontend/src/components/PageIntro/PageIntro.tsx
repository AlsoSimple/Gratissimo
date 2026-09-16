import type { ReactNode } from 'react';
import styles from './PageIntro.module.scss';

interface PageIntroProps {
  title: string;
  text: string;
  children?: ReactNode;
}

export const PageIntro = ({ title, text, children }: PageIntroProps) => {
  return (
    <section className={styles.intro}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{text}</p>
      {children}
    </section>
  );
};
