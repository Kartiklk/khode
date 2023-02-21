const express = require('express')
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// router.post('/signup', authController.signup);
// router.post('/login', authController.login);
// router.get('/logout', authController.logout);
router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);

//protect all routes after this middleware
// router.use(authController.protect);

// router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUser);
  // .post(userController.createUser);

// router
//   .route('/:id')
//   .get(userController.getOneUser);
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;