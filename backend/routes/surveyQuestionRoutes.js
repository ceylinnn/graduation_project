const express = require('express');
const router = express.Router();
const surveyQuestionController = require('../controllers/surveyQuestionController');

router.get('/', surveyQuestionController.getAllSurveyQuestions);

module.exports = router;
