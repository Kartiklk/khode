const express = require('express');
const addressController = require('./../controllers/addressController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').get(addressController.getAllAddress).post(authController.protect, addressController.createAddress);
router.route('/:id').get(addressController.getOneAddress);

module.exports = router;