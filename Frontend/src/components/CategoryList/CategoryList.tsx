import { useFetch } from '../../hooks/useFetch';
import type { JobCategory, JobListing } from '../../hooks/types';
import { API_URL } from '../../utils/api';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import styles from './CategoryList.module.scss';

export const CategoryList = () => {
  const categories = useFetch<JobCategory[]>(`${API_URL}/job-categories`);
  const jobs = useFetch<JobListing[]>(`${API_URL}/job-listings`);

  if (categories.isLoading || jobs.isLoading) {
    return <section className={styles.section}><p>Indlæser...</p></section>;
  }

  if (categories.error || jobs.error) {
    return <section className={styles.section}><p>Kunne ikke hente kategorier</p></section>;
  }

  if (!categories.data || !jobs.data) return null;

  // ts loses the type inside map
  const jobList = jobs.data;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Find job ved kategori</h2>
      <ul className={styles.grid}>
        {categories.data.map((category) => (
          <li key={category.id}>
            <CategoryCard
              category={category}
              count={jobList.filter((job) => job.jobCategoryId === category.id).length}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
