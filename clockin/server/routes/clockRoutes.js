// server/routes/clockRoutes.js
const express = require('express');
const passport = require('passport');
const clockController = require('../controllers/clockController');
const router = express.Router();

// Get Clock In Time route
router.get('/getClockInTime', 
    passport.authenticate('jwt', { session: false }),
    clockController.getClockInTime
);

// Clock In route
router.post('/clockin', 
    passport.authenticate('jwt', { session: false }),
    clockController.clockIn
);

// Clock Out route
router.post('/clockout', 
    passport.authenticate('jwt', { session: false }),
    clockController.clockOut
);

// Get Elapsed Time route
router.get('/getElapsedTime', 
    passport.authenticate('jwt', { session: false }),
    clockController.getElapsedTime
);

module.exports = router;
