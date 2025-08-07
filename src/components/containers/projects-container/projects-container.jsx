import { useEffect, useState } from 'react';
import { ProjectCard } from '../../ui/project-card/project-card';
import { NoResults } from '../../ui/no-results/no-results';
import { SearchBox } from '../../ui/search-box/search-box';
import { projectsApi } from '../../../api/api';
import { useSearch } from '../../../hooks/use-search';
import styles from './projects-container.module.css';

export const ProjectsContainer = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    filteredData: searchedProjects,
    searchTerm,
    setSearchTerm,
  } = useSearch(projectsApi.getProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsApi.getProjects('');
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const projectsToShow = searchTerm ? searchedProjects : projects;

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <SearchBox onSearch={setSearchTerm} />
      <section className={styles.cards}>
        <div className={`${styles.container} ${styles.cardsContainer}`}>
          {projectsToShow.length === 0 ? (
            <NoResults />
          ) : (
            projectsToShow.map((project) => <ProjectCard key={project.id} project={project} />)
          )}
        </div>
      </section>
    </>
  );
};
