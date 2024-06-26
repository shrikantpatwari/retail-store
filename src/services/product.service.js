const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const Product = require('../models/product.model');
const generateUUID = require('../utils/helper');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const getproductById = async (id) => {
  const product = await Product.findById(id);
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: product.imageURL,
  };
  // Generate pre-signed URL
  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  product.imageURL = url;

  return product;
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
    const fileName =
      generateUUID() + file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    const objectKey = `uploads/${fileName}`;
    // Upload the file to S3
    const uploadParams = {
      Bucket: bucketName,
      Key: objectKey,
      Body: file.buffer,
    };
    // console.log(uploadParams);

    await s3Client.send(new PutObjectCommand(uploadParams));
    Object.assign(product, { imageURL: objectKey });
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
