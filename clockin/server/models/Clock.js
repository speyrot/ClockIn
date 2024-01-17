// Server/models/Clock.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index'); 

class Clock extends Model {}

Clock.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id'
        },
        field: 'userid' // Explicitly set the field name
    },
    clockintime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'clockintime' // Explicitly set the field name
    },
    clockouttime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'clockouttime' // Explicitly set the field name
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'createdat' // Explicitly set the field name
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updatedat' // Explicitly set the field name
    }
}, {
    sequelize,
    modelName: 'clocks',
    tableName: 'clocks',
    timestamps: true,
    underscored: true // This tells Sequelize to use snake_case for auto-generated fields
});

module.exports = Clock;
