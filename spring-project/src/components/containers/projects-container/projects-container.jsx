import { useSearch } from '../../../hooks/use-search';
import { projects } from '../../../constants/constants';
import { ProjectCard } from '../../ui/project-card/project-card';
import { NoResults } from '../../ui/no-results/no-results';
import { SearchBox } from '../../ui/search-box/search-box';
import styles from './projects-container.module.css';

export const ProjectsContainer = () => {
  const { filteredProjects = [], setSearchTerm } = useSearch(projects);
  return (
    <>
      <SearchBox onSearch={setSearchTerm} />
      <section className={styles.cards}>
        <div className={`${styles.container} ${styles.cardsContainer}`}>
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
