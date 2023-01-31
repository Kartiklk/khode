const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/' ,viewController.overview);
router.get('/itemslist', viewController.itemList);
router.get('/item/:id', viewController.item);

module.exports = router;