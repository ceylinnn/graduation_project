// routes/userProductUpperwearRoutes.js
const express = require('express');
const router = express.Router();
const userProductUpperwearController = require('../controllers/UserProductUpperwearController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addUserProducts', authMiddleware, userProductUpperwearController.addUserProducts);
router.get('/getUserProducts', authMiddleware, userProductUpperwearController.getUserProducts);

module.exports = router;
