import { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import type { Testimony } from '../../hooks/types';
import { API_URL } from '../../utils/api';
import styles from './TestimonyCarousel.module.scss';

export const TestimonyCarousel = () => {
  const { data, isLoading, error } = useFetch<Testimony[]>(`${API_URL}/testimony`);
  const [current, setCurrent] = useState(0);

  // next one every 5 seconds, loops back to the start
  useEffect(() => {
    if (!data) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [data]);

  if (isLoading) return <section className={styles.section}><p>Indlæser...</p></section>;
  if (error) return <section className={styles.section}><p>Kunne ikke hente anmeldelser</p></section>;
  if (!data) return null;

  const testimony = data[current];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{testimony.title}</h2>
      <p className={styles.content}>{testimony.content}</p>
      <span className={styles.name}>{testimony.name}</span>

      <div className={styles.dots}>
        {data.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCurrent(index)}
            className={index === current ? `${styles.dot} ${styles.active}` : styles.dot}
          />
        ))}
      </div>
    </section>
  );
};
