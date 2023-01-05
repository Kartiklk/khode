const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/' ,viewController.overview);
router.get('/itemslist', viewController.itemList);

module.exports = router;