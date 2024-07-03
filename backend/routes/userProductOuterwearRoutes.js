// routes/userProductOuterwearRoutes.js
const express = require('express');
const router = express.Router();
const userProductOuterwearController = require('../controllers/UserProductOuterwearController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addUserProducts', authMiddleware, userProductOuterwearController.addUserProducts);
router.get('/getUserProducts', authMiddleware, userProductOuterwearController.getUserProducts);

module.exports = router;
