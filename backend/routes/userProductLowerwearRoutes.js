// routes/userProductLowerwearRoutes.js
const express = require('express');
const router = express.Router();
const userProductLowerwearController = require('../controllers/UserProductLowerwearController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addUserProducts', authMiddleware, userProductLowerwearController.addUserProducts);
router.get('/getUserProducts', authMiddleware, userProductLowerwearController.getUserProducts);

module.exports = router;
