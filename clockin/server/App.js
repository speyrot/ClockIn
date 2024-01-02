// server/app.js
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const app = express();
const passport = require('passport');
const userRoutes = require('./routes/userRoutes');
const clockRoutes = require('./routes/clockRoutes');
const cors = require('cors');

// Enable All CORS Requests for development
app.use(cors());

// Passport Config
require('./config/passport')(passport);

// Initialize Passport Middleware for JWT
app.use(passport.initialize()); 

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/clock', clockRoutes);

const PORT = 3001;  // Use environment variable for PORT or default to 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));