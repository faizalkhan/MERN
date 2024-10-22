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
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
