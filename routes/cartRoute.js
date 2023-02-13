const express = require('express');
const cartController = require('./../controllers/cartController');

const router = express.Router();

router
   .route('/')
   .get(cartController.AllCartItem)
   .post(cartController.createCartItem);

router
   .route('/:id')
   .get(cartController.OneCartItem);

module.exports = router;