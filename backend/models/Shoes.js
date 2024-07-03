// models/Shoes.js
const db = require('../db');

class Shoes {
    static getAll(callback) {
        const sql = 'SELECT * FROM shoes';
        db.query(sql, callback);
    }

    static getById(id, callback) {
        const sql = 'SELECT * FROM shoes WHERE id = ?';
        db.query(sql, [id], callback);
    }

    static create(shoes, callback) {
        const { name, brand, color_id, image_url, heellengths_id, categories_id  } = shoes;
        const sql = 'INSERT INTO shoes (name, brand, color_id, image_url, heellengths_id, categories_id ) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [name, brand, color_id, image_url, heellengths_id, categories_id ], callback);
    }

    static filterByCategories(categories_id , callback) {
        const sql = 'SELECT * FROM shoes WHERE categories_id = ?';
        db.query(sql, [categories_id ], callback);
    }
}

module.exports = Shoes;