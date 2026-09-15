import { useFetch } from '../../hooks/useFetch';
import type { JobCategory, Region, WorkType } from '../../hooks/types';
import { API_URL } from '../../utils/api';
import { Button } from '../Button/Button';
import searchIcon from '../../assets/icons/icons8-search-50.png';
import chevron from '../../assets/icons/icons8-chevron-30.png';
import styles from './SearchBar.module.scss';

export const SearchBar = () => {
  const regions = useFetch<Region[]>(`${API_URL}/regions`);
  const categories = useFetch<JobCategory[]>(`${API_URL}/job-categories`);
  const workTypes = useFetch<WorkType[]>(`${API_URL}/workTypes`);

  return (
    <section className={styles.search}>
      <h2 className={styles.title}>Søg frivilligt arbejde:</h2>

      <form className={styles.form}>
        <label className={styles.field}>
          <img src={searchIcon} alt="search" className={styles.icon} />
          <input type="text" name="search" placeholder="Eks. cafémedhjælper..." className={styles.input} />
        </label>
        <Button type="submit" className={styles.submit}>Søg</Button>
      </form>

      <div className={styles.filters}>
        <span className={styles.label}>Filtrer:</span>

        <select name="region" className={styles.select}>
          <option value="">Region</option>
          {regions.data?.map((region) => (
            <option key={region.id} value={region.id}>{region.name}</option>
          ))}
        </select>
        <img src={chevron} alt="chevron" className={styles.chevron} />

        <select name="category" className={styles.select}>
          <option value="">Kategorier</option>
          {categories.data?.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <img src={chevron} alt="chevron" className={styles.chevron} />

        <select name="workType" className={styles.select}>
          <option value="">Arbejdstid</option>
          {workTypes.data?.map((workType) => (
            <option key={workType.id} value={workType.id}>{workType.type}</option>
          ))}
        </select>
        <img src={chevron} alt="chevron" className={styles.chevron} />

        <select name="period" className={styles.select}>
          <option value="">Periode</option>
          <option value="week">Seneste uge</option>
          <option value="month">Seneste måned</option>
          <option value="year">Seneste år</option>
        </select>
        <img src={chevron} alt="chevron" className={styles.chevron} />

        <select name="workHome" className={styles.select}>
          <option value="">Hjemmearbejde</option>
          <option value="On-site">On-site</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <img src={chevron} alt="chevron" className={styles.chevron} />

        <button type="button" className={styles.reset}>Nulstil</button>
      </div>
    </section>
  );
};
