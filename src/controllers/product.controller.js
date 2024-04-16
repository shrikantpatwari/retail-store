const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const productService = require('../services/product.service');

// const s3Client = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_KEY,
//   },
// });

const getProductById = catchAsync(async (req, res) => {
  const product = await productService.getproductById(req.params.productId); // path parameter
  // console.log(product);
  // const objectKey = `uploads/${product.ProductImg}`; // 2d24327d-0ec0-45c0-a2cb-dd6ac7881fbf-18eb9a8fb29.jpg;
  // const params = {
  //   Bucket: process.env.AWS_S3_BUCKET,
  //   Key: objectKey,
  // };
  // Generate pre-signed URL
  // const url = s3.getSignedUrl('getObject', params);
  // product.ProductImg = url;

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
