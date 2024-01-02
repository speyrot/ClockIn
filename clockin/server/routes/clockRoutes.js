const express = require('express');
const passport = require('passport'); // Import passport
const router = express.Router();
const clockController = require('../controllers/clockController');

// Protected clocking routes
// Ensure the user is authenticated before allowing access to these routes
router.post(
    '/clockin',
    passport.authenticate('jwt', { session: false }), // Using JWT strategy here
    clockController.clockIn
);

router.post(
    '/clockout',
    passport.authenticate('jwt', { session: false }), // Using JWT strategy here
    clockController.clockOut
);

// Export the router
module.exports = router;
