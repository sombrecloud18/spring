import styles from '../../styles/style.css';
import { MainLayout } from '../layouts/main-layout.jsx';
import { ProjectsBanner } from './projects-banner/projects-banner.jsx';
import { ProjectsContainer } from './projects-container/projects-container.jsx';

export const MainPage = () => (
  <MainLayout>
    <ProjectsBanner />
    <div className={styles.border}></div>
    <ProjectsContainer />
  </MainLayout>
);
