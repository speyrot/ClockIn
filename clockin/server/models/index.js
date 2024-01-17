// Server/models/index.js
const { Sequelize } = require('sequelize');

// Create a new instance of Sequelize using environment variables
const sequelize = new Sequelize(
    process.env.DB_DATABASE, // Database name
    process.env.DB_USER,     // Username
    process.env.DB_PASSWORD, // Password
    {
        host: process.env.DB_HOST, // Database host
        dialect: 'postgres',
        port: process.env.DB_PORT, // Database port, if not default
        // other options
    }
);

module.exports = sequelize;