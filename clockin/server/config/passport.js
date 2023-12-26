// server/config/passport.js
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust the path as necessary

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET // Define this in your environment variables
};

module.exports = function(passport) {
    passport.use(
        new JwtStrategy(options, async (jwt_payload, done) => {
            try {
                // Find the user specified in token
                const user = await User.findByPk(jwt_payload.id);
                
                // If user exists, return the user
                // else return false indicating there is no user
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                console.error(error);
                return done(error, false);
            }
        })
    );

    // If your application still uses sessions for other purposes, retain serialization
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findByPk(id).then((user) => {
            done(null, user);
        }).catch(done);
    });
};

