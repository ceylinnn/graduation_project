// models/UserProductOuterwear.js
const db = require('../db');

class UserProductOuterwear {
    static create(userProductOuterwear, callback) {
        const { user_id, outerwear_id } = userProductOuterwear;
        const sql = 'INSERT INTO userproducts_outerwear (user_id, outerwear_id) VALUES (?, ?)';
        db.query(sql, [user_id, outerwear_id], callback);
    }

    static findByUserId(user_id, callback) {
        const sql = `
            SELECT up.*, u.image_url 
            FROM userproducts_outerwear up 
            JOIN outerwear u ON up.outerwear_id = u.id 
            WHERE up.user_id = ?
        `;
        db.query(sql, [user_id], callback);
    }
}

module.exports = UserProductOuterwear;