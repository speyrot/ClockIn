const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure the path is correct

const userController = {
    // Register a new user
    registerUser: async function(req, res) {
        const { username, password } = req.body;
        try {
            // Check for existing user
            let user = await User.findOne({ where: { username } });
            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create user
            user = await User.create({
                username,
                password: hashedPassword,
            });

            // Create JWT Payload
            const payload = {
                id: user.id,
                username: user.username
            };

            // Sign token
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' }, // Token expires in 1 hour
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token: 'Bearer ' + token, // Send the token to the client
                        user: {
                            id: user.id,
                            username: user.username
                        }
                    });
                }
            );
        } catch (error) {
            res.status(500).send('Server error');
        }
    },

    // Login User
    loginUser: async function(req, res) {
        const { username, password } = req.body;
        try {
            let user = await User.findOne({ where: { username } });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            // Create JWT Payload
            const payload = {
                id: user.id,
                username: user.username
            };

            // Sign token
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' }, // Token expires in 1 hour
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token: 'Bearer ' + token, // Send the token to the client
                        user: {
                            id: user.id,
                            username: user.username
                        }
                    });
                }
            );
        } catch (error) {
            res.status(500).send('Server error');
        }
    },

    // Logout User (Note: Usually token is just discarded on the client side)
    logoutUser: function(req, res) {
        // Inform client to discard the token
        res.json({ msg: 'User logged out successfully. Discard the token.' });
    }
};

module.exports = userController;