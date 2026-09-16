import { useSearchParams } from 'react-router-dom';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { CategoryList } from '../../components/CategoryList/CategoryList';
import { FeaturedNews } from '../../components/FeaturedNews/FeaturedNews';
import { TestimonyCarousel } from '../../components/TestimonyCarousel/TestimonyCarousel';
import { JobList } from '../../components/JobList/JobList';
import styles from './Home.module.scss';

export function Home() {
  const [searchParams] = useSearchParams();

  // Shows search results if has params, else show landing page
  const isSearching = searchParams.toString() !== '';

  return (
    <div className={styles.page}>
      <SearchBar />

      {isSearching ? (
        <JobList />
      ) : (
        <>
          <CategoryList />
          <FeaturedNews />
          <TestimonyCarousel />
        </>
      )}
    </div>
  );
}
