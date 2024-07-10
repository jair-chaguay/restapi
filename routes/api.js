const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/items', itemController.createItem);
router.get('/items', itemController.getAllItems);
router.getById('/items/:id', itemController.getItem);
router.update('/items/:id', itemController.updateItem);
router.getById('/items/:id', itemController.deleteItem);

module.exports = router;