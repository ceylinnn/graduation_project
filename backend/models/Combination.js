//models/Combination.js
const db = require('../db');

class Combination {
    static create(combination, callback) {
        const { user_id, upperwear_id, lowerwear_id, shoes_id, outerwear_id } = combination;
        const sql = 'INSERT INTO combinations (user_id, upperwear_id, lowerwear_id, shoes_id, outerwear_id) VALUES ( ?, ?, ?, ?, ?)';
        db.query(sql, [user_id, upperwear_id, lowerwear_id, shoes_id, outerwear_id], callback);
    }

    static findByUserId(user_id, callback) {
        const sql = 'SELECT * FROM combinations WHERE user_id = ?';
        db.query(sql, [user_id], callback);
    }

    static save(combination, callback) {
        const { user_id, upperwear_id, lowerwear_id, shoes_id, outerwear_id } = combination;
        const sql = 'INSERT INTO combinations (user_id, upperwear_id, lowerwear_id, shoes_id, outerwear_id) VALUES ( ?, ?, ?, ?, ?)';
        const values = [user_id, upperwear_id, lowerwear_id, shoes_id, outerwear_id !== undefined ? outerwear_id : null];
        db.query(sql, values, callback);
    }

    static findByUserIdWithImages(user_id, callback) {
        const sql = `
            SELECT 
                c.id AS combination_id,
                c.user_id,
                uw.image_url AS upperwear_image,
                lw.image_url AS lowerwear_image,
                s.image_url AS shoes_image,
                ow.image_url AS outerwear_image
            FROM combinations c
            LEFT JOIN upperwear uw ON c.upperwear_id = uw.id
            LEFT JOIN lowerwear lw ON c.lowerwear_id = lw.id
            LEFT JOIN shoes s ON c.shoes_id = s.id
            LEFT JOIN outerwear ow ON c.outerwear_id = ow.id
            WHERE c.user_id = ?
        `;
        db.query(sql, [user_id], callback);
    }

}

module.exports = Combination;

