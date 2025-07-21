import { Header } from '../ui/header/header.jsx';
import { navigationPoints } from '../../constants/constants.js';
import styles from '../../styles/style.css';

export const MainLayout = ({ children }) => (
  <div className={styles.app}>
    <Header navigationPoints={navigationPoints} />
    <main className={styles.mainContent}>{children}</main>
  </div>
);
