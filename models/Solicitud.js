const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Solicitud = sequelize.define('Solicitud', {
    // Aquí puedes agregar más campos si es necesario
    playerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Solicitud;
