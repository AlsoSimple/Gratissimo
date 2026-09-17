import { useState, useContext } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../../context/AuthContext';
import { useFetch } from '../../hooks/useFetch';
import type { JobCategory, Region, WorkType, JobListing } from '../../hooks/types';
import { API_URL } from '../../utils/api';
import { isZipcode } from '../../utils/validation';
import { Button } from '../Button/Button';
import chevron from '../../assets/icons/icons8-chevron-30.png';
import styles from './JobForm.module.scss';

interface JobFormProps {
  job?: JobListing;
}

// creates/edits job if prop is passed
export const JobForm = ({ job }: JobFormProps) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const regions = useFetch<Region[]>(`${API_URL}/regions`);
  const categories = useFetch<JobCategory[]>(`${API_URL}/job-categories`);
  const workTypes = useFetch<WorkType[]>(`${API_URL}/workTypes`);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get('title'));
    const organization = String(formData.get('organization'));
    const regionId = String(formData.get('regionId'));
    const jobCategoryId = String(formData.get('jobCategoryId'));
    const workTypeId = String(formData.get('workTypeId'));
    const workHome = String(formData.get('workHome'));
    const address = String(formData.get('address'));
    const zipcode = String(formData.get('zipcode'));
    const city = String(formData.get('city'));
    const description = String(formData.get('description'));

    if (!title) {
      setError('Skriv en overskrift');
      return;
    }
    if (!organization) {
      setError('Skriv din organisation eller forening');
      return;
    }
    if (!jobCategoryId) {
      setError('Vælg en kategori');
      return;
    }
    if (!workTypeId) {
      setError('Vælg en arbejdstid');
      return;
    }
    if (!workHome) {
      setError('Vælg hjemmearbejde');
      return;
    }
    if (!regionId) {
      setError('Vælg en lokation');
      return;
    }
    if (!city) {
      setError('Skriv en by');
      return;
    }
    if (!isZipcode(zipcode)) {
      setError('Postnummer skal være 4 cifre');
      return;
    }
    if (!address) {
      setError('Skriv en adresse');
      return;
    }
    if (!description) {
      setError('Skriv en beskrivelse af jobbet');
      return;
    }

    const res = await fetch(job ? `${API_URL}/job-listings/${job.id}` : `${API_URL}/job-listings`, {
      method: job ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
      },
      body: JSON.stringify({
        title,
        organization,
        regionId,
        jobCategoryId,
        workTypeId,
        workHome,
        address,
        zipcode,
        city,
        description,
        userId: user?.id,
      }),
    });

    if (!res.ok) {
      setError('Annoncen kunne ikke oprettes, prøv igen');
      return;
    }

    navigate('/profile');
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.columns}>
        <div className={styles.left}>
          <label className={styles.field}>
            Overskrift
            <input type="text" name="title" placeholder="Eks. Mågejæger søges..." defaultValue={job?.title} className={styles.input} />
          </label>

          <label className={styles.field}>
            Organisation / forening
            <input type="text" name="organization" placeholder="Skriv din forening her..." defaultValue={job?.organization} className={styles.input} />
          </label>

          <label className={styles.field}>
            Kategori
            <span className={styles.selectWrap}>
              <select name="jobCategoryId" defaultValue={job?.jobCategoryId} className={styles.select}>
                <option value="">Vælg kategori...</option>
                {categories.data?.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              <img src={chevron} alt="chevron" className={styles.chevron} />
            </span>
          </label>

          <label className={styles.field}>
            Arbejdstid
            <span className={styles.selectWrap}>
              <select name="workTypeId" defaultValue={job?.workTypeId} className={styles.select}>
                <option value="">Vælg arbejdstid...</option>
                {workTypes.data?.map((workType) => (
                  <option key={workType.id} value={workType.id}>{workType.type}</option>
                ))}
              </select>
              <img src={chevron} alt="chevron" className={styles.chevron} />
            </span>
          </label>

          <label className={styles.field}>
            Hjemmearbejde
            <span className={styles.selectWrap}>
              <select name="workHome" defaultValue={job?.workHome} className={styles.select}>
                <option value="">Vælg hjemmearbejde...</option>
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              <img src={chevron} alt="chevron" className={styles.chevron} />
            </span>
          </label>

          <label className={styles.field}>
            Lokation
            <span className={styles.selectWrap}>
              <select name="regionId" defaultValue={job?.regionId} className={styles.select}>
                <option value="">Vælg lokation...</option>
                {regions.data?.map((region) => (
                  <option key={region.id} value={region.id}>{region.name}</option>
                ))}
              </select>
              <img src={chevron} alt="chevron" className={styles.chevron} />
            </span>
          </label>

          <label className={styles.field}>
            By
            <input type="text" name="city" placeholder="Eks. Aalborg SV" defaultValue={job?.city} className={styles.input} />
          </label>

          <label className={styles.field}>
            Postnummer
            <input type="text" name="zipcode" placeholder="Eks. 9200" defaultValue={job?.zipcode} className={styles.input} />
          </label>

          <label className={styles.field}>
            Adresse
            <input type="text" name="address" placeholder="Eks. Holmegade 22, 1. sal" defaultValue={job?.address} className={styles.input} />
          </label>
        </div>

        <div className={styles.right}>
          <label className={styles.field}>
            Job beskrivelse
            <textarea
              name="description"
              placeholder="Her kan du beskrive jobbet, hvilke erfaringer der kræves og hvad der forventes af den frivillige..."
              defaultValue={job?.description}
              className={styles.textarea}
            />
          </label>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <Button type="submit" className={styles.submit}>{job ? 'Gem ændringer' : 'Opret annonce'}</Button>
    </form>
  );
};
