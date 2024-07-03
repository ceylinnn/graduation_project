// services/LowerwearService.js
const Lowerwear = require('../models/Lowerwear');

class LowerwearService {
    static async getAllLowerwear() {
        return new Promise((resolve, reject) => {
            Lowerwear.getAll((err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static async getLowerwearById(id) {
        return new Promise((resolve, reject) => {
            Lowerwear.getById(id, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static async addLowerwear(lowerwear) {
        return new Promise((resolve, reject) => {
            Lowerwear.create(lowerwear, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static async filterLowerwearByCategories(categories_id) {
        return new Promise((resolve, reject) => {
            Lowerwear.filterByCategories(categories_id, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
}

module.exports = LowerwearService;