import { useState, useEffect } from 'react';

export const useSearch = (projects) => {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchTerm) {
        setFilteredProjects(projects);
        return;
      }

      const filtered = projects.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredProjects(filtered);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, projects]);

  return { filteredProjects, searchTerm, setSearchTerm };
};
