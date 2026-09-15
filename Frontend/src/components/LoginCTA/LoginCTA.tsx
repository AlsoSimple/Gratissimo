import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import styles from './LoginCTA.module.scss';

export const LoginCTA = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.loginCta}>
      <p className={styles.text}>Vi hjælper dig på vej til dit næste frivillige job</p>
      <Button className={styles.button} onClick={() => navigate('/login')}>
        Log ind eller opret dig
      </Button>
    </div>
  );
};
