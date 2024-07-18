import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import styles from './SearchBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSearchResults, fetchSelectedSecurityDetails } from '../../redux/search';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { results } = useSelector((state) => state.search);
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

    const handleResultClick = async (symbol) => {
        setQuery(''); // Clear the search input
        await dispatch(fetchSelectedSecurityDetails(symbol)); // Fetch and add the security to the database if it doesn't exist
        navigate(`/securities/${symbol}`); // Navigate to the securities page
    };

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
                {query && results.length > 0 && (
                    <ul className={styles.searchResults}>
                        {results.map((result, index) => (
                            <li
                                key={index}
                                className={styles.searchResultItem}
                                onClick={() => handleResultClick(result.symbol)}
                            >
                                {result.name} ({result.symbol})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        ) : null
    );
}

export default SearchBar;
