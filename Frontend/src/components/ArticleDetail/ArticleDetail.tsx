import type { Article } from '../../hooks/types';
import { ASSETS_URL } from '../../utils/api';
import { formatDate } from '../../utils/formatDate';
import styles from './ArticleDetail.module.scss';

interface ArticleDetailProps {
  article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <article className={styles.article}>
      <img src={ASSETS_URL + article.imageUrl} alt={article.title} className={styles.image} />
      <div className={styles.content}>
        <h1 className={styles.title}>{article.title}</h1>
        <span className={styles.meta}>{formatDate(article.createdAt)} af {article.author}</span>
        {article.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className={styles.text}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
