// services/UserProductLowerwearService.js
const UserProductLowerwear = require('../models/UserProductLowerwear');

class UserProductLowerwearService {
    static async addUserProducts(user_id, product_ids) {
        return new Promise((resolve, reject) => {
            product_ids.forEach(lowerwear_id => {
                UserProductLowerwear.create({ user_id, lowerwear_id }, (err, result) => {
                    if (err) return reject(err);
                });
            });
            resolve({ message: 'Products added successfully' });
        });
    }

    static getUserProducts(user_id) {
        return new Promise((resolve, reject) => {
            UserProductLowerwear.findByUserId(user_id, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
}

module.exports = UserProductLowerwearService;
