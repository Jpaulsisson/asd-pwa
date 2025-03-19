import { Link } from 'react-router-dom';
import styles from './SideNav.module.css';
import HomeIcon from '../HomeIcon/HomeIcon';
import { useTheme } from '../../contexts/ThemeContext';

type SideNavProps = {
    isOpen: boolean;
    onClose: () => void;
};


function SideNav({ isOpen, onClose }: SideNavProps) {

    const { theme, toggleTheme } = useTheme();

    return (
        <aside className={`${styles.sidenav} ${isOpen ? styles.open : ''}`}>
            <button className={styles.closeButton} onClick={onClose}>
                &times;
            </button>
            <nav>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link to="/" className={styles.navLink} onClick={onClose}>
                            <HomeIcon />
                            <p className={styles.navText}>Home</p>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/tasks" className={styles.navLink} onClick={onClose}>

                            <p className={styles.navText}>Tasks</p>
                        </Link>
                    </li>
                    {/* more links go here */}
                    <li className={styles.navItem}>
                        <button onClick={toggleTheme}>Go {theme === 'light' ? 'dark' : 'light'}</button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default SideNav;