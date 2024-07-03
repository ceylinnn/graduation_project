//controllers/userProductController.js
const UserProductService = require('../services/userProductService');

exports.addProduct = async (req, res) => {
    try {
        const result = await UserProductService.addProduct(req.body);
        res.status(201).json({ message: 'Product added' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserProducts = async (req, res) => {
    try {
        const products = await UserProductService.getUserProducts(req.params.userId);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
