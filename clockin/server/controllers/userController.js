// server/controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db'); 

const userController = {
    // Register a new user
    registerUser: async function(req, res) {
        const { username, password } = req.body;
        try {
            // Check for existing user using SQL query
            const userRes = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
            if (userRes.rows.length) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create user using SQL query
            const newUser = await pool.query(
                'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
                [username, hashedPassword]
            );

            // Extract user from the result
            const user = newUser.rows[0];

            // Create JWT Payload
            const payload = {
                id: user.id,
                username: user.username
            };

            // Sign token
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token: 'Bearer ' + token,
                        user: {
                            id: user.id,
                            username: user.username
                        }
                    });
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    // Login User
    loginUser: async function(req, res) {
        const { username, password } = req.body;
        try {
            // Check for existing user
            const userRes = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
            if (userRes.rows.length === 0) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            // Extract user from the result
            const user = userRes.rows[0];

            // Compare password
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
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token: 'Bearer ' + token,
                        user: {
                            id: user.id,
                            username: user.username
                        }
                    });
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    // Logout User
    logoutUser: function(req, res) {
        // Inform client to discard the token
        res.json({ msg: 'User logged out successfully. Discard the token.' });
    }
};

module.exports = userController;