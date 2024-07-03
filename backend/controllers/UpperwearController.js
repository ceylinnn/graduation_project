const UpperwearService = require('../services/UpperwearService');

exports.getAllUpperwear = async (req, res) => {
    try {
        const upperwears = await UpperwearService.getAllUpperwear();
        res.json(upperwears);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getUpperwearById = async (req, res) => {
    try {
        const { id } = req.params;
        const upperwear = await UpperwearService.getUpperwearById(id);
        if (!upperwear) {
            return res.status(404).json({ error: 'Upperwear not found' });
        }
        res.json(upperwear);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.addDummyUpperwears = async (req, res) => {
    try {
        const dummyUpperwears = [
            {
                name: 'T-shirt',
                brand: 'Nike',
                color_id: 1,
                sleeve_length_id: 2,
                length_id: 3,
                image_url: 'https://example.com/t-shirt.jpg'
            },
            {
                name: 'Hoodie',
                brand: 'Adidas',
                color_id: 2,
                sleeve_length_id: 1,
                length_id: 2,
                image_url: 'https://example.com/hoodie.jpg'
            }
        ];

        // Loop through dummyUpperwears and add each to the database
        for (let upperwear of dummyUpperwears) {
            await UpperwearService.addUpperwear(upperwear);
        }

        res.json({ message: 'Dummy upperwears added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.filterUpperwearBySleeveLength = async (req, res) => {
    try {
        const { sleeve_length_id } = req.query;
        if (!sleeve_length_id) {
            return res.status(400).json({ error: 'sleeve_length_id is required' });
        }
        const upperwears = await UpperwearService.filterUpperwearBySleeveLength(sleeve_length_id);
        res.json(upperwears);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

