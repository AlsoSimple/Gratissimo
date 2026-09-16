import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import type { JobListing } from '../../hooks/types';
import { API_URL } from '../../utils/api';
import { filterJobs } from '../../utils/filterJobs';
import { JobCard } from '../JobCard/JobCard';
import styles from './JobList.module.scss';

export const JobList = () => {
  const { data, isLoading, error } = useFetch<JobListing[]>(`${API_URL}/job-listings`);
  const [searchParams] = useSearchParams();

  if (isLoading) return <section className={styles.section}><p>Indlæser...</p></section>;
  if (error) return <section className={styles.section}><p>Kunne ikke hente jobs</p></section>;
  if (!data) return null;

  const jobs = filterJobs(data, searchParams);

  if (jobs.length === 0) {
    return <section className={styles.section}><p>Ingen jobs matcher din søgning</p></section>;
  }

  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        {jobs.map((job) => (
          <li key={job.id}>
            <JobCard job={job} />
          </li>
        ))}
      </ul>
    </section>
  );
};
