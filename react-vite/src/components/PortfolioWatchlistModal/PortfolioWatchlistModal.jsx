import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWatchlistThunk, updateWatchlistThunk, deleteWatchlistThunk, getMemoizedWatchlists } from '../../redux/watchlist';
import styles from './PortfolioWatchlistModal.module.css';

const PortfolioWatchlistModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const watchlists = useSelector(getMemoizedWatchlists);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editWatchlistId, setEditWatchlistId] = useState(null);

  const handleCreateWatchlist = () => {
    dispatch(createWatchlistThunk(newWatchlistName)).then(() => {
      setNewWatchlistName('');
      onClose();
    });
  };

  const handleUpdateWatchlist = () => {
    dispatch(updateWatchlistThunk(editWatchlistId, newWatchlistName)).then(() => {
      setNewWatchlistName('');
      setEditMode(false);
      setEditWatchlistId(null);
      onClose();
    });
  };

  const handleDeleteWatchlist = (watchlistId) => {
    dispatch(deleteWatchlistThunk(watchlistId)).then(() => onClose());
  };

  const handleSaveChanges = () => {
    if (editMode) {
      handleUpdateWatchlist();
    } else {
      handleCreateWatchlist();
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{editMode ? 'Edit Watchlist' : 'Create New Watchlist'}</h2>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={newWatchlistName}
            onChange={(e) => setNewWatchlistName(e.target.value)}
            placeholder="Watchlist name"
          />
          <button className={styles.createButton} onClick={handleSaveChanges}>
            {editMode ? 'Update Watchlist' : 'Create New List'}
          </button>
        </div>
        <div className={styles.watchlistItems}>
          {watchlists.map((watchlist) => (
            <div key={watchlist.id} className={styles.watchlistItem}>
              <span>{watchlist.name}</span>
              <div className={styles.watchlistActions}>
                <button className={styles.editButton} onClick={() => {
                  setEditMode(true);
                  setEditWatchlistId(watchlist.id);
                  setNewWatchlistName(watchlist.name);
                }}>Edit</button>
                <button className={styles.deleteButton} onClick={() => handleDeleteWatchlist(watchlist.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.modalActions}>
          <button className={styles.saveButton} onClick={handleSaveChanges}>Save Changes</button>
          <button className={styles.closeButton} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioWatchlistModal;
