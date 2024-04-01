const httpStatus = require('http-status');
const Product = require('../models/product.model');
const ApiError = require('../utils/ApiError');

const getproductById = async (id) => {
  return Product.findById(id);
};

const getProductsByCategory = async (category,limit,page) => {
  console.log({category,limit,page});
  return Product.find({category: category })
  .sort({ name: 1 }).skip(limit * (page - 1)).limit(limit);
};
const getproducts = async () => {
  return Product.find({});
};

const postProduct = async (product) => {
  return Product.create({
    ...product
  });
};


module.exports = {
  getproductById,
  getproducts,
  postProduct,
  getProductsByCategory
};
