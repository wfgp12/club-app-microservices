const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Solicitud = require('./Solicitud');

const Club = sequelize.define('Club', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stadium: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    directorId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


// Definir una relación uno a muchos con las solicitudes
Club.hasMany(Solicitud, { as: 'solicitudes' });

module.exports = Club;
