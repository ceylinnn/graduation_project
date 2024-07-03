const express = require('express');
const router = express.Router();
const outerwearController = require('../controllers/OuterwearController');

router.get('/', outerwearController.getAllOuterwear); 
router.get('/filter', outerwearController.filterOuterwearByCategories);

module.exports = router;