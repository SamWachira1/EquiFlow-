import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createWatchlistThunk,
  getWatchlistsThunk,
  updateWatchlistThunk,
  deleteWatchlistThunk,
  addStockToWatchlistThunk,
  getMemoizedWatchlists
} from '../../redux/watchlist';
import styles from './Watchlist.module.css';

function WatchlistModal({ onClose, stock }) {
  const dispatch = useDispatch();
  const watchlists = useSelector(getMemoizedWatchlists);
  const [selectedWatchlists, setSelectedWatchlists] = useState([]);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editWatchlistId, setEditWatchlistId] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  useEffect(() => {
    dispatch(getWatchlistsThunk());
  }, [dispatch]);

  const handleCheckboxChange = (watchlistId) => {
    setSelectedWatchlists(prevState =>
      prevState.includes(watchlistId)
        ? prevState.filter(id => id !== watchlistId)
        : [...prevState, watchlistId]
    );
  };

  const handleCreateWatchlist = () => {
    if (!newWatchlistName.trim()) {
      setErrorMessage('Please create a watchlist name.');
      return;
    }
    setErrorMessage('');
    dispatch(createWatchlistThunk(newWatchlistName))
      .then(() => setNewWatchlistName(''));
  };

  const handleUpdateWatchlist = () => {
    if (!newWatchlistName.trim()) {
      setErrorMessage('Please create a watchlist name.');
      return;
    }
    setErrorMessage('');
    dispatch(updateWatchlistThunk(editWatchlistId, newWatchlistName))
      .then(() => {
        setNewWatchlistName('');
        setEditMode(false);
        setEditWatchlistId(null);
      });
  };

  const handleDeleteWatchlist = (watchlistId) => {
    dispatch(deleteWatchlistThunk(watchlistId));
  };

  const handleSubmit = () => {
    dispatch(addStockToWatchlistThunk(stock.symbol, stock.name, selectedWatchlists))
      .then(() => {
        setIsAdded(true);
        onClose('Stock added to watchlists successfully'); // Pass message to onClose callback
      });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Add {stock.name} to Your Lists</h2>
        <div className={styles.newWatchlist}>
          <input
            type="text"
            value={newWatchlistName}
            onChange={(e) => setNewWatchlistName(e.target.value)}
            placeholder="New watchlist name"
          />
          {editMode ? (
            <button onClick={handleUpdateWatchlist}>Update Watchlist</button>
          ) : (
            <button onClick={handleCreateWatchlist}>Create New List</button>
          )}
        </div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>} {/* Display error message */}
        <div className={styles.watchlistItems}>
          {watchlists.map(watchlist => (
            <div key={watchlist.id} className={styles.watchlistItem}>
              <input
                type="checkbox"
                checked={selectedWatchlists.includes(watchlist.id)}
                onChange={() => handleCheckboxChange(watchlist.id)}
              />
              <label>{watchlist.name}</label>
              <div className={styles.watchlistActions}>
                <button onClick={() => {
                  setEditMode(true);
                  setEditWatchlistId(watchlist.id);
                  setNewWatchlistName(watchlist.name);
                }}>Edit</button>
                <button onClick={() => handleDeleteWatchlist(watchlist.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.modalActions}>
          <button onClick={handleSubmit} disabled={isAdded}>
            {isAdded ? '✓ Added to Watchlist' : 'Finish'}
          </button>
          <button onClick={() => onClose(null)}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default WatchlistModal;
