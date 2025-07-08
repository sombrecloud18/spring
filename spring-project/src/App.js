import { useState, useEffect } from 'react';
import { projects, navigationPoints } from './constants.js';
import Header from './components/header/header.js';
import ProjectsBanner from './components/projectsBanner/projectsBanner.js';
import SearchBox from './components/searchBox/searchBox.js';
import ProjectCard from './components/projectCard/projectCard.js';
import NoResults from './components/noResults/noResults.js';
import './styles/style.css';
import './styles/fonts.css';

function App() {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchTerm) {
        setFilteredProjects(projects);
        return;
      }
      
      const filtered = projects.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
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
              filteredProjects.map(project => (
                <ProjectCard key={project.title} project={project} />
              ))
            )}
          </div>
        </section> 
      </main> 
    </div>
  );
}

export default App;