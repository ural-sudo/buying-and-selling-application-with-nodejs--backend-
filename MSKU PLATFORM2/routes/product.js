const express = require('express');
const {body} = require('express-validator/check');

const productController = require('../conntroller/product');
const isAuth = require('../middleware/isAuth');
const fileUpload = require('../middleware/file-upload');
const router = express.Router();


router.post('/postProd/:creatorId',
fileUpload.single('image'),
body('title').not().isEmpty(),
body('category').not().isEmpty(),
body('price').isFloat(),
body('imgUrl').not().isEmpty(),
body('description').not().isEmpty(),
productController.postProduct);

router.get('/my-products/:creatorId', productController.getMyProducts);
/*********************************************** */
router.get('/getProds',productController.getProducts);
/*********************************************** */
router.get('/getprod/:prodId',productController.getSingleProd);
/*********************************************** */
router.put('/updateProd/:prodId',isAuth.auth,
body('title').not().isEmpty(),
body('category').not().isEmpty(),
body('price').isFloat(),
body('imgUrl').not().isEmpty(),
body('description').not().isEmpty(),
productController.updateProduct);
/************************************************ */
router.delete('/deleteProd/:prodId',isAuth.auth,
productController.deleteProduct);

module.exports = router;