import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import styles from './SearchBar.module.css'
import { useSelector } from 'react-redux';

function SearchBar() {
  const [query, setQuery] = useState('');
  const user = useSelector((state)=> state.session.user)

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    // Implement search logic here if needed
  };

  return (
    user ? (<div className={styles.searchContainer}>
      <FaSearch className={styles.searchIcon} />
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search"
        value={query}
        onChange={handleSearchChange}
      />
    </div>) : null 
  );
}

export default SearchBar;
