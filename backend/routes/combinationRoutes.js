const express = require('express');
const router = express.Router();
const combinationController = require('../controllers/combinationController');

router.post('/create', combinationController.createCombination);
router.get('/user/:userId', combinationController.getCombinations);
router.get('/generate/:userId', combinationController.generateCombinations);//
router.post('/save', combinationController.saveCombination); 
router.get('/user/:userId/images', combinationController.getCombinationsWithImages);

module.exports = router;
