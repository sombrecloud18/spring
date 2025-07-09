import styles from './no-results.module.css';

export const NoResults = () => {
  return (
    <div className={styles.noResults}>
      <h3>No projects found</h3>
      <p>Try adjusting your search or filter</p>
    </div>
  );
};

