import { useMemo } from 'react';
import { useFetch } from '../../hooks/useFetch';
import type { Article } from '../../hooks/types';
import { API_URL } from '../../utils/api';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import styles from './FeaturedNews.module.scss';

export const FeaturedNews = () => {
  const { data, isLoading, error } = useFetch<Article[]>(`${API_URL}/articles`);

  // 3 random, memo so they don't reshuffle on every render
  const articles = useMemo(() => {
    if (!data) return [];
    return [...data].sort(() => Math.random() - 0.5).slice(0, 3);
  }, [data]);

  if (isLoading) return <section className={styles.section}><p>Indlæser...</p></section>;
  if (error) return <section className={styles.section}><p>Kunne ikke hente nyheder</p></section>;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Udvalgte Nyheder</h2>
      <ul className={styles.grid}>
        {articles.map((article) => (
          <li key={article.id}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
};
