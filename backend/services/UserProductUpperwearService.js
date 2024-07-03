// services/UserProductUpperwearService.js
const UserProductUpperwear = require('../models/UserProductUpperwear');

class UserProductUpperwearService {
    static async addUserProducts(user_id, product_ids) {
        return new Promise((resolve, reject) => {
            product_ids.forEach(upperwear_id => {
                UserProductUpperwear.create({ user_id, upperwear_id }, (err, result) => {
                    if (err) return reject(err);
                });
            });
            resolve({ message: 'Products added successfully' });
        });
    }

    static getUserProducts(user_id) {
        return new Promise((resolve, reject) => {
            UserProductUpperwear.findByUserId(user_id, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
    
}

module.exports = UserProductUpperwearService;
