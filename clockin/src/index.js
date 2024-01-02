// src/index.js or src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './Redux/store'; // Adjust the path as necessary
import App from './App';

// Find the root element in your HTML
const rootElement = document.getElementById('root');
// Create a root
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


