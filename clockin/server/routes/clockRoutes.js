const express = require('express');
const router = express.Router();
const clockController = require('../controllers/clockController');

// Define clocking routes
router.post('/clockin', clockController.clockIn);
router.post('/clockout', clockController.clockOut);

// Export the router
module.exports = router;
