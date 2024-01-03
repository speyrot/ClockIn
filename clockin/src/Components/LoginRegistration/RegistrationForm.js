// src/components/RegistrationForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Redux/actions/userActions';
import styles from './LogReg.module.css';  

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ username, password }));
  };

  return (
    <div className={`${styles.loginFormContainer} container`}>
      <div className={`${styles.loginForm} card`}>
        <h2 className="card-header">Register</h2>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className={`mb-3 ${styles.floatingLabel}`}>
              
              <input
                type="text"
                className={`form-control ${styles.loginFormField}`}
                id="register-username"
                placeholder=" "
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="register-username" className="form-label">Username:</label>
            </div>
            <div className={`mb-3 ${styles.floatingLabel}`}>
              
              <input
                type="password"
                className={`form-control ${styles.loginFormField}`}
                id="register-password"
                placeholder=" "
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="register-password" className="form-label">Password:</label>
            </div>
            <button type="submit" className={`btn btn-primary ${styles.loginFormButton}`}>Register</button>
          </form>
          <p className="mt-3">Have an account? <Link to="/" className="link-primary">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;