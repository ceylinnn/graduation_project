const OuterwearService = require('../services/OuterwearService');

exports.getAllOuterwear = async (req, res) => {
    try {
        const outerwear = await OuterwearService.getAllOuterwear();
        res.json(outerwear);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.filterOuterwearByCategories = async (req, res) => {
    try {
        const { categories_id } = req.query;
        if (!categories_id) {
            return res.status(400).json({ error: 'categories_id is required' });
        }
        const outerwear = await OuterwearService.filterOuterwearByCategories(categories_id);
        res.json(outerwear);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
