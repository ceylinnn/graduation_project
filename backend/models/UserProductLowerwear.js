// models/UserProductLowerwear.js
const db = require('../db');

class UserProductLowerwear {
    static create(userProductLowerwear, callback) {
        const { user_id, lowerwear_id } = userProductLowerwear;
        const sql = 'INSERT INTO userproducts_lowerwear (user_id, lowerwear_id) VALUES (?, ?)';
        db.query(sql, [user_id, lowerwear_id], callback);
    }

    static findByUserId(user_id, callback) {
        const sql = `
            SELECT up.*, u.image_url 
            FROM userproducts_lowerwear up 
            JOIN lowerwear u ON up.lowerwear_id = u.id 
            WHERE up.user_id = ?
        `;
        db.query(sql, [user_id], callback);
    }
}

module.exports = UserProductLowerwear;