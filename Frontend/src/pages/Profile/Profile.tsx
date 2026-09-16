import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { PageIntro } from '../../components/PageIntro/PageIntro';
import styles from './Profile.module.scss';

export function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [tab, setTab] = useState('listings');

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
          <p>Mine annoncer</p>
        ) : (
          <p>Mine favoritter</p>
        )}
      </section>
    </>
  );
}
