// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Components/LoginRegistration/LoginForm';
import RegistrationForm from './Components/LoginRegistration/RegistrationForm';
import Dashboard from './Components/Dashboard/Dashboard'; 
import TimeSheet from './Components/TimeSheet/TimeSheet';
import Payroll from './Components/Payroll/Payroll';
import Settings from './Components/Settings/Settings';
import BottomNav from './Components/Navigation/BottomNav';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const isLoggedIn = useSelector(state => state.user.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('userToken');
    if (token) {
      // Here you might want to validate the token by calling an endpoint in your backend
      // For now, let's just dispatch login success
      dispatch({ type: 'LOGIN_SUCCESS', payload: { token } });
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {!isLoggedIn ? (
            <Routes>
              <Route path="/" element={<LoginForm />} /> 
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          ) : (
            <>              
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/timesheet" element={<TimeSheet />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate replace to="/dashboard" />} />
              </Routes>
              <BottomNav />
            </>
          )}
        </header>
      </div>
    </Router>
  );
}

export default App;