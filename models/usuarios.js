const Sequelize = require('sequelize');
const db = require('../config/config');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        trim: true
    },
    nombre:{
        type: Sequelize.STRING
    },
    
    clave:{
        type: Sequelize.STRING,
        required: true
    }
},{timestamps:false}
)
module.exports = Usuarios;