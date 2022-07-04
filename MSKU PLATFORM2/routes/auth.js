
const express =require('express');
const authController =require('../conntroller/auth');
const {body} = require('express-validator/check');
const isAuth = require('../middleware/isAuth');
const User = require('../model/user');

const router = express.Router();

// this request is used for create and saving a user. 
router.post('/signUp',
body('name').trim().not().isEmpty().withMessage('name is required'),
body('surname').trim().not().isEmpty().withMessage('surname is required!'),
body('email')
.isEmail().withMessage('You have to enter an email')
.custom((value, {req}) => {
    return User.findOne({where:{email:value}})
            .then(user => {
                if(user){
                    return Promise.reject('Email already exists..')
                }
            });
            
})
.normalizeEmail(),
body('password')
.trim().isLength({min:5}).isStrongPassword().withMessage('Your password should includes 1 uppercase 1(.,/ etc.) and 1 number'),

authController.signUp);


router.post('/login', authController.login);

//This request is used for fetchig all users.
router.get('/getUsers',isAuth.auth,authController.getUser);

// This request is used for fetcing single user.
router.get('/getUser/:userId',authController.getSingleUser);

//This request is used for updating user.
router.put('/updateUser/:userId',authController.updateUser);

//
router.delete('/deleteUser/:userId',authController.deleteUser);

module.exports = router;