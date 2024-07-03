// controllers/UserProductShoesController.js
const UserProductShoesService = require('../services/UserProductShoesService');

exports.addUserProducts = async (req, res) => {
    try {
        const user_id = req.user.id; 
        const { product_ids } = req.body;

        if (!product_ids || product_ids.length === 0) {
            return res.status(400).json({ error: 'Product IDs are required' });
        }

        const result = await UserProductShoesService.addUserProducts(user_id, product_ids);
        res.json(result);
    } catch (err) {
        console.error('Error adding user products:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.getUserProducts = async (req, res) => {
    try {
        const user_id = req.user.id; 
        const products = await UserProductShoesService.getUserProducts(user_id);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
