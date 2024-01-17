// server/controllers/clockController.js
const Clock = require('../models/Clock');

const calculateElapsedTime = (clockInTimeStr) => {
    const nowUtc = new Date(new Date().toISOString()); // Current time in UTC as Date object
    const clockInUtc = new Date(clockInTimeStr + 'Z');

    const elapsed = nowUtc - clockInUtc; // Calculate elapsed time in milliseconds

    console.log(`Clock In Time (UTC String): ${clockInTimeStr}, Current Time (UTC): ${nowUtc.toISOString()}, Elapsed Time: ${elapsed}`);
    return elapsed;
};

const clockController = {
    // Gets clock-in time
    getClockInTime: async function(req, res) {
        const userId = req.user.id;
        try {
            const latestClockIn = await Clock.findOne({
                where: { 
                    userid: userId,
                    clockouttime: null
                },
                attributes: ['clockintime'], // Fetch only the clockintime
                order: [['clockintime', 'DESC']]
            });

            if (!latestClockIn) {
                return res.status(200).json({ msg: 'No active clock-in record found', clockInTime: null });
            }

            // Send the clockInTime as a UTC string
            res.json({ clockInTime: latestClockIn.clockintime.toISOString() });
        } catch (error) {
            res.status(500).send('Server error: ' + error.message);
        }
    },

    // Clock user in
    clockIn: async function(req, res) {
        console.log('Clock In Request Received');
        const userId = req.user.id; // Assuming userId is obtained from authenticated user
        try {
            // Check if the user has already clocked in without clocking out
            console.log(`Clocking in user with ID: ${userId}`);
            const existingClockIn = await Clock.findOne({
                where: { 
                    userid: userId,
                    clockouttime: null
                }
            });

            if (existingClockIn) {
                console.log('User already clocked in');
                return res.status(400).json({ msg: 'User already clocked in' });
            }

            // Record clock-in time
            const newClockIn = await Clock.create({
                userid: userId,
                clockintime: new Date()
            });
            console.log('Clock In Recorded:', newClockIn);

            res.json(newClockIn);
        } catch (error) {
            console.error('Clock In Error:', error);
            res.status(500).send('Server error: ' + error.message);
        }
    },

    // Clock user out
    clockOut: async function(req, res) {
        const userId = req.user.id; // Assuming userId is obtained from authenticated user
        try {
            // Find the latest clock-in record for the user and update with clock-out time
            const latestClockIn = await Clock.findOne({
                where: { 
                    userid: userId,
                    clockouttime: null
                },
                order: [['clockintime', 'DESC']]
            });

            if (!latestClockIn) {
                return res.status(400).json({ msg: 'No clock-in record found to clock out' });
            }

            latestClockIn.clockouttime = new Date();
            await latestClockIn.save();
            res.json(latestClockIn);
        } catch (error) {
            res.status(500).send('Server error: ' + error.message);
        }
    },

    // Get Elapsed Time
    getElapsedTime: async function(req, res) {
        const userId = req.user.id;
        try {
            const latestClockIn = await Clock.findOne({
                where: { 
                    userid: userId,
                    clockouttime: null
                },
                order: [['clockintime', 'DESC']]
            });
            if (!latestClockIn) {
                return res.status(200).json({ elapsedTime: 0 });
            }
            const elapsedTime = calculateElapsedTime(latestClockIn.clockintime);
            res.json({ elapsedTime });
        } catch (error) {
            res.status(500).send('Server error: ' + error.message);
        }
    }
};

module.exports = clockController;