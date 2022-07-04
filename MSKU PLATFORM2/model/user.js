
const Sequelize = require('sequelize');

const sequelize = require('../Util/database');

const User = sequelize.define('user', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    surname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    userPoint:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
});


module.exports =User;
