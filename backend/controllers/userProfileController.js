const UserProfileService = require('../services/userProfileService');

exports.createProfile = async (req, res) => {
    try {
        const result = await UserProfileService.createProfile(req.body);
        res.status(201).json({ message: 'Profile created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const profile = await UserProfileService.getProfile(req.params.userId);
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const result = await UserProfileService.updateProfile(req.params.userId, req.body);
        res.json({ message: 'Profile updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.saveSurveyResults = async (req, res) => {
    try {
        const { selectedImages } = req.body;
        const userId = req.user.id; 

        console.log("User ıd:", userId);//
        console.log("Selected Images:", selectedImages);//

        const result = await UserProfileService.saveSurveyResults(userId, selectedImages);
        console.log("Save Survey Results Result:", result);

        res.json({ message: 'Survey results saved successfully' });
    } catch (err) {
        console.error('Error saving survey results:', err);
        res.status(500).json({ error: /*err.message*/ 'Failed to save survey results' });
    }
};

