//routes/surveyRoutes.js
const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');
const authMiddleware = require('../middleware/authMiddleware');//

router.get('/questions', surveyController.getSurveyQuestions);
router.post('/submit', authMiddleware, surveyController.submitSurvey);
router.get('/results/:userId', surveyController.getSurveyResults);

module.exports = router;

