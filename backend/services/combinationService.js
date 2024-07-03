const db = require('../db');
const Combination = require('../models/Combination');

class CombinationService {
    static createCombination(combination) {
        return new Promise((resolve, reject) => {
            Combination.create(combination, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static getCombinations(user_id) {
        return new Promise((resolve, reject) => {
            Combination.findByUserId(user_id, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static saveCombination(combination) {
        return new Promise((resolve, reject) => {
            Combination.save(combination, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static getCombinationsWithImages(user_id) {
        return new Promise((resolve, reject) => {
            Combination.findByUserIdWithImages(user_id, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static generateCombinations(user_id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    uw.id AS upperwear_id, uw.image_url AS upperwear_image, uw.color_id AS upperwear_color, uw.season_id AS upperwear_season,
                    lw.id AS lowerwear_id, lw.image_url AS lowerwear_image, lw.color_id AS lowerwear_color, lw.season_id AS lowerwear_season,
                    s.id AS shoes_id, s.image_url AS shoes_image, s.color_id AS shoes_color,
                    ow.id AS outerwear_id, ow.image_url AS outerwear_image, ow.color_id AS outerwear_color, ow.season_id AS outerwear_season
                FROM userproducts_upperwear upw
                JOIN upperwear uw ON upw.upperwear_id = uw.id
                JOIN userproducts_lowerwear ulw ON ulw.user_id = upw.user_id
                JOIN lowerwear lw ON ulw.lowerwear_id = lw.id
                JOIN userproducts_shoes us ON us.user_id = upw.user_id
                JOIN shoes s ON us.shoes_id = s.id
                LEFT JOIN userproducts_outerwear uow ON uow.user_id = upw.user_id
                LEFT JOIN outerwear ow ON uow.outerwear_id = ow.id
                JOIN upperwear_styles uws ON uw.id = uws.upperwear_id
                JOIN lowerwear_styles lws ON lw.id = lws.lowerwear_id
                JOIN shoes_styles ss ON s.id = ss.shoes_id
                WHERE upw.user_id = ?
                  AND NOT EXISTS (
                      SELECT 1
                      FROM colors c1, colors c2
                      WHERE (
                          (c1.color_name = 'Navy' AND c2.color_name = 'Blue') OR
                          (c1.color_name = 'Green' AND c2.color_name = 'Red') OR
                          (c1.color_name = 'Green' AND c2.color_name = 'Orange') OR
                          (c1.color_name = 'Khaki' AND c2.color_name = 'Red')
                      ) AND (
                          (uw.color_id = c1.id AND (lw.color_id = c2.id OR s.color_id = c2.id OR ow.color_id = c2.id)) OR
                          (lw.color_id = c1.id AND (uw.color_id = c2.id OR s.color_id = c2.id OR ow.color_id = c2.id)) OR
                          (s.color_id = c1.id AND (uw.color_id = c2.id OR lw.color_id = c2.id OR ow.color_id = c2.id)) OR
                          (ow.color_id = c1.id AND (uw.color_id = c2.id OR lw.color_id = c2.id OR s.color_id = c2.id))
                      )
                  )
                  AND NOT EXISTS (
                      SELECT 1
                      FROM styles s1, styles s2
                      WHERE (
                          (s1.style_name = 'Stylish' AND s2.style_name = 'Sport') OR
                          (s1.style_name = 'Sport' AND s2.style_name = 'Stylish')
                      ) AND (
                          (uws.style_id = s1.id AND (lws.style_id = s2.id OR ss.style_id = s2.id)) OR
                          (lws.style_id = s1.id AND (uws.style_id = s2.id OR ss.style_id = s2.id)) OR
                          (ss.style_id = s1.id AND (uws.style_id = s2.id OR lws.style_id = s2.id))
                      )
                  )
                ORDER BY RAND()
                LIMIT 100
            `;

            db.query(sql, [user_id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
}

module.exports = CombinationService;






