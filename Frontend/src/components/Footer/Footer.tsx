import { NewsletterForm } from '../NewsletterForm/NewsletterForm';
import linkedin from '../../assets/icons/SoMe/LinkedIn Circled.png';
import facebook from '../../assets/icons/SoMe/Facebook.png';
import instagram from '../../assets/icons/SoMe/Instagram Circle.png';
import googlePlus from '../../assets/icons/SoMe/Google Plus.png';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/*dummy links*/}
      <div className={styles.column}>
        <h3 className={styles.title}>For jobsøgere</h3>
        <ul className={styles.links}>
          <li><a href="#">Din kundeside</a></li>
          <li><a href="#">Opret profil</a></li>
          <li><a href="#">Gemte jobs</a></li>
        </ul>
      </div>

      <div className={styles.column}>
        <h3 className={styles.title}>For arbejdsgivere</h3>
        <ul className={styles.links}>
          <li><a href="#">Virksomhedsprofil</a></li>
          <li><a href="#">Opret annonce</a></li>
          <li><a href="#">Jobannoncering</a></li>
          <li><a href="#">Rekruttering</a></li>
        </ul>
      </div>

      <div className={styles.column}>
        <h3 className={styles.title}>Links</h3>
        <ul className={styles.links}>
          <li><a href="#">Om Gratissimo</a></li>
          <li><a href="#">Job hos os</a></li>
          <li><a href="#">For investorer</a></li>
          <li><a href="#">Presse</a></li>
        </ul>
      </div>

      <div className={`${styles.column} ${styles.newsletter}`}>
        <h3 className={styles.title}>Vil du have jobs direkte i din indbakke?</h3>
        <p className={styles.text}>Tilmeld dig vores elektroniske nyhedsbrev</p>
        <NewsletterForm />
      </div>

      <div className={styles.column}>
        <p className={styles.address}>
          Fidusvej 23<br />
          9230 Øster Lundby<br />
          +45 22 13 22 13
        </p>
        <ul className={styles.some}>
          <li><a href="#"><img src={linkedin} alt="LinkedIn" className={styles.someIcon} /></a></li>
          <li><a href="#"><img src={facebook} alt="Facebook" className={styles.someIcon} /></a></li>
          <li><a href="#"><img src={instagram} alt="Instagram" className={styles.someIcon} /></a></li>
          <li><a href="#"><img src={googlePlus} alt="Google Plus" className={styles.someIcon} /></a></li>
        </ul>
      </div>
    </footer>
  );
};
