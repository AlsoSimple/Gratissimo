import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import type { Article } from '../../hooks/types';
import { API_URL } from '../../utils/api';
import { ArticleDetail } from '../../components/ArticleDetail/ArticleDetail';
import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
import styles from './News.module.scss';

export function News() {
  const { data, isLoading, error } = useFetch<Article[]>(`${API_URL}/articles`);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  // scroll up when another article is picked
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) return <section className={styles.page}><p>Indlæser...</p></section>;
  if (error) return <section className={styles.page}><p>Kunne ikke hente nyheder: {error}</p></section>;
  if (!data) return null;

  // Sort by descending date and time...
  const articles = [...data].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // newest if nothing is picked
  const selected = articles.find((article) => article.id === Number(id)) ?? articles[0];

  return (
    <>
      <ArticleDetail article={selected} />

      <section className={styles.page}>
        <h2 className={styles.title}>Alle Nyheder</h2>
        <ul className={styles.grid}>
          {articles.map((article) => (
            <li key={article.id}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
