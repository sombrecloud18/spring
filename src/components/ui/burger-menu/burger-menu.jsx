import styles from './burger-menu.module.css';

export const BurgerMenu = ({ onClick }) => (
  <img className={styles.burgerMenu} src="/images/burger-menu.png" alt="Menu" onClick={onClick} />
);
