
const User = require('../model/user');
const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getUser = (req,res,next) => {
    
    User.findAll()
    .then(result => {
        res.json(req.user);
        
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getSingleUser = (req, res, next) => {
    const userId = req.params.userId;

    User.findByPk(userId)
    .then(user => {
        if(!user){
            const error = new Error('There is no user like this.');
            error.statusCode = 404;
            throw error;
        }
        console.log(user);
        res.status(200).json(user);
    })
    .catch(err => {
        console.log(err);
        next(err);
    })
}
exports.signUp = (req, res, next) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
        const errorMessage = err.array()[0].msg;
        console.log(errorMessage);
        throw new Error(errorMessage);
    }

    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;


    bcrypt.hash(password, 12)
    .then(hashedPassword => {
        User.create({
            name:name,
            surname:surname,
            email:email,
            password:hashedPassword,
            userPoint:''
        })
        .then(result => {
            res.json(result);
            console.log(result);
        })
        
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        };
        next(err);
    });

};

exports.login = (req, res, next ) => {

    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({where: {email:email}})
    .then(user => {
        if(!user){
            const error = new Error('Password or email is not correct');
            error.statusCode =404;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password,user.password)
    })
    .then(isEqual => {
        if(!isEqual){
            const error = new Error('Password or email is not correct')
            error.statusCode = 404;
            throw error;        
        }
        const token = jwt.sign({
            email:loadedUser.email,
            id:loadedUser.id
        }, 'supersecret', {expiresIn:'1m'});
        
        res.status(200).json({token:token , id: loadedUser.id});
        
    })
    .catch(err => {
        console.log(err);
        if(!err.statusCode){
            err.statusCode = 500;
        };
        next(err);
    })
}

exports.updateUser = (req, res, next) => {
    const userId = req.params.userId;
    const error = validationResult(req);
    if(!error.isEmpty()){
        const error = new Error('Validation failed plese check your inputs..');
        error.statusCode = 422;
        throw error;
    }

    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;

    User.findByPk(userId)
    .then(user => {
        if(!user){
            const error = new Error('There is no user like that..');
            error.statusCode = 404;
            throw error;
        }
        user.name = name;
        user.surname = surname;
        user.email = email;
        user.password = password;
        return user.save();

    })
    .then(result => {
        res.status(200).json(result);
        console.log(result);
    })
    .catch(err => {
        console.log(err);
        next();
    });
};

exports.deleteUser = (req, res, next) => {

    const userId = req.params.userId;

    User.findByPk(userId)
    .then(user => {
        if(!user){
            const error = new Error('There is no such a user..');
            error.statusCode = 404;
            throw error;
        }
        return user.destroy();
    })
    .then(result => {
        res.status(200)
        .json(result);
    })
    .catch(err => {
        console.log(err);
        next();
    });
};