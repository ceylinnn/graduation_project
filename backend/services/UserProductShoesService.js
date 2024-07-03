// services/UserProductShoesService.js
const UserProductShoes = require('../models/UserProductShoes');

class UserProductShoesService {
    static async addUserProducts(user_id, product_ids) {
        const savedProducts = await this.getUserProducts(user_id);
        const savedProductIds = savedProducts.map(product => product.shoes_id);

        const newProductIds = product_ids.filter(product_id => !savedProductIds.includes(product_id));

        return new Promise((resolve, reject) => {
            if (newProductIds.length > 0) {
                newProductIds.forEach(shoes_id => {
                    UserProductShoes.create({ user_id, shoes_id }, (err, result) => {
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
            UserProductShoes.findByUserId(user_id, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
}

module.exports = UserProductShoesService;