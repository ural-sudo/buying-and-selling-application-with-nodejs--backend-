const Sequelize = require('sequelize');

const sequelize = require('../Util/database');

const Product = sequelize.define('product', {

    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
    imgUrl:{
        type:Sequelize.STRING,
        allowNull:true
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    creator:{
        type:Sequelize.INTEGER,
        allowNull:false
    }

});

module.exports = Product;