const express = require('express');
const addressController = require('./../controllers/addressController');

const router = express.Router();

router.route('/').get(addressController.getAllAddress).post(addressController.createAddress);
router.route('/:id').get(addressController.getOneAddress);

module.exports = router;