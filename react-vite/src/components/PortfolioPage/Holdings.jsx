// src/pages/PortfolioPage.js
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getHoldingsThunk } from '../../redux/holdings';
import PortfolioGraph from '../PortfolioChart';
import PortfolioWatchlists from '../PortfolioWatchlist';
import BuyingPower from '../BuyingPower';
import styles from './Holdings.module.css';


const PortfolioPage = () => {
  const user = useSelector((state)=> state.session.user)
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getHoldingsThunk());
  }, [dispatch]);

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
