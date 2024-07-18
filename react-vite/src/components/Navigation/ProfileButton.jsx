import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
// import OpenModalMenuItem from "./OpenModalMenuItem";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import styles from './ProfileButton.module.css'

function ProfileButton() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
  };

  return (
    <div className={styles.profileButtonContainer}>
      {user ? (
        <button className={styles.button} onClick={logout}>Log Out</button>
      ) : (
        <>
          <div className={styles.buttonWrapper}>
            <OpenModalButton
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
              buttonClass={styles.button}
            />
          </div>
          <div className={styles.buttonWrapper}>
            <OpenModalButton
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
              buttonClass={styles.button}
            />
          </div>
        </>
      )}
    </div>
  );
}


export default ProfileButton;
