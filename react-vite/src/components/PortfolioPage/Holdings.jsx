// src/pages/PortfolioPage.js
import { useSelector} from 'react-redux';
import PortfolioGraph from '../PortfolioChart';
import PortfolioWatchlists from '../PortfolioWatchlist';
import BuyingPower from '../BuyingPower';
import styles from './Holdings.module.css';


const PortfolioPage = () => {
  const user = useSelector((state)=> state.session.user)


  return (
   user ? ( <div className={styles.portfolioPage}>
      <div className={styles.leftColumn}>
        <PortfolioGraph />
        <div className={styles.bottomSection}>
          <BuyingPower />
          {/* Other components like Daily Movers, News */}
        </div>
      </div>
      <div className={styles.rightColumn}>
        <PortfolioWatchlists />
      </div>
    </div>) : null 
  );
};

export default PortfolioPage;
