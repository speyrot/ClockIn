// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './Redux/store'; 
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

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