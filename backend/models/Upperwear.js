// models/Upperwear.js
const db = require('../db');

class Upperwear {
    static getAll(callback) {
        const sql = 'SELECT * FROM upperwear';
        db.query(sql, callback);
    }

    static getById(id, callback) {
        const sql = 'SELECT * FROM upperwear WHERE id = ?';
        db.query(sql, [id], callback);
    }

    static create(upperwear, callback) {
        const { name, brand, color_id, sleeve_length_id, length_id, image_url } = upperwear;
        const sql = 'INSERT INTO upperwear (name, brand, color_id, sleeve_length_id, length_id, image_url) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [name, brand, color_id, sleeve_length_id, length_id, image_url], callback);
    }

    static filterBySleeveLength(sleeve_length_id, callback) {
        const sql = 'SELECT * FROM upperwear WHERE sleeve_length_id = ?';
        db.query(sql, [sleeve_length_id], callback);
    }
}

module.exports = Upperwear;
