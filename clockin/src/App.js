// src/App.js
import React from 'react';
import LoginForm from './Components/LoginForm';
import RegistrationForm from './Components/RegistrationForm';
import LandingPage from './Components/LandingPage';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route

function App() {
  const isLoggedIn = useSelector(state => state.user.isAuthenticated);

  return (
    <div className="App">
      <header className="App-header">
        {!isLoggedIn ? (
          <Routes>
            <Route path="/login" element={<LoginForm />} /> 
            <Route path="/register" element={<RegistrationForm />} /> 
          </Routes>
        ) : (
          <LandingPage />
        )}
      </header>
    </div>
  );
}

export default App;