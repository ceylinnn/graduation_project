// services/UpperwearService.js
const Upperwear = require('../models/Upperwear');

class UpperwearService {
    static async getAllUpperwear() {
        return new Promise((resolve, reject) => {
            Upperwear.getAll((err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static async getUpperwearById(id) {
        return new Promise((resolve, reject) => {
            Upperwear.getById(id, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static async addUpperwear(upperwear) {
        return new Promise((resolve, reject) => {
            Upperwear.create(upperwear, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static async filterUpperwearBySleeveLength(sleeve_length_id) {
        return new Promise((resolve, reject) => {
            Upperwear.filterBySleeveLength(sleeve_length_id, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

}

module.exports = UpperwearService;