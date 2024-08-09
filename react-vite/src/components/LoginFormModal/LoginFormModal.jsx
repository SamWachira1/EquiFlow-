import { useState, useEffect, useRef } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import   
 styles from './LoginForm.module.css';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const   
 modalRef = useRef();

  // Generate a unique state value for Google OAuth
  const state = useRef(uuidv4());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();   

    }
  };

  const handleDemoLogin = async () => {
    const demoEmail = "demo@aa.io";
    const demoPassword = "password";

    const serverResponse = await dispatch(
      thunkLogin({
        email: demoEmail,
        password: demoPassword,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleGoogleLogin = () => {
    const googleLoginUrl = `/api/google_auth/google-login?state=${state.current}`;
    window.location.href = googleLoginUrl;
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown",   
 handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);   

    };
  }, []);
  
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} ref={modalRef}>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>
          <button type="submit" className={styles.submitButton}>Log In</button>
          <button type="button" className={styles.demoButton} onClick={handleDemoLogin}>
            Demo User
          </button>
          <button type="button" className={styles.googleButton} onClick={handleGoogleLogin}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className={styles.googleLogo} />
            Log In with Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
