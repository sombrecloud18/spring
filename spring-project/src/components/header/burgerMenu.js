import styles from '../../styles/modules/header.module.css';

function BurgerMenu({ onClick }) {
  return (
    <img
      className={styles.burgerMenu}
      src="/img/burger-menu.png"
      alt="Menu"
      onClick={onClick}
    />
  );
}

export default BurgerMenu;