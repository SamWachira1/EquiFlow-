// src/pages/PortfolioPage.js
import { useSelector} from 'react-redux';
import PortfolioGraph from '../PortfolioChart';
import PortfolioWatchlists from '../PortfolioWatchlist';
import BuyingPower from '../BuyingPower';
import Transactions from '../Transactions';
import styles from './PortfolioPage.module.css';


const PortfolioPage = () => {
  const user = useSelector((state)=> state.session.user)


  return user ? (
    <div className={styles.portfolioPage}>
      <div className={styles.leftColumn}>
        <PortfolioGraph />
        <div className={styles.bottomSection}>
          <BuyingPower />
          <Transactions /> 
        </div>
      </div>
      <div className={styles.rightColumn}>
        <PortfolioWatchlists />
      </div>
    </div>
  ) : null;
};

export default PortfolioPage;
