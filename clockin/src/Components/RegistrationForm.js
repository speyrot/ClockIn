// src/components/RegistrationForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../Redux/actions/userActions';
import styles from './LogReg.module.css'; // Assuming you are using the same styles as LoginForm

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ username, password }));
  };

  return (
    <div className={styles.loginFormContainer}>
      <div className={styles.loginForm}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className={`${styles.loginFormField} ${isUsernameFocused || username ? styles.focused : ''}`}>
            <label htmlFor="register-username">Username</label>
            <input
              type="text"
              id="register-username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setIsUsernameFocused(true)}
              onBlur={() => setIsUsernameFocused(false)}
            />
          </div>
          <div className={`${styles.loginFormField} ${isPasswordFocused || password ? styles.focused : ''}`}>
            <label htmlFor="register-password">Password</label>
            <input
              type="password"
              id="register-password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
          </div>
          <button className={styles.loginFormButton} type="submit">Register</button>
        </form>
        <p>Have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default RegistrationForm;

