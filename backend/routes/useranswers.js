const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/submit', authMiddleware, surveyController.submitSurvey);

module.exports = router;
