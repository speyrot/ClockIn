// server/app.js
const express = require('express');
const app = express();
const passport = require('passport');
const userRoutes = require('./routes/userRoutes');
const clockRoutes = require('./routes/clockRoutes');

// Passport Config
require('./config/passport')(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session()); 

// Middleware for parsing request bodies here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes here
app.use('/api/users', userRoutes);
app.use('/api/clock', clockRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
