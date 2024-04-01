const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const productService = require('../services/product.service');

const getProductById = catchAsync(async (req, res) => {
  const product = await productService.getproductById(req.params.productId); //path parameter
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});

const getProductsByCategory = catchAsync(async (req, res) => {
  const {page, limit, category} = req.query;
  const product = await productService.getProductsByCategory(category, limit, page); //Query parameter
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});


const getProducts = catchAsync(async (req, res) => {
  const product = await productService.getproducts();
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});

const postProduct = catchAsync(async(req, res) => {
  const product = req.body;
  console.log(product);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await productService.postProduct(product);
  res.send(product);
});



module.exports = {
  getProducts,
  getProductById,
  postProduct,
  getProductsByCategory
};
