import { NavLink, useLocation } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import SearchBar from "./SearchBar";
import styles from './Navigation.module.css';
import LandingPage from "../LandingPage";
import Ticker from "../Ticker.js";
import { useSelector } from "react-redux";

function Navigation() {
  const user = useSelector((state) => state.session.user);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  const handleReportsClick = () => {
    alert('Feature coming soon!');
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          {isHomePage && user && (
            <span className={styles.welcomeMessage}>Welcome, {user.username}</span>
          )}
          {!isHomePage && (
            <NavLink to="/">Home</NavLink>
          )}
        </div>
        <div className={styles.navCenter}>
          <SearchBar />
        {isHomePage && user && (<span onClick={handleReportsClick} className={styles.reportLink}>Reports</span>)} 
        </div>
        <div className={styles.navRight}>
          <ProfileButton />
        </div>
      </nav>
      <Ticker/>

      {!user && <LandingPage />}
    </>
  );
}

export default Navigation;
