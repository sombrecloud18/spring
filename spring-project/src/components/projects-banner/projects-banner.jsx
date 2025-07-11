import styles from './projects-banner.module.css';

export const ProjectsBanner = () => (
  <section className={styles.projectsBanner}>
    <div className={styles.container}>
      <h1 className={styles.projectsTitle}>Projects</h1>
      <p className={styles.projectsDescription}>
        From configuration to security, web apps to big data—whatever the infrastructure needs of
        your application may be, there is a Spring Project to help you build it. Start small and use
        just what you need—Spring is modular by design.
      </p>
      <button className={styles.releaseButton}>Release calendar</button>
    </div>
  </section>
);
