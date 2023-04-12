const express = require('express');
const orderController = require('./../controllers/orderController');


const router = express.Router();

router.route('/payment').post(orderController.payment, orderController.CreateOrder);
router.route('/webhook').post(orderController.web);

router.route('/').get(orderController.getAllOrder).post(orderController.CreateOrder);
router.route('/:id').get(orderController.getoneOrder).delete(orderController.deleteOrder);

module.exports = router;
