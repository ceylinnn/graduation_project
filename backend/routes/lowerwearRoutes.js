// routes/lowerwearRoutes.js

const express = require('express');
const router = express.Router();
const lowerwearController = require('../controllers/LowerwearController');

router.post('/addDummy', lowerwearController.addDummyLowerwears);
router.get('/', lowerwearController.getAllLowerwear); 
router.get('/filter', lowerwearController.filterLowerwearByCategories);

module.exports = router;