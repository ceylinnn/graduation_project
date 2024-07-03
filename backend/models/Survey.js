//models/Survey.js
const db = require('../db');

class Survey {
    static create(useranswers, callback) {
        const { user_id, question_id, image_url, selected_style, selected_color_palette } = useranswers;
        const sql = 'INSERT INTO useranswers (user_id, question_id, image_url, selected_style, selected_color_palette) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [user_id, question_id, image_url, selected_style, selected_color_palette], callback);
    }

    static findByUserId(user_id, callback) {
        const sql = 'SELECT * FROM useranswers WHERE user_id = ?';
        db.query(sql, [user_id], callback);
    }

}

module.exports = Survey;
