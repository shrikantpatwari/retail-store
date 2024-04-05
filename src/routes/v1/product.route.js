const express = require('express');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const productController = require('../../controllers/product.controller');
const productValidation = require('../../validations/product.validation');

// Set up Multer middleware
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get('/byCategory', validate(productValidation.getProductsByCategory), productController.getProductsByCategory);
router.get('/:productId', validate(productValidation.getProductByID), productController.getProductById);
router.post('/', upload.single('productImg'), productController.postProduct);
router.get('/', productController.getProducts);
router.post('/insertProducts', productController.postProducts);

module.exports = router;
