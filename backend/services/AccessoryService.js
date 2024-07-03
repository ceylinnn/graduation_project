// services/AccessoryService.js
const Accessory = require('../models/Accessory');

class AccessoryService {
    static async getAllAccessory() {
        return new Promise((resolve, reject) => {
            Accessory.getAll((err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static async getAccessoryById(id) {
        return new Promise((resolve, reject) => {
            Accessory.getById(id, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static async addAccessory(accessory) {
        return new Promise((resolve, reject) => {
            Accessory.create(accessory, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static async filterAccessoryByCategories(categories_id) {
        return new Promise((resolve, reject) => {
            Accessory.filterByCategories(categories_id, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

}

module.exports = AccessoryService;