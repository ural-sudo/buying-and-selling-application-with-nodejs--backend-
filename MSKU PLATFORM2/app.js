const express = require('express');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./Util/database');
const path = require('path');
const app = express();


//app.use(bodyParser.urlencoded()) // x-www-form-urlencoded   <form> 

app.use(bodyParser.json());
app.use('/uploads/images', express.static(path.join('uploads','images')))
app.use(cors());
app.use((req, res, next) => {
    // Yapılan header  ayarlamalarıyla hangi methodların ve bu methodların ve bu methodları uygularken kullanılacak olan ideleri belirliyiroz.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE'); 
    res.setHeader('Accsess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
    next();
});


app.use('/auth',authRoutes);
app.use('/product',productRoutes);


app.use((error, req, res, next) => {

    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;  
    res.status(status).json({message:message});
})

sequelize.sync()
.then(result => {
    app.listen(8080);
})
.catch(err => {
    console.log(err);
})







