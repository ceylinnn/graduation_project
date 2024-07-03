//services/surveyService.js
const Survey = require('../models/Survey'); 
const SurveyQuestion = require('../models/SurveyQuestion');

class SurveyService {
    static getSurveyQuestions() {
        return new Promise((resolve, reject) => {
            SurveyQuestion.getAll((err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static submitSurvey(survey) {
        const { user_id, question_id, image_url, selected_style, selected_color_palette } = survey;
        return new Promise((resolve, reject) => {
            Survey.create({ user_id, question_id, image_url, selected_style, selected_color_palette }, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static getSurveyResults(user_id) {
        return new Promise((resolve, reject) => {
            Survey.findByUserId(user_id, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
}

module.exports = SurveyService;

