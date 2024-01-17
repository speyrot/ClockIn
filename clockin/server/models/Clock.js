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
        field: 'userid' 
    },
    clockintime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'clockintime' 
    },
    clockouttime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'clockouttime' 
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'createdat' 
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updatedat' 
    },
    totalWorkedTime: {
        type: DataTypes.STRING, 
        allowNull: true,
        defaultValue: '00:00:00',
        field: 'totalworkedtime' 
    }
}, {
    sequelize,
    modelName: 'clocks',
    tableName: 'clocks',
    timestamps: true,
    underscored: true // This tells Sequelize to use snake_case for auto-generated fields
});

module.exports = Clock;
