const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
debugger;

const upload = require('../middleware/fileUploadMiddleware');




router.post('/products', upload.single('imageFile'), productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
