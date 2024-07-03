const ShoesService = require('../services/ShoesService');

exports.getAllShoes = async (req, res) => {
    try {
        const shoes = await ShoesService.getAllShoes();
        res.json(shoes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.filterShoesByCategories = async (req, res) => {
    try {
        const { categories_id } = req.query;
        if (!categories_id) {
            return res.status(400).json({ error: 'categories_id is required' });
        }
        const shoes = await ShoesService.filterShoesByCategories(categories_id);
        res.json(shoes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
