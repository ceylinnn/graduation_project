// controllers/UserProductUpperwearController.js
const UserProductUpperwearService = require('../services/UserProductUpperwearService');

exports.addUserProducts = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { product_ids } = req.body;

        if (!product_ids || product_ids.length === 0) {
            return res.status(400).json({ error: 'Product IDs are required' });
        }

        // Check if any of the product_ids already exist for the user
        const existingProducts = await UserProductUpperwearService.getUserProducts(user_id);
        const existingProductIds = existingProducts.map(product => product.upperwear_id);

        const newProductIds = product_ids.filter(productId => !existingProductIds.includes(productId));

        if (newProductIds.length === 0) {
            return res.status(400).json({ error: 'All selected products are already saved.' });
        }

        const result = await UserProductUpperwearService.addUserProducts(user_id, newProductIds);
        res.json({ message: 'Products added successfully' });
    } catch (err) {
        console.error('Error adding user products:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.getUserProducts = async (req, res) => {
    try {
        const user_id = req.user.id; 
        const products = await UserProductUpperwearService.getUserProducts(user_id);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
