const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.get('/' ,viewController.overview);
router.get('/itemslist', viewController.itemList);
router.get('/item/:id', viewController.item);
router.get('/login', viewController.loginform);
router.get('/cart', viewController.cart);

module.exports = router;