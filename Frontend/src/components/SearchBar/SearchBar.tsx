import { useState } from 'react';
import type { FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const params: Record<string, string> = {};

    for (const [key, value] of formData) {
      if (value) {
        params[key] = String(value);
      }
    }

    setSearchParams(params);
  }

  return (
    <section className={styles.search}>
      <h2 className={styles.title}>Søg frivilligt arbejde:</h2>

      <form key={searchParams.toString()} onSubmit={handleSubmit}>
        <div className={styles.bar}>
          <label className={styles.field}>
            <img src={searchIcon} alt="search" className={styles.icon} />
            <input
              type="text"
              name="search"
              placeholder="Eks. cafémedhjælper..."
              defaultValue={searchParams.get('search') ?? ''}
              className={styles.input}
            />
          </label>
          <Button type="submit" className={styles.submit}>Søg</Button>
        </div>

        <button type="button" onClick={toggleFilters} className={styles.toggle}>
          Filtrer <img src={chevron} alt="chevron" className={isFiltersOpen ? styles.toggleIconUp : styles.toggleIcon} />
        </button>

        <div className={isFiltersOpen ? `${styles.filters} ${styles.open}` : styles.filters}>
          <span className={styles.label}>Filtrer:</span>

          <span className={styles.filter}>
            <select name="region" defaultValue={searchParams.get('region') ?? ''} className={styles.select}>
              <option value="">Region</option>
              {regions.data?.map((region) => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
            </select>
            <img src={chevron} alt="chevron" className={styles.chevron} />
          </span>

          <span className={styles.filter}>
            <select name="category" defaultValue={searchParams.get('category') ?? ''} className={styles.select}>
              <option value="">Kategorier</option>
              {categories.data?.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <img src={chevron} alt="chevron" className={styles.chevron} />
          </span>

          <span className={styles.filter}>
            <select name="workType" defaultValue={searchParams.get('workType') ?? ''} className={styles.select}>
              <option value="">Arbejdstid</option>
              {workTypes.data?.map((workType) => (
                <option key={workType.id} value={workType.id}>{workType.type}</option>
              ))}
            </select>
            <img src={chevron} alt="chevron" className={styles.chevron} />
          </span>

          <span className={styles.filter}>
            <select name="period" defaultValue={searchParams.get('period') ?? ''} className={styles.select}>
              <option value="">Periode</option>
              <option value="week">Seneste uge</option>
              <option value="month">Seneste måned</option>
              <option value="year">Seneste år</option>
            </select>
            <img src={chevron} alt="chevron" className={styles.chevron} />
          </span>

          <span className={styles.filter}>
            <select name="workHome" defaultValue={searchParams.get('workHome') ?? ''} className={styles.select}>
              <option value="">Hjemmearbejde</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <img src={chevron} alt="chevron" className={styles.chevron} />
          </span>

          <button type="button" onClick={() => setSearchParams({})} className={styles.reset}>Nulstil</button>
        </div>
      </form>
    </section>
  );
};
