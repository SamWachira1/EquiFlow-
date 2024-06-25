import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import SearchBar from "./SearchBar";
import styles from './Navigation.module.css'

function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li className={styles.navItem}>
          <SearchBar />
        </li>
        <li className={styles.navItem}>
          <ProfileButton />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
