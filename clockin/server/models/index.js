const { Sequelize } = require('sequelize');

// Create a new instance of Sequelize
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres'
    // other options
});

module.exports = sequelize;
