import { useState, useEffect } from 'react';

export const useSearch = (apiFunc) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchTerm.trim()) {
        setFilteredData([]);
        return;
      }

      const fetchData = async () => {
        try {
          const data = await apiFunc(searchTerm);
          setFilteredData(data);
        } catch (err) {
          console.error('Search error:', err);
          setFilteredData([]);
        }
      };
      fetchData();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, apiFunc]);

  return { filteredData, searchTerm, setSearchTerm };
};
