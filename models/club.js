const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Solicitud = require('./Solicitud');

const Club = sequelize.define('Club', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    director: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Definir una relación uno a muchos con las solicitudes
Club.hasMany(Solicitud, { as: 'solicitudes' });

module.exports = Club;
