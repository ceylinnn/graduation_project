//services/userProductService.js
const UserProduct = require('../models/UserProduct');

class UserProductService {
    static addProduct(product) {
        return new Promise((resolve, reject) => {
            UserProduct.create(product, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static getUserProducts(user_id) {
        return new Promise((resolve, reject) => {
            UserProduct.findByUserId(user_id, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
}

module.exports = UserProductService;
