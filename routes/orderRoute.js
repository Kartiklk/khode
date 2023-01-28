const express = require('express');
const orderController = require('./../controllers/orderController');


const router = express.Router();

router.route('/').get(orderController.getAllOrder).post(orderController.CreateOrder);
router.route('/:id').get(orderController.getoneOrder);

module.exports = router;
