const {Sequelize} = require('sequelize');
require ('dotenv').config({path: '.env'})
const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
    host: process.env.HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.PORT
});
module.exports = db;