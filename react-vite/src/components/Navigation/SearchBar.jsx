import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import styles from './SearchBar.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSearchResults } from '../../redux/search';

function SearchBar() {
  const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const { results, loading, error } = useSelector((state) => state.search);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        if (query) {
            const timeoutId = setTimeout(() => {
                dispatch(fetchSearchResults(query));
            }, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [query, dispatch]);

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };
  
    const resultArray = results[query] ?? [];

    console.log(resultArray)

    return (
        user ? (
            <div className={styles.searchContainer}>
                <FaSearch className={styles.searchIcon} />
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search"
                    value={query}
                    onChange={handleSearchChange}
                />
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {resultArray?.length > 0 && (
                    <ul className={styles.searchResults}>
                        {resultArray.map((result, index) => (
                            <li key={index} className={styles.searchResultItem}>
                                {result.name || result.ticker}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        ) : null
    );
}

export default SearchBar;
