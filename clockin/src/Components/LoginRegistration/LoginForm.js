// src/components/LoginForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Redux/actions/userActions';
import styles from './LogReg.module.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <div className={`container ${styles.loginFormContainer}`}>
      <div className={`card ${styles.loginForm}`}>
        <h2 className="card-header">Login</h2>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className={`mb-3 ${styles.floatingLabel}`}>
              
              <input
                type="text"
                className={`form-control ${styles.loginFormField}`}
                id="username"
                placeholder=" "
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="username" className="form-label">Username:</label>
            </div>
            <div className={`mb-3 ${styles.floatingLabel}`}>
              
              <input
                type="password"
                className={`form-control ${styles.loginFormField}`}
                id="password"
                placeholder=" "
                autoComplete="user-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className="form-label">Password:</label>
            </div>
            <button type="submit" className={`btn btn-primary ${styles.loginFormButton}`}>Login</button>
          </form>
          <p className="mt-3">Don't have an account? <Link to="/register" className="link-primary">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;