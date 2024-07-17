// src/components/LottieComponent/LottieComponent.jsx
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from './Lottie.module.css';

const LottieComponent = () => {
  const animationPath = 'https://lottie.host/89200215-3c0c-4821-8916-8277dc336d66/Bq8Eo3snnq.lottie';

  return (
    <div className={styles.lottieContainer}>
      <DotLottieReact
        src={animationPath}
        loop
        autoplay
        style={{ width: '100%', height: '100%' }}
      />
      <p className={styles.message}>Intraday data is still processing at this time. Please check back again later...</p>
    </div>
  );
};

export default LottieComponent;
