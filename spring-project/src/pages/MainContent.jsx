import { useState, useEffect } from 'react';
import { NoResults } from '../components/no-results/no-results.jsx';
import { ProjectsBanner } from '../components/projects-banner/projects-banner.jsx';
import { SearchBox } from '../components/search-box/search-box.jsx';
import { ProjectCard } from '../components/project-card/project-card.jsx';
import { projects } from '../constants.js';

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

export const MainContent = () => {
  const { filteredProjects = [], setSearchTerm } = useSearch(projects);
  return (
    <>
      <ProjectsBanner />
      <div className="border"></div>
      <SearchBox onSearch={setSearchTerm} />
      <section className="cards">
        <div className="container cardsContainer">
          {filteredProjects.length === 0 ? (
            <NoResults />
          ) : (
            filteredProjects.map((project) => <ProjectCard key={project.title} project={project} />)
          )}
        </div>
      </section>
    </>
  );
};
