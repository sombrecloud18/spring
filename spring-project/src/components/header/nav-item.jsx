import styles from './header.module.css';
import { useState } from 'react';
import classNames from 'classnames';

export const NavItem = ({ point }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className={classNames(styles.menuItem, {
        [styles.hasDropdown]: point.dropdown
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {point.dropdown ? (
        <>
          {point.title}
          {isHovered && (
            <div className={styles.dropdownContent}>
              {point.dropdown.map((link) => (
                <a key={link.title} href={link.url}>
                  {link.title}
                </a>
              ))}
            </div>
          )}
        </>
      ) : (
        <a href={point.url || '#'}>{point.title}</a>
      )}
    </li>
  );
}
