// src/components/AnalystRatings.js
import { useSelector } from 'react-redux';
import styles from './AnalystRatings.module.css';

const AnalystRatings = () => {
  const fundamentalData = useSelector((state) => state.securities.fundamentalData);
  
  if (!fundamentalData || !fundamentalData.AnalystRatings) return null;

  const { Hold, Rating, Sell, StrongBuy, StrongSell } = fundamentalData.AnalystRatings;
  const totalRatings = Hold + Sell + StrongBuy + StrongSell;

  const buyCount = StrongBuy + Rating;
  const buyPercentage = ((buyCount / totalRatings) * 100).toFixed(1);
  const holdPercentage = ((Hold / totalRatings) * 100).toFixed(1);
  const sellPercentage = (((Sell + StrongSell) / totalRatings) * 100).toFixed(1);

  return (
    <>
    <div className={styles.analystRatings}>
    <h3>Analyst Ratings</h3>

      <div className={styles.summary}>
        <div className={styles.percentageCircle}>
          <span>{buyPercentage}%</span>
          <p>of {totalRatings} ratings</p>
        </div>
        <div className={styles.ratingsBars}>
          <div className={styles.bar}>
            <span>Buy</span>
            <progress max="100" value={buyPercentage} className={styles.buy}></progress>
            <span>{buyPercentage}%</span>
          </div>
          <div className={styles.bar}>
            <span>Hold</span>
            <progress max="100" value={holdPercentage} className={styles.hold}></progress>
            <span>{holdPercentage}%</span>
          </div>
          <div className={styles.bar}>
            <span>Sell</span>
            <progress max="100" value={sellPercentage} className={styles.sell}></progress>
            <span>{sellPercentage}%</span>
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default AnalystRatings;
