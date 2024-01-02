// src/App.js
import React from 'react';
import './App.css';
import LoginForm from './Components/LoginForm';
import RegistrationForm from './Components/RegistrationForm';
import ClockControl from './Components/ClockControl';
import { useSelector } from 'react-redux'; 

function App() {
  // Get the logged-in status from global state (adjust the selector as needed)
  const isLoggedIn = useSelector(state => state.user.isAuthenticated);

  return (
    <div className="App">
      <header className="App-header">
        {/* Show login and registration forms only if not logged in */}
        {!isLoggedIn && (
          <>
            <LoginForm />
            <RegistrationForm />
          </>
        )}

        {/* Show clock control if logged in */}
        {isLoggedIn && <ClockControl />}
      </header>
    </div>
  );
}

export default App;
