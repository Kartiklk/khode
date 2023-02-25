const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.get('/' , authController.isLoggedIn, viewController.overview);
router.get('/itemslist',authController.isLoggedIn, viewController.itemList);
router.get('/items/:id', authController.isLoggedIn, viewController.item);
router.get('/login', authController.isLoggedIn, viewController.loginform);
router.get('/cart',authController.isLoggedIn, viewController.cart);

module.exports = router;