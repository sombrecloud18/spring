import { useState, useEffect } from 'react';
import styles from './search-box.module.css';

export const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchBox}
        placeholder="Search projects by title or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};
