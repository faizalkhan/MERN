const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');


const productController = require('../controllers/productController');


router.post('/signup', authController.signUp);
router.post('/login', authController.login);


module.exports =  router;