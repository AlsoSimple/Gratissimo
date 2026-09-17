import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import type { JobListing } from '../../hooks/types';
import { formatDateWithYear } from '../../utils/formatDate';
import { Button } from '../Button/Button';
import heart from '../../assets/icons/icons8-favorite-50.png';
import styles from './JobCard.module.scss';

interface JobCardProps {
  job: JobListing;
  onDelete?: (id: number) => void;
}

export function JobCard({ job, onDelete }: JobCardProps) {
  const { user, favorites, addFavorite, removeFavorite } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginHint, setShowLoginHint] = useState(false);

  const isSaved = favorites.some((favorite) => favorite.jobListingId === job.id);

  const handleSave = () => {
    if (!user) {
      setShowLoginHint(true);
      return;
    }
    if (isSaved) {
      removeFavorite(job.id);
    } else {
      addFavorite(job.id);
    }
  };

  return (
    <article className={isOpen ? `${styles.card} ${styles.open}` : styles.card}>
      <div className={styles.info}>
        <span className={styles.organization}>{job.organization}</span>
        <h3 className={styles.title}>{job.title}</h3>

        {isOpen ? (
          <>
            <span className={styles.category}>{job.jobCategory.name}</span>
            <h4 className={styles.heading}>Beskrivelse</h4>
            <p className={styles.text}>{job.description}</p>
          </>
        ) : (
          <p className={styles.description}>{job.description}</p>
        )}
      </div>

      <div className={styles.side}>
        <span>Lokation: <strong>{job.city}</strong></span>
        <span>Indrykket: <strong>{formatDateWithYear(job.createdAt)}</strong></span>

        {isOpen && (
          <>
            <span>Arbejdstid: <strong>{job.workType.type}</strong></span>
            <span>Hjemmearbejde: <strong>{job.workHome}</strong></span>

            <div className={styles.contact}>
              <h4 className={styles.heading}>Kontakt</h4>
              <span>{job.organization}</span>
              <span>{job.address}</span>
              <span>{job.zipcode} {job.city}</span>
            </div>
          </>
        )}

        {showLoginHint && (
          <span className={styles.hint}>
            <Link to="/login">Log ind</Link> for at gemme jobs
          </span>
        )}

        <div className={styles.buttons}>
          {onDelete ? (
            <Button className={styles.button} onClick={() => onDelete(job.id)}>Slet</Button>
          ) : (
            <Button variant="outline" className={styles.button} onClick={handleSave}>
              {isSaved ? 'Fjern' : 'Gem'} <img src={heart} alt="hjerte" className={styles.heart} />
            </Button>
          )}
          <Button variant="outline" className={styles.button} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Luk' : 'Åben'}
          </Button>
        </div>
      </div>
    </article>
  );
}
