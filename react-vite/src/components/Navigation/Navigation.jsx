import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import SearchBar from "./SearchBar";
import styles from './Navigation.module.css'
import LandingPage from "../LandingPage";
import { useSelector } from "react-redux";

function Navigation() {
  const user = useSelector((state) => state.session.user);

  return (
    <>
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

      {!user && <LandingPage />}
    </>
  );
}

export default Navigation;
