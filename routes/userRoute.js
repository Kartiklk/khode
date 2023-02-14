const express = require('express')
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').get(userController.getAllUser).post(authController.signup);
router.route('/:id').get(userController.getOneUser);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;