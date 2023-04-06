const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.get('/' , authController.isLoggedIn, viewController.overview);
router.get('/itemslist',authController.isLoggedIn, viewController.itemList);
router.get('/items/:id', authController.isLoggedIn, viewController.item);
router.get('/login', authController.isLoggedIn, viewController.loginform);
router.get('/cart',authController.isLoggedIn, authController.protect, viewController.getMycart);
router.get('/order',authController.protect, viewController.Orderdetails);
router.get('/myorders',authController.protect, viewController.myorders);
router.get('/orderdetails',authController.protect, viewController.Orderdetails);
router.get('/myorderdetails/:id',authController.protect, viewController.myorderdetails);

module.exports = router;