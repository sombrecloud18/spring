import { useState, useEffect } from 'react';
import classNames from 'classnames';
import NavItem from './navItem';
import BurgerMenu from './burgerMenu';
import styles from '../../styles/modules/header.module.css';

function Header({ navigationPoints }) {
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
            <img className={styles.headerLogo} src="/img/logo.png" alt="Логотип Spring.io" />
            <BurgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)} />
            <nav className={classNames(styles.headerNav, { [styles.open]: isMenuOpen })}>
                <button 
                    className={styles.closeBtn} 
                    onClick={() => setIsMenuOpen(false)}
                >
                    &times;
                </button>
                <ul className={styles.headerMenu}>
                    {navigationPoints.map(point => (
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
}

export default Header;