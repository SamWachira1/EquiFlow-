import styles from './SecurityNotFound.module.css';

const SecurityNotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1>404</h1>
      <p>Security Not Found</p>
      <p>The security you are looking for does not exist or is not available at the moment.</p>
    </div>
  );
};

export default SecurityNotFound;
