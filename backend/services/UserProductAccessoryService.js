// services/UserProductAccessoryService.js
const UserProductAccessory = require('../models/UserProductAccessory');

class UserProductAccessoryService {
    static async addUserProducts(user_id, product_ids) {
        const savedProducts = await this.getUserProducts(user_id);
        const savedProductIds = savedProducts.map(product => product.accessory_id);

        const newProductIds = product_ids.filter(product_id => !savedProductIds.includes(product_id));

        return new Promise((resolve, reject) => {
            if (newProductIds.length > 0) {
                const promises = newProductIds.map(accessory_id => {
                    return new Promise((resolve, reject) => {
                        UserProductAccessory.create({ user_id, accessory_id }, (err, result) => {
                            if (err) return reject(err);
                            resolve(result);
                        });
                    });
                });

                Promise.all(promises)
                    .then(results => resolve({ message: 'Products added successfully' }))
                    .catch(err => reject(err));
            } else {
                resolve({ message: 'All selected products are already saved.' });
            }
        });
    }

    static getUserProducts(user_id) {
        return new Promise((resolve, reject) => {
            UserProductAccessory.findByUserId(user_id, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
}

module.exports = UserProductAccessoryService;