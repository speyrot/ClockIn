// Server/models/User.js
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./index'); // Adjust the path as necessary

class User extends Model {}

User.init({
    // Define attributes
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Add other necessary fields or associations
}, {
    sequelize,
    modelName: 'user'
    // other model options
});

module.exports = User;
