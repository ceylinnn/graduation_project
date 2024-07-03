// models/UserProductUpperwear.js
const db = require('../db');

class UserProductUpperwear {
    static create(userProductUpperwear, callback) {
        const { user_id, upperwear_id } = userProductUpperwear;
        const sql = 'INSERT INTO userproducts_upperwear (user_id, upperwear_id) VALUES (?, ?)';
        db.query(sql, [user_id, upperwear_id], callback);
    }

    static findByUserId(user_id, callback) {
        const sql = `
            SELECT up.*, u.image_url 
            FROM userproducts_upperwear up 
            JOIN upperwear u ON up.upperwear_id = u.id 
            WHERE up.user_id = ?
        `;
        db.query(sql, [user_id], callback);
    }

}

module.exports = UserProductUpperwear;
