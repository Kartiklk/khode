const express = require('express');
const cartController = require('./../controllers/cartController');

const router = express.Router();

router
   .route('/')
//    .get(itemController.getAllItems)
   .post(cartController.createCartItem);

// router
//    .route('/:id')
//    .get(itemController.getoneItem);

module.exports = router;