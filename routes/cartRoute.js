const express = require('express');
const cartController = require('./../controllers/cartController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
   .route('/')
   .get(cartController.AllCartItem)
   .post(cartController.createCartItem);

router
   .route('/:id')
   .get(cartController.OneCartItem);

module.exports = router;