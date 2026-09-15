import { Link } from 'react-router-dom';
import type { Article } from '../../hooks/types';
import { ASSETS_URL } from '../../utils/api';
import { formatDate } from '../../utils/formatDate';
import styles from './ArticleCard.module.scss';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link to={`/news?id=${article.id}`} className={styles.card}>
      <figure>
        <img src={ASSETS_URL + article.imageUrl} alt={article.title} className={styles.image} />
        <figcaption className={styles.caption}>
          <span className={styles.meta}>{formatDate(article.createdAt)} - {article.author}</span>
          <h3 className={styles.title}>{article.title}</h3>
        </figcaption>
      </figure>
    </Link>
  );
}
