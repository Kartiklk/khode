const express = require('express');
const orderController = require('./../controllers/orderController');


const router = express.Router();

router.route('/payment', orderController.payment);

router.route('/').get(orderController.getAllOrder).post(orderController.CreateOrder);
router.route('/:id').get(orderController.getoneOrder).delete(orderController.deleteOrder);

module.exports = router;
