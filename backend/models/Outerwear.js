// models/Outerwear.js
const db = require('../db');

class Outerwear {
    static getAll(callback) {
        const sql = 'SELECT * FROM outerwear';
        db.query(sql, callback);
    }

    static getById(id, callback) {
        const sql = 'SELECT * FROM outerwear WHERE id = ?';
        db.query(sql, [id], callback);
    }

    static create(outerwear, callback) {
        const { name, brand, color_id, image_url, categories_id, season_id  } = outerwear;
        const sql = 'INSERT INTO outerwear (name, brand, color_id, image_url, categories_id, season_id ) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [name, brand, color_id, image_url, categories_id, season_id ], callback);
    }

    static filterByCategories(categories_id , callback) {
        const sql = 'SELECT * FROM outerwear WHERE categories_id = ?';
        db.query(sql, [categories_id ], callback);
    }
}

module.exports = Outerwear;