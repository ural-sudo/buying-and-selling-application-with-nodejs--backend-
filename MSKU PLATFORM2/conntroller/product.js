
const Product = require('../model/product');
const path = require('path');

const {validationResult} = require('express-validator/check');
const User = require('../model/user');
const { log } = require('console');


exports.getProducts = (req, res, next) => {

    Product.findAll()
    .then(product => {
        res.status(200).json(product);
    })
    .catch( err => {
        console.log(err);
        next(err);
    });
};

exports.getSingleProd = (req, res, next) =>{

    const prodId = req.params.prodId;

    Product.findByPk(prodId)
    .then(product => {
        
        if(product === null){
            const error = new Error('There is no porduct like this in this system..')
            error.statusCode =404;
            throw error;
        };
        User.findOne({where:{id:product.creator}})
        .then(user => {
            res.status(200).json({product:product,user:user});
        })
        
    })
    .catch(err => {
        console.log(err);
        if(!err.statusCode){
            err.statusCode = 500;
        };
        next(err);
    });
};

exports.getMyProducts = (req, res, next) => {
    const userId = req.params.creatorId;
    Product.findAll({where: {creator:userId}})
    .then(product => {
        console.log(product);   
        res.json(product);
    })
    .catch(err => {

    })
};

exports.postProduct = (req, res, next) => {
    
    const creatorId = req.params.creatorId;
    const title = req.body.title;
    const category = req.body.category;
    const price = req.body.price;
    const description = req.body.description;
    
    
   
    const check = validationResult(req);
    if(!check.isEmpty){
        const error = new Error('VALILIDATION ERROR! Check your inputs..');
        error.statusCode = 422;
        throw error;
    }
    /* const imageUrl = image.path; */
    Product.create({
        title:title,
        category:category,
        price:price,
        imgUrl:req.file.path,
        description:description,
        creator:creatorId
    })
    .then( product => {
        res.status(200).json(product);
        console.log(product);
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        };
        next(err);
    });
};

exports.updateProduct = (req, res, next) => {

    const prodId = req.params.prodId;
    const updatedTitle = req.body.title;
    const updatedCategory = req.body.category;
    const updatedPrice = req.body.price;
    const updatedİmgUrl = req.body.imgUrl;
    const updatedDesc = req.body.description;
    
    const check = validationResult(req);
    if(!check.isEmpty()){
        const error = new Error('VALIDATION FAILD! Please check your inputs...');
        error.statusCode =422;
        throw error;
    }
    Product.findByPk(prodId)
    .then(product => {
        if(!product){
            const error = new Error('There is no product like this in the system...');
            error.statusCode =404;
            throw error;
        }
        product.title =updatedTitle;
        product.category=updatedCategory;
        product.price =updatedPrice;
        product.imgUrl =updatedİmgUrl;
        product.description =updatedDesc;
        return product.save()
    })
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log();
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.deleteProduct = (req, res, next) =>{
    const prodId = req.params.prodId;

    Product.findByPk(prodId)
    .then(product => {
        if(!product){
            const error =new Error('Product is not found!');
            error.statusCode =404;
            throw error;
        }
        return product.destroy();
    })
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        if(!err.statusCode){
            err.statusCode = 500;
        };
        next(err);
    });
};