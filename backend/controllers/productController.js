const Product = require('../models/productModel');

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dhxyqjgao',
  api_key: '264238275145247',
  api_secret: 'M5un1_dPWYGZRru4iqkuVvwFX4o',
  secure: true,
});

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { title, description, price, onlinePrice, dealerPrice, dealerName, paymentMode } = req.body;
    let imageFileUrl = req.file?.filename;

    // Upload to Cloudinary if an image is provided
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              return reject(error); // Reject the promise on error
            }
            resolve(result); // Resolve the promise on success
          }
        );
        stream.end(req.file.buffer); // Buffer from Multer
      });

      imageFileUrl = result.secure_url; // Store the URL of the uploaded image
    }

    // Create a new product instance
    const newProduct = new Product({
      title,
      description,
      price,
      onlinePrice,
      imageFile: imageFileUrl, // Save the image URL
      dealerPrice,
      dealerName,
      paymentMode
    });

    // Save the product
    await newProduct.save();
    res.status(201).json(newProduct); // Send response after saving
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title, description, price, onlinePrice, dealerPrice, dealerName, paymentMode } = req.body;
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update the product fields
    product.title = title;
    product.description = description;
    product.price = price;
    product.onlinePrice = onlinePrice;
    product.dealerPrice = dealerPrice;
    product.dealerName = dealerName;
    product.paymentMode = paymentMode;

    // Upload new image to Cloudinary if a new file is provided
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) {
              return reject(error); // Reject the promise on error
            }
            resolve(result); // Resolve the promise on success
          }
        );
        stream.end(req.file.buffer); // Buffer from Multer
      });

      product.imageFile = result.secure_url; // Update the image URL
    }

    // Save the updated product
    await product.save();
    res.json(product); // Send response after saving
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
};







// Update an existing product


const getProducts = async (req, res) => {
  try {

    const { paymentMode } = req.query;

    let query = {};

    if (paymentMode) {
      query.paymentMode = paymentMode;
    }

    const products = await Product.find(query);
    res.json(products);

  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};


const getProductById = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching product' });
    }
  };


  const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};


// Export the controller functions
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
