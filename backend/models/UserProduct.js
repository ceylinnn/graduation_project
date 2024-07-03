//models/UserProduct.js
const db = require('../db');

class UserProduct {
    static create(product, callback) {
        const { user_id, upperwear_id, lowerwear_id, accessory_id, shoes_id } = product;
        const sql = 'INSERT INTO user_products (user_id, upperwear_id, lowerwear_id, accessory_id, shoes_id) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [user_id, upperwear_id, lowerwear_id, accessory_id, shoes_id], callback);
    }

    static findByUserId(user_id, callback) {
        const sql = 'SELECT * FROM user_products WHERE user_id = ?';
        db.query(sql, [user_id], callback);
    }
}

module.exports = UserProduct;
