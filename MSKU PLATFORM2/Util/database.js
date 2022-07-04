const Sequelize = require('sequelize');

const sequelize = new Sequelize('api','sa','password1', {dialect:'mssql',host:'localhost'});


module.exports = sequelize;