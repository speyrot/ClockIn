const Clock = require('../models/Clock'); // Ensure the path is correct
const User = require('../models/User'); // Ensure the path is correct

const clockController = {
    // Clock user in
    clockIn: async function(req, res) {
        const { userId } = req.body; // Ensure you're receiving the necessary data
        try {
            // Implement geolocation verification logic here if necessary

            // Record clock-in time
            const newClockIn = await Clock.create({
                userId,
                clockInTime: new Date(), // Use actual time or time from client
            });

            res.json(newClockIn);
        } catch (error) {
            res.status(500).send('Server error');
        }
    },

    // Clock user out
    clockOut: async function(req, res) {
        const { userId } = req.body; // Ensure you're receiving the necessary data
        try {
            // Find the latest clock-in record for the user and update with clock-out time
            // This is pseudo-code. Implement according to your logic and model structure
            const latestClockIn = await Clock.findOne({
                where: { userId, clockOutTime: null },
                order: [['createdAt', 'DESC']]
            });

            if (latestClockIn) {
                latestClockIn.clockOutTime = new Date();
                await latestClockIn.save();
                res.json(latestClockIn);
            } else {
                res.status(400).json({ msg: 'No clock-in record found to clock out' });
            }
        } catch (error) {
            res.status(500).send('Server error');
        }
    }
};

module.exports = clockController;