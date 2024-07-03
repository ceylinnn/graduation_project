// routes/userProductAccessoryRoutes.js
const express = require('express');
const router = express.Router();
const userProductAccessoryController = require('../controllers/UserProductAccessoryController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addUserProducts', authMiddleware, userProductAccessoryController.addUserProducts);
router.get('/getUserProducts', authMiddleware, userProductAccessoryController.getUserProducts);

module.exports = router;
