import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWatchlistDetailsThunk, getWatchlistsThunk } from '../../redux/watchlist';
import PortfolioWatchlistModal from '../PortfolioWatchlistModal';
import { FaPlus } from 'react-icons/fa';
import { useModal } from '../../context/Modal';
import styles from './PortfolioWatchlists.module.css';

const PortfolioWatchlists = () => {
  const dispatch = useDispatch();
  const watchlists = useSelector((state) => state.watchlist);
  const [expandedWatchlists, setExpandedWatchlists] = useState({});
  const [loading, setLoading] = useState({});
  const user = useSelector((state) => state.session.user);
  const { setModalContent, closeModal } = useModal();

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

  const openPortfolioWatchlistModal = () => {
    setModalContent(
      <PortfolioWatchlistModal onClose={() => closeModal()} />
    );
  };

  return (
    user ? (
      <div className={styles.watchlistsContainer}>
        <div className={styles.header}>
          <h2>Watchlists</h2>
          <button onClick={openPortfolioWatchlistModal} className={styles.addButton}>
            <FaPlus /> Create Watchlist
          </button>
        </div>
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
                <ul className={styles.watchlistItems}>
                  {watchlist.securities.map((security) => (
                    <li key={security.symbol} className={styles.securityItem}>
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
    ) : null
  );
};

export default PortfolioWatchlists;
