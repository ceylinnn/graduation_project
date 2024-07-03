const db = require('../db');

class UserProfile {
    static create(profile, callback) {
        const { user_id, image_url, preferred_styles, preferred_color_palettes } = profile;
        const sql = 'INSERT INTO userprofile (user_id, image_url, preferred_styles, preferred_color_palettes) VALUES (?, ?, ?, ?)';
        db.query(sql, [user_id, image_url, preferred_styles, preferred_color_palettes], callback);
    }

    static findByUserId(user_id, callback) {
        const sql = 'SELECT * FROM userprofile WHERE user_id = ?';
        db.query(sql, [user_id], callback);
    }

    static update(user_id, profile, callback) {
        const { image_url, preferred_styles, preferred_color_palettes } = profile;
        const sql = 'UPDATE userprofile SET image_url = ?, preferred_styles = ?, preferred_color_palettes = ? WHERE user_id = ?';
        db.query(sql, [image_url, preferred_styles, preferred_color_palettes, user_id], callback);
    }
}

module.exports = UserProfile;

