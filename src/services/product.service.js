const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const Product = require('../models/product.model');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const getproductById = async (id) => {
  return Product.findById(id);
};

const getProductsByCategory = async (category, limit, page) => {
  return Product.find({ category })
    .sort({ name: 1 })
    .skip(limit * (page - 1))
    .limit(limit);
};
const getproducts = async () => {
  return Product.find({});
};

const postProduct = async (product, file) => {
  // API route to handle file upload
  try {
    const bucketName = process.env.AWS_S3_BUCKET;
    const objectKey = `uploads/${file.originalname}`;

    // Upload the file to S3
    const uploadParams = {
      Bucket: bucketName,
      Key: objectKey,
      Body: file.buffer,
    };
    await s3Client.send(new PutObjectCommand(uploadParams));
    await Product.create(product);
    return 'File uploaded successfully';
  } catch (error) {
    return 'File upload failed';
  }
};

const postProducts = async (product) => {
  return Product.insertMany(product);
};

module.exports = {
  getproductById,
  getproducts,
  postProduct,
  getProductsByCategory,
  postProducts,
};
