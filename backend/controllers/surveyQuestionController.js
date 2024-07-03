const SurveyQuestionService = require('../services/surveyQuestionService');

exports.getAllSurveyQuestions = async (req, res) => {
    try {
        const questions = await SurveyQuestionService.getAllSurveyQuestions();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
