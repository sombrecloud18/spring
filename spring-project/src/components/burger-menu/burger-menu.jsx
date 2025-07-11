import styles from './burger-menu.module.css';

export const BurgerMenu = ({ onClick }) => (
  <img className={styles.burgerMenu} src="/img/burger-menu.png" alt="Menu" onClick={onClick} />
);
