// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Components/LoginRegistration/LoginForm';
import RegistrationForm from './Components/LoginRegistration/RegistrationForm';
import Dashboard from './Components/Dashboard/Dashboard'; 
import TimeSheet from './Components/TimeSheet/TimeSheet';
import Payroll from './Components/Payroll/Payroll';
import More from './Components/More/More';
import BottomNav from './Components/Navigation/BottomNav';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector(state => state.user.isAuthenticated);

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
                <Route path="/more" element={<More />} />
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