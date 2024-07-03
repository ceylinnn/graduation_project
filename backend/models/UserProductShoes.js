// models/UserProductShoes.js
const db = require('../db');

class UserProductShoes {
    static create(userProductShoes, callback) {
        const { user_id, shoes_id } = userProductShoes;
        const sql = 'INSERT INTO userproducts_shoes (user_id, shoes_id) VALUES (?, ?)';
        db.query(sql, [user_id, shoes_id], callback);
    }

    static findByUserId(user_id, callback) {
        const sql = `
            SELECT up.*, u.image_url 
            FROM userproducts_shoes up 
            JOIN shoes u ON up.shoes_id = u.id 
            WHERE up.user_id = ?
        `;
        db.query(sql, [user_id], callback);
    }
}

module.exports = UserProductShoes;