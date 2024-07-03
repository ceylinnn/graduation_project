//controllers/surveyController.js
const SurveyService = require('../services/surveyService'); // Dosya yolu düzeltilmiş

exports.getSurveyQuestions = async (req, res) => {
    try {
        const questions = await SurveyService.getSurveyQuestions();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.submitSurvey = async (req, res) => {
    try {
        const userId = req.user.id; // Ensure this is set correctly based on your authentication method
        const selectedImages = req.body.selectedImages;

        for (const selectedImage of selectedImages) {
            const survey = {
                user_id: userId,
                question_id: selectedImage.question_id,
                image_url: selectedImage.image_url,
                selected_style: selectedImage.style,
                selected_color_palette: selectedImage.color_palette,
            };
            await SurveyService.submitSurvey(survey);
        }

        res.status(201).json({ message: 'Survey submitted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSurveyResults = async (req, res) => {
    try {
        const results = await SurveyService.getSurveyResults(req.params.userId);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
