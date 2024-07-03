const AccessoryService = require('../services/AccessoryService');

exports.getAllAccessory = async (req, res) => {
    try {
        const accessory = await AccessoryService.getAllAccessory();
        res.json(accessory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.filterAccessoryByCategories = async (req, res) => {
    try {
        const { categories_id } = req.query;
        if (!categories_id) {
            return res.status(400).json({ error: 'categories_id is required' });
        }
        const accessory = await AccessoryService.filterAccessoryByCategories(categories_id);
        res.json(accessory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
