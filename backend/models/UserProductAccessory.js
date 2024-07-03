// models/UserProductAccessory.js
const db = require('../db');

class UserProductAccessory {
    static create(userProductAccessory, callback) {
        const { user_id, accessory_id } = userProductAccessory;
        const sql = 'INSERT INTO userproducts_accessory (user_id, accessory_id) VALUES (?, ?)';
        db.query(sql, [user_id, accessory_id], callback);
        if (err) {
            console.error('Error inserting user product accessory:', err);
            return callback(err);
        }
        callback(null, result);
        
    }

    static findByUserId(user_id, callback) {
        const sql = `
            SELECT up.*, u.image_url 
            FROM userproducts_accessory up 
            JOIN accessory u ON up.accessory_id = u.id 
            WHERE up.user_id = ?
        `;
        db.query(sql, [user_id], callback);
    }
}

module.exports = UserProductAccessory;