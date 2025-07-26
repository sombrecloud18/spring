import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { NavItem } from '../nav-item/nav-item.jsx';
import { BurgerMenu } from '../burger-menu/burger-menu.jsx';
import styles from './header.module.css';

export const Header = ({ navigationPoints }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <img className={styles.headerLogo} src="/images/logo.png" alt="Логотип Spring.io" />
      <BurgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)} />
      <nav className={classNames(styles.headerNav, { [styles.open]: isMenuOpen })}>
        <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>
          &times;
        </button>
        <ul className={styles.headerMenu}>
          {navigationPoints.map((point) => (
            <NavItem key={point.title} point={point} />
          ))}
        </ul>
      </nav>
      <div
        className={classNames(styles.overlay, { [styles.show]: isMenuOpen })}
        onClick={() => setIsMenuOpen(false)}
      />
    </header>
  );
};
