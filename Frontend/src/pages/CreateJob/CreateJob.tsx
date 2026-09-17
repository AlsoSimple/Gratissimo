import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { PageIntro } from '../../components/PageIntro/PageIntro';
import { JobForm } from '../../components/JobForm/JobForm';
import styles from './CreateJob.module.scss';

export function CreateJob() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <PageIntro
        title="Opret en annonce og find frivillige til din forening"
        text="Gratissimo er gratis for alle. Frivillige, organisationer og foreninger. Du skaber det frivillige liv og vi formidler kontakten. Når du har fundet en frivillig til din forening, kan du blot fjerne annoncen igen ved at gå til min side."
      >
        <Link to="/profile" className={styles.hint}>Gå til min side</Link>
      </PageIntro>

      <section className={styles.page}>
        {user ? (
          <JobForm />
        ) : (
          <p className={styles.message}>
            Du skal være logget ind for at oprette en annonce. <Link to="/login">Log ind her</Link>
          </p>
        )}
      </section>
    </>
  );
}
