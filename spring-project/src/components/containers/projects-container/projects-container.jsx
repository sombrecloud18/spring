import { useEffect, useState } from 'react';
import { ProjectCard } from '../../ui/project-card/project-card';
import { NoResults } from '../../ui/no-results/no-results';
import { SearchBox } from '../../ui/search-box/search-box';
import styles from './projects-container.module.css';

export const ProjectsContainer = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/projects?search=${searchTerm}`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [searchTerm]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <SearchBox onSearch={setSearchTerm} />
      <section className={styles.cards}>
        <div className={`${styles.container} ${styles.cardsContainer}`}>
          {projects.length === 0 ? (
            <NoResults />
          ) : (
            projects.map((project) => <ProjectCard key={project.title} project={project} />)
          )}
        </div>
      </section>
    </>
  );
};
