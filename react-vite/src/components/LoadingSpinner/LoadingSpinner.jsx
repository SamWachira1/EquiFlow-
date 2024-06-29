// src/components/LoadingSpinner/LoadingSpinner.jsx
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => (
    <div className={styles.loadingDots}>
    <div className={styles.dot}></div>
    <div className={styles.dot}></div>
    <div className={styles.dot}></div>
  </div>
);

export default LoadingSpinner;
