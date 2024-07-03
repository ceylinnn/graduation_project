//models/User.js
const db = require('../db');

class User {
    static create(user, callback) {
        const { username, email, password } = user;
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(sql, [username, email, password], callback);
    }

    static findByEmail(email, callback) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return callback(err, null);
            }
            console.log('Database results:', results);
            callback(null, results);
        });
    }

    static update(id, user, callback) {
        const { username, email, password } = user;
        const sql = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
        db.query(sql, [username, email, password, id], callback);
    }

    static delete(id, callback) {
        const sql = 'DELETE FROM users WHERE id = ?';
        db.query(sql, [id], callback);
    }

    static getAll(callback) {
        const sql = 'SELECT * FROM users';
        db.query(sql, callback);
    }

        static findById(id, callback) {
            const sql = 'SELECT id, username, email FROM users WHERE id = ?';
            db.query(sql, [id], (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return callback(err, null);
                }
                console.log('Database findById results:', results); // Ekleme: Log ekleyin
                callback(null, results);
            });
        }
}

module.exports = User