import { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { AuthContext } from '../../context/AuthContext';
import { useFetch } from '../../hooks/useFetch';
import type { JobListing } from '../../hooks/types';
import { API_URL } from '../../utils/api';
import { PageIntro } from '../../components/PageIntro/PageIntro';
import { JobCard } from '../../components/JobCard/JobCard';
import styles from './Profile.module.scss';

export function Profile() {
  const { user, logout, favorites } = useContext(AuthContext);
  const { data } = useFetch<JobListing[]>(`${API_URL}/job-listings`);
  const [tab, setTab] = useState('listings');
  const [myJobs, setMyJobs] = useState<JobListing[]>([]);

  // only the users own jobs
  useEffect(() => {
    if (data && user) {
      // Sort by descending date and time...
      const jobs = [...data].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setMyJobs(jobs.filter((job) => job.userId === user.id));
    }
  }, [data, user]);

  const handleDelete = async (id: number) => {
    if (!confirm('Er du sikker på at du vil slette annoncen?')) return;

    const res = await fetch(`${API_URL}/job-listings/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
    });

    if (res.ok) {
      setMyJobs(myJobs.filter((job) => job.id !== id));
    }
  };

  if (!user) return null;

  return (
    <>
      <PageIntro
        title={`Velkommen ${user.firstname}`}
        text="Rediger eller slet dine annoncer. Du kan også danne dig et overblik over de annoncer du har gemt som favorit, samt fjerne dem igen"
      >
        <div className={styles.links}>
          <button type="button" onClick={logout} className={styles.link}>Log ud</button>
        </div>
      </PageIntro>

      <section className={styles.page}>
        {/*tab switch*/}
        <div className={styles.tabs}>
          <button
            type="button"
            onClick={() => setTab('listings')}
            className={tab === 'listings' ? `${styles.tab} ${styles.active}` : styles.tab}
          >
            Mine annoncer
          </button>
          <button
            type="button"
            onClick={() => setTab('favorites')}
            className={tab === 'favorites' ? `${styles.tab} ${styles.active}` : styles.tab}
          >
            Mine favoritter
          </button>
        </div>

        {tab === 'listings' ? (
          <ul className={styles.list}>
            {myJobs.map((job) => (
              <li key={job.id}>
                <JobCard job={job} onDelete={handleDelete} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className={styles.list}>
            {favorites.map((favorite) => (
              <li key={favorite.id}>
                <JobCard job={favorite.jobListing} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
