const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getProductByID = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId).required(),
  }),
};

const getProductsByCategory = {
  query: Joi.object().keys({
    category: Joi.string().required(),
    page: Joi.number(),
    limit: Joi.number(),
  }),
};

module.exports = {
  getProductByID,
  getProductsByCategory,
};
