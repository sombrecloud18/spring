import styles from './project-card.module.css';

export const ProjectCard = ({ project }) => {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeading}>
        <img src={project.image} alt={project.title} />
        <h3 className={styles.cardTitle}>{project.title}</h3>
      </div>
      <p className={styles
        .cardDescription}>{project.description}</p>
      <div className={styles.versions}>
        <span className={styles.currentVer}>{project.currentVersion}</span>
        <span className={styles.allVer}>+ {project.versionsCount} versions</span>
      </div>
    </article>
  );
};
