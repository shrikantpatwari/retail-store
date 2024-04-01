const express = require('express');
const validate = require('../../middlewares/validate');
const productController = require('../../controllers/product.controller');
const productValidation = require('../../validations/product.validation');

const router = express.Router();

router.get('/byCategory', validate(productValidation.getProductsByCategory), productController.getProductsByCategory);
router.get('/:productId', validate(productValidation.getProductByID),productController.getProductById);
router.post('/', productController.postProduct);
router.get('/', productController.getProducts);


module.exports = router;
