

const jwt = require('jsonwebtoken');

exports.auth =(req, res, next) => {

        const token = req.get('Authorization').split(' ')[1];
        const result = jwt.verify(token, 'supersecret');
        req.user = result.id;
        next()
};