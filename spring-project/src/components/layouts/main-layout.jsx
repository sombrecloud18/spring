import { Header } from '../ui/header/header.jsx';
import { navigationPoints } from '../../constants/constants.js';
import { ProjectsBanner } from '../containers/projects-banner/projects-banner.jsx';
import { ProjectsContainer } from '../containers/projects-container/projects-container.jsx';
import styles from '../../styles/style.css';

export const MainLayout = () => (
  <div className={styles.app}>
    <Header navigationPoints={navigationPoints} />
    <main className={styles.mainContent}>
      <ProjectsBanner />
      <div className={styles.border}></div>
      <ProjectsContainer />
    </main>
  </div>
);
