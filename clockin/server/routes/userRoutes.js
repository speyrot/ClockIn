// Import necessary modules and controllers
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);

// Export the router
module.exports = router;