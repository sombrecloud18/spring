import { useState, useEffect } from 'react';
import { projects, navigationPoints } from './constants.js';
import { Header } from './components/header/header.jsx';
import { ProjectsBanner } from './components/projects-banner/projects-banner.jsx';
import { SearchBox } from './components/search-box/search-box.jsx';
import { ProjectCard } from './components/project-card/project-card.jsx';
import { NoResults } from './components/no-results/no-results.jsx';
import './styles/style.css';
import './styles/fonts.css';

export const App = () => {
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
  }, [searchTerm]);

  return (
    <div className="body">
      <Header navigationPoints={navigationPoints} />
      <main className="main">
        <ProjectsBanner />
        <div className="border"></div>
        <SearchBox onSearch={setSearchTerm} />
        <section className="cards">
          <div className="container cardsContainer">
            {filteredProjects.length === 0 ? (
              <NoResults />
            ) : (
              filteredProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};
