import { NavLink, useLocation } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import SearchBar from "./SearchBar";
import styles from './Navigation.module.css';
import LandingPage from "../LandingPage";
import { useSelector } from "react-redux";

function Navigation() {
  const user = useSelector((state) => state.session.user);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          {isHomePage && user && (
            <span className={styles.welcomeMessage}>Welcome, {user.username}</span>
          )}
          {!isHomePage &&  (
            <NavLink to="/">Home</NavLink>
          )}
        </div>
        <div className={styles.navCenter}>
          <SearchBar />
        </div>
        <div className={styles.navRight}>
          <ProfileButton />
        </div>
      </nav>

      {!user && <LandingPage />}
    </>
  );
}

export default Navigation;
