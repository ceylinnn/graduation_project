const express = require('express');
const router = express.Router();
const shoesController = require('../controllers/ShoesController');

router.get('/', shoesController.getAllShoes); 
router.get('/filter', shoesController.filterShoesByCategories);

module.exports = router;