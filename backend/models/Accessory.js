// models/Accessory.js
const db = require('../db');

class Accessory {
    static getAll(callback) {
        const sql = 'SELECT * FROM accessory';
        db.query(sql, callback);
    }

    static getById(id, callback) {
        const sql = 'SELECT * FROM accessory WHERE id = ?';
        db.query(sql, [id], callback);
    }

    static create(accessory, callback) {
        const { name, brand, color_id, image_url, categories_id } = accessory;
        const sql = 'INSERT INTO accessory (name, brand, color_id, image_url, categories_id) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [name, brand, color_id, image_url, categories_id], callback);
    }

    static filterByCategories(categories_id, callback) {
        const sql = 'SELECT * FROM accessory WHERE categories_id = ?';
        db.query(sql, [categories_id], callback);
    }
}

module.exports = Accessory;