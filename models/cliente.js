const Sequelize = require('sequelize');
const db = require('../config/config');

const Cliente = db.define('clientes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    apellido: {
        type: Sequelize.STRING
    },
    inquilino:{
        type: Sequelize.STRING
    },
    direccion: {
        type: Sequelize.STRING
    },
    telefono: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
},{timestamps:false}
)
module.exports = Cliente;