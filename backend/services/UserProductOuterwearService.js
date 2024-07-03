// services/UserProductOuterwearService.js
const UserProductOuterwear = require('../models/UserProductOuterwear');

class UserProductOuterwearService {
    static async addUserProducts(user_id, product_ids) {
        const savedProducts = await this.getUserProducts(user_id);
        const savedProductIds = savedProducts.map(product => product.outerwear_id);

        const newProductIds = product_ids.filter(product_id => !savedProductIds.includes(product_id));

        return new Promise((resolve, reject) => {
            if (newProductIds.length > 0) {
                newProductIds.forEach(outerwear_id => {
                    UserProductOuterwear.create({ user_id, outerwear_id }, (err, result) => {
                        if (err) return reject(err);
                    });
                });
                resolve({ message: 'Products added successfully' });
            } else {
                resolve({ message: 'All selected products are already saved.' });
            }
        });
    }

    static getUserProducts(user_id) {
        return new Promise((resolve, reject) => {
            UserProductOuterwear.findByUserId(user_id, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
}

module.exports = UserProductOuterwearService;