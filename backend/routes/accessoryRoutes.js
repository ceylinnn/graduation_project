const express = require('express');
const router = express.Router();
const accessoryController = require('../controllers/AccessoryController');

router.get('/', accessoryController.getAllAccessory); 
router.get('/filter', accessoryController.filterAccessoryByCategories);

module.exports = router;