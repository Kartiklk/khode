const express = require('express')
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').get(userController.getAllUser).post(authController.signup);
router.route('/:id').get(userController.getOneUser);

module.exports = router;