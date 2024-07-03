// routes/userProductShoesRoutes.js
const express = require('express');
const router = express.Router();
const userProductShoesController = require('../controllers/UserProductShoesController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addUserProducts', authMiddleware, userProductShoesController.addUserProducts);
router.get('/getUserProducts', authMiddleware, userProductShoesController.getUserProducts);

module.exports = router;
