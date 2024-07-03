const CombinationService = require('../services/combinationService');
const SurveyService = require('../services/surveyService');

exports.createCombination = async (req, res) => {
    try {
        const result = await CombinationService.createCombination(req.body);
        res.status(201).json({ message: 'Combination created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCombinations = async (req, res) => {
    try {
        console.log("Fetching combinations for user:", req.params.userId);
        const combinations = await CombinationService.getCombinations(req.params.userId);
        console.log("Fetched combinations:", combinations);
        res.json(combinations);
    } catch (err) {
        console.error("Error fetching combinations:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.getCombinationsWithImages = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("Fetching combinations with images for user:", userId);
        const combinations = await CombinationService.getCombinationsWithImages(userId);
        console.log("Fetched combinations with images:", combinations);
        res.json(combinations);
    } catch (err) {
        console.error("Error fetching combinations with images:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.generateCombinations = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("Generating combinations for user:", userId);
        
        const userAnswers = await SurveyService.getSurveyResults(userId);
        const { selected_style, selected_color_palette } = userAnswers[0];
        console.log("User survey results:", userAnswers);

        const combinations = await CombinationService.generateCombinations(userId, selected_style, selected_color_palette);
        console.log("Generated combinations:", combinations);

        res.json(combinations);
    } catch (err) {
        console.error("Error generating combinations:", err);
        res.status(500).json({ error: err.message });
    }
};



exports.saveCombination = async (req, res) => {
    try {
        const combinations = req.body.combinations;
        const userId = req.body.user_id;

        // Kombinasyonları kaydetme
        for (let combination of combinations) {
            combination.user_id = userId;
            await CombinationService.saveCombination(combination);
        }

        res.status(201).json({ message: 'Combinations saved' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



