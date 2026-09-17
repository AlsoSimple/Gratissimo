import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useFetch } from '../../hooks/useFetch';
import type { JobListing } from '../../hooks/types';
import { API_URL } from '../../utils/api';
import { PageIntro } from '../../components/PageIntro/PageIntro';
import { JobForm } from '../../components/JobForm/JobForm';
import styles from './EditJob.module.scss';

export function EditJob() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const { data } = useFetch<JobListing>(`${API_URL}/job-listings/${id}`);

  return (
    <>
      <PageIntro
        title="Rediger annonce"
        text="Ret i din annonce og gem ændringerne. Du kommer tilbage til min side bagefter."
      >
        <Link to="/profile" className={styles.hint}>Gå til min side</Link>
      </PageIntro>

      <section className={styles.page}>
        {user ? (
          data && <JobForm job={data} />
        ) : (
          <p className={styles.message}>
            Du skal være logget ind for at redigere en annonce. <Link to="/login">Log ind her</Link>
          </p>
        )}
      </section>
    </>
  );
}
