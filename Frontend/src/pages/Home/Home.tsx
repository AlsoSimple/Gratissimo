import { SearchBar } from '../../components/SearchBar/SearchBar';
import { CategoryList } from '../../components/CategoryList/CategoryList';
import styles from './Home.module.scss';

export function Home() {
  return (
    <div className={styles.page}>
      <SearchBar />
      <CategoryList />
    </div>
  );
}
