import styles from '../../styles/modules/noResults.module.css'

function NoResults() {
    return (
        <div className={styles.noResults}>
        <h3>No projects found</h3>
        <p>Try adjusting your search or filter</p>
        </div>
    );
}

export default NoResults;