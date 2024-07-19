import { FaGithub, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p className={styles.footerText}>Please reach out here:</p>
        <div className={styles.footerLinks}>
          <a href="https://github.com/SamWachira1/EquiFlow-" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/samuel-w-14794a135/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
            <FaLinkedin size={24} />
          </a>
        </div>
        <p className={styles.footerText}>© 2024 EquiFlow. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
