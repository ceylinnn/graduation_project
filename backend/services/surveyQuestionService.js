const SurveyQuestion = require('../models/SurveyQuestion');

class SurveyQuestionService {
    static createSurveyQuestion(surveyQuestion) {
        return new Promise((resolve, reject) => {
            SurveyQuestion.create(surveyQuestion, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static getAllSurveyQuestions() {
        return new Promise((resolve, reject) => {
            SurveyQuestion.getAll((err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
}

module.exports = SurveyQuestionService;
