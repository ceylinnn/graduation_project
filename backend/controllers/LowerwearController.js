// controllers/LowerwearController.js
const LowerwearService = require('../services/LowerwearService');

exports.getAllLowerwear = async (req, res) => {
    try {
        const lowerwears = await LowerwearService.getAllLowerwear();
        res.json(lowerwears);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addDummyLowerwears = async (req, res) => {
    try {
        const dummyLowerwears = [
            {
                name: 'jean',
                brand: 'Nike',
                color_id: 1,
                length_id: 3,
                image_url: 'https://example.com/jean.jpg'
            },
            {
                name: 'etek',
                brand: 'Adidas',
                color_id: 2,
                length_id: 2,
                image_url: 'https://example.com/etek.jpg'
            }
        ];

        // Loop through dummyUpperwears and add each to the database
        for (let lowerwear of dummyLowerwears) {
            await LowerwearService.addLowerwear(lowerwear);
        }

        res.json({ message: 'Dummy lowerwears added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.filterLowerwearByCategories = async (req, res) => {
    try {
        const { categories_id } = req.query;
        if (!categories_id) {
            return res.status(400).json({ error: 'categories_id is required' });
        }
        const lowerwear = await LowerwearService.filterLowerwearByCategories(categories_id);
        res.json(lowerwear);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};