// services/ShoesService.js
const Shoes = require('../models/Shoes');

class ShoesService {
    static async getAllShoes() {
        return new Promise((resolve, reject) => {
            Shoes.getAll((err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static async getShoesById(id) {
        return new Promise((resolve, reject) => {
            Shoes.getById(id, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static async addShoes(shoes) {
        return new Promise((resolve, reject) => {
            Shoes.create(shoes, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static async filterShoesByCategories(categories_id) {
        return new Promise((resolve, reject) => {
            Shoes.filterByCategories(categories_id, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

}

module.exports = ShoesService;