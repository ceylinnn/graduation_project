//routes/userProductRoutes.js
const express = require('express');
const router = express.Router();
const userProductController = require('../controllers/userProductController');

router.post('/add', userProductController.addProduct);
router.get('/:userId', userProductController.getUserProducts);

module.exports = router;
