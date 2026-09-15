import { Link } from 'react-router-dom';
import type { JobCategory } from '../../hooks/types';
import styles from './CategoryCard.module.scss';

interface CategoryCardProps {
  category: JobCategory;
  count: number;
}

export function CategoryCard({ category, count }: CategoryCardProps) {
  return (
    <Link to={`/?category=${category.id}`} className={styles.card}>
      <span className={styles.name}>{category.name}</span>
      <span className={styles.count}>{count}</span>
    </Link>
  );
}
