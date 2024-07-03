const UserProfile = require('../models/UserProfile');

class UserProfileService {
    static createProfile(profile) {
        return new Promise((resolve, reject) => {
            UserProfile.create(profile, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static getProfile(user_id) {
        return new Promise((resolve, reject) => {
            UserProfile.findByUserId(user_id, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static updateProfile(user_id, profile) {
        return new Promise((resolve, reject) => {
            UserProfile.update(user_id, profile, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static async saveSurveyResults(user_id, selectedImages) {
        const image_url = selectedImages.map(image => image.image_url).join(',');
        const preferred_styles = selectedImages.map(image => image.style).join(',');
        const preferred_color_palettes = selectedImages.map(image => image.color_palette).join(',');

        console.log("Updating user profile with the following data:");
        console.log("User ID:", user_id);
        console.log("Preferred Styles:", preferred_styles);
        console.log("Preferred Color Palettes:", preferred_color_palettes);

        return new Promise((resolve, reject) => {
            UserProfile.update(user_id, { image_url, preferred_styles, preferred_color_palettes }, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = UserProfileService;

