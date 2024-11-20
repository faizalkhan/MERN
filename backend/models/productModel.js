const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    enum: ['Dell', 'HP', 'Lenovo'],
    required: [true, 'brand is required']
  },
  price: {
    type: Number,
    required: true,
  },
  onlinePrice: {
    type: Number,
    required: true,
  },
  dealerPrice: {
    type: Number,
    required: true,
  },
  imageFile: {
    type: String,
    required: true,
  },
  paymentMode: {
    type: String,
    enum: ['EMI', 'COD', 'PAID'],
    required: [true, 'Payment mode is required']
  },
  dealerName: {
    type: String,
    enum: ['Prime Computers', 'JP Computers', 'FlipCart Computers', 'AK Infotech'],
    required: [true, 'Payment mode is required']
  },
  availableStatus: { // Single checkbox field
    type: Boolean,
    required: true, // or false if optional
    default: false, // Default value
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
