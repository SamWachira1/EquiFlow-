// src/components/LandingPage.jsx
import styles from './LandingPage.module.css';
import Footer from '../Footer';

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <div className={styles.header}>
            <h1 className={styles.title}>Welcome to EquiFlow</h1>
            <img src="/LogoImage.jpg" alt="EquiFlow Logo Graph" className={styles.logoImage} />
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.contentSection}>
            <div className={styles.imageTextPair}>
              <img src="/LandingPage1.jpg" alt="Image 1" className={styles.image} />
              <div className={styles.info}>
                <h2>Track Your Investments</h2>
                <p>Get real-time updates on your investment portfolio and make informed decisions with our comprehensive tracking tools.</p>
              </div>
            </div>
            <div className={styles.imageTextPair}>
              <img src="/LandingPage2.jpg" alt="Image 2" className={styles.image} />
              <div className={styles.info}>
                <h2>Analyze Market Trends</h2>
                <p>Use our advanced analytics to understand market trends and predict future movements. Stay ahead of the market with EquiFlow.</p>
              </div>
            </div>
            <div className={styles.imageTextPair}>
              <img src="/LandingPage3.jpg" alt="Image 3" className={styles.image} />
              <div className={styles.info}>
                <h2>Secure and Reliable</h2>
                <p>Your data is secure with us. We prioritize your privacy and ensure that all your information is protected.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
