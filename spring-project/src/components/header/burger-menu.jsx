import styles from './header.module.css';

export const BurgerMenu = ({ onClick }) => {
  return (
    <img
      className={styles.burgerMenu}
      src="/img/burger-menu.png"
      alt="Menu"
      onClick={onClick}
    />
  );
}

