const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const productService = require('../services/product.service');

const getProductById = catchAsync(async (req, res) => {
  const product = await productService.getproductById(req.params.productId); // path parameter
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});

const getProductsByCategory = catchAsync(async (req, res) => {
  const { page, limit, category } = req.query;
  const product = await productService.getProductsByCategory(category, limit, page); // Query parameter
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

const postProduct = catchAsync(async (req, res) => {
  const product = req.body;
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await productService.postProduct(product, req.file);
  res.send(product);
});

const postProducts = catchAsync(async (req, res) => {
  const product = req.body;
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await productService.postProducts(product);
  res.send(product);
});

module.exports = {
  getProducts,
  getProductById,
  postProduct,
  getProductsByCategory,
  postProducts,
};
