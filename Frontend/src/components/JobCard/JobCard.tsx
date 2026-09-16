import { useState } from 'react';
import type { JobListing } from '../../hooks/types';
import { formatDateWithYear } from '../../utils/formatDate';
import { Button } from '../Button/Button';
import heart from '../../assets/icons/icons8-favorite-50.png';
import styles from './JobCard.module.scss';

interface JobCardProps {
  job: JobListing;
}

export function JobCard({ job }: JobCardProps) {
  const [isOpen, setIsOpen] = useState(false);

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

        <div className={styles.buttons}>
          <Button variant="outline" className={styles.button}>
            Gem <img src={heart} alt="hjerte" className={styles.heart} />
          </Button>
          <Button variant="outline" className={styles.button} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Luk' : 'Åben'}
          </Button>
        </div>
      </div>
    </article>
  );
}
