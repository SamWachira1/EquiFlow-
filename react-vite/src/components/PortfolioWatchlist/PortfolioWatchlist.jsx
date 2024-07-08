import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWatchlistDetailsThunk, getWatchlistsThunk } from '../../redux/watchlist';
import styles from './PortfolioWatchlists.module.css';

const PortfolioWatchlists = () => {
  const dispatch = useDispatch();
  const watchlists = useSelector((state) => state.watchlist);
  const [expandedWatchlists, setExpandedWatchlists] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    dispatch(getWatchlistsThunk());
  }, [dispatch]);

  const toggleWatchlist = async (id) => {
    setExpandedWatchlists((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));

    if (!expandedWatchlists[id]) {
      setLoading((prevState) => ({
        ...prevState,
        [id]: true,
      }));
      await dispatch(getWatchlistDetailsThunk(id));
      setLoading((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }
  };

  if (!watchlists || Object.keys(watchlists).length === 0) {
    return <div>Loading...</div>; // or some other loading indicator
  }

  return (
    <div className={styles.watchlistsContainer}>
      {watchlists && Object.values(watchlists).map((watchlist) => (
        <div key={watchlist.id} className={styles.watchlist}>
          <div className={styles.watchlistHeader} onClick={() => toggleWatchlist(watchlist.id)}>
            <h3>{watchlist.name}</h3>
            <div className={styles.expandIcon}>{expandedWatchlists[watchlist.id] ? '-' : '+'}</div>
          </div>
          {expandedWatchlists[watchlist.id] && (
            loading[watchlist.id] ? (
              <div className={styles.loader}></div>
            ) : (
              <ul>
                {watchlist.securities.map((security) => (
                  <li key={security.symbol}>
                    <div className={styles.securityDetails}>
                      <span className={styles.securitySymbol}>{security.symbol}</span>
                      <span className={styles.securityPrice}>${security.price.toFixed(2)}</span>
                      <span className={styles.securityChange} style={{ color: security.changePercent >= 0 ? 'green' : 'red' }}>
                        {security.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default PortfolioWatchlists;
