// server/config/passport.js
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const pool = require('../db'); // Ensure this path points to your database connection pool

// Options for JWT Strategy
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET // Ensure this is defined in your .env file
};

module.exports = function(passport) {
    passport.use(
        new JwtStrategy(options, async (jwt_payload, done) => {
            try {
                // Find the user specified in token using a database query
                const userRes = await pool.query('SELECT * FROM users WHERE id = $1', [jwt_payload.id]);

                // Check if user was found
                if (userRes.rows.length > 0) {
                    const user = userRes.rows[0];
                    return done(null, user);
                } else {
                    return done(null, false); // No user found
                }
            } catch (error) {
                console.error("Error in JWT Strategy:", error);
                return done(error, false);
            }
        })
    );

    // If your application uses sessions, you might need serialization/deserialization
    // These would need to be adapted if you're not using Sequelize
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function(id, done) {
        try {
            const userRes = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
            if (userRes.rows.length > 0) {
                done(null, userRes.rows[0]);
            } else {
                done(new Error('User not found.'), null);
            }
        } catch (error) {
            done(error, null);
        }
    });
};


