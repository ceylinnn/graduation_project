const db = require('../db');

class SurveyQuestion {
    static create(surveyQuestion, callback) {
        const { image_url_1, image_url_2, style_1, style_2, color_palette_1, color_palette_2 } = surveyQuestion;
        const sql = 'INSERT INTO surveyquestions (image_url_1, image_url_2, style_1, style_2, color_palette_1, color_palette_2) VALUES (?, ?, ?, ?, ?, ? )';
        db.query(sql, [image_url_1, image_url_2, style_1, style_2, color_palette_1, color_palette_2], callback);
    }

    static getAll(callback) {
        const sql = 'SELECT * FROM surveyquestions';
        db.query(sql, callback);
    }
}

module.exports = SurveyQuestion;
