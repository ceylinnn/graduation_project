const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', userProfileController.createProfile);
router.get('/:userId', userProfileController.getProfile);
router.put('/update/:userId', userProfileController.updateProfile);
router.post('/saveSurveyResults', authMiddleware, userProfileController.saveSurveyResults);

module.exports = router;


