//routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/update/:id', userController.update);
router.delete('/delete/:id', userController.delete);
router.get('/', userController.getAllUsers);
router.get('/profile', authMiddleware, userController.getUserProfile); 

module.exports = router;
