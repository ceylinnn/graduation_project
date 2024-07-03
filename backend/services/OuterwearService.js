// services/OuterwearService.js
const Outerwear = require('../models/Outerwear');

class OuterwearService {
    static async getAllOuterwear() {
        return new Promise((resolve, reject) => {
            Outerwear.getAll((err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static async getOuterwearById(id) {
        return new Promise((resolve, reject) => {
            Outerwear.getById(id, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static async addOuterwear(outerwear) {
        return new Promise((resolve, reject) => {
            Outerwear.create(outerwear, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static async filterOuterwearByCategories(categories_id) {
        return new Promise((resolve, reject) => {
            Outerwear.filterByCategories(categories_id, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

}

module.exports = OuterwearService;