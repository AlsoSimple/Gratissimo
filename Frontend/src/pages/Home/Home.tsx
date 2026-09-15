import { SearchBar } from '../../components/SearchBar/SearchBar';
import { CategoryList } from '../../components/CategoryList/CategoryList';
import { FeaturedNews } from '../../components/FeaturedNews/FeaturedNews';
import { TestimonyCarousel } from '../../components/TestimonyCarousel/TestimonyCarousel';
import styles from './Home.module.scss';

export function Home() {
  return (
    <div className={styles.page}>
      <SearchBar />
      <CategoryList />
      <FeaturedNews />
      <TestimonyCarousel />
    </div>
  );
}
