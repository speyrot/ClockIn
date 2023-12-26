const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index'); // Adjust the path as necessary

class Clock extends Model {}

Clock.init({
    // Define attributes
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    clockInTime: {
        type: DataTypes.DATE,
        allowNull: true
    },
    clockOutTime: {
        type: DataTypes.DATE,
        allowNull: true
    },
    // Add other necessary fields like geolocation data if needed
}, {
    sequelize,
    modelName: 'clock'
    // other model options
});

module.exports = Clock;
