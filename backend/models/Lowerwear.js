// models/Lowerwear.js
const db = require('../db');

class Lowerwear {
    static getAll(callback) {
        const sql = 'SELECT * FROM lowerwear';
        db.query(sql, callback);
    }

    static getById(id, callback) {
        const sql = 'SELECT * FROM lowerwear WHERE id = ?';
        db.query(sql, [id], callback);
    }

    static create(lowerwear, callback) {
        const { name, brand, color_id, length_id, image_url } = lowerwear;
        const sql = 'INSERT INTO lowerwear (name, brand, color_id, length_id, image_url) VALUES ( ?, ?, ?, ?, ?)';
        db.query(sql, [name, brand, color_id, length_id, image_url], callback);
    }

    static filterByCategories(categories_id, callback) {
        const sql = 'SELECT * FROM lowerwear WHERE categories_id = ?';
        db.query(sql, [categories_id], callback);
    }
}

module.exports = Lowerwear;
