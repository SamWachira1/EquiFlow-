// src/pages/PortfolioPage.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getHoldingsThunk } from '../../redux/holdings';
// import PortfolioGraph from '../components/PortfolioGraph';
// import Watchlists from '../components/Watchlists';
import PortfolioWatchlists from '../PortfolioWatchlist';
import styles from './Holdings.module.css';

const PortfolioPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHoldingsThunk());
  }, [dispatch]);

  return (
    <div className={styles.portfolioPage}>
      <div className={styles.leftColumn}>
        {/* <PortfolioGraph /> */}
        {/* Other components like Buying Power, Daily Movers, News */}
      </div>
      <div className={styles.rightColumn}>
        <PortfolioWatchlists/>
      </div>
    </div>
  );
};

export default PortfolioPage;
