//controller/userController.js
const UserService = require('../services/userService');
const jwt = require('jsonwebtoken');//

exports.register = async (req, res) => {
    try {
        const result = await UserService.register(req.body);
        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const token = await UserService.login(req.body.email, req.body.password);
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

exports.update = async (req, res) => {
    try {
        const result = await UserService.update(req.params.id, req.body);
        res.json({ message: 'User updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await UserService.delete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.log('Authorization header is missing'); 
            return res.status(401).json({ error: 'Authorization header is missing' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            console.log('Token is missing');  
            return res.status(401).json({ error: 'Token is missing' });
        }

        const decoded = jwt.verify(token, 'secret');
        if (!decoded || !decoded.id) {
            console.log('Invalid token');  
            return res.status(401).json({ error: 'Invalid token' });
        }

        const userId = decoded.id;
        console.log('Decoded ID:', userId);  

        const user = await UserService.getUserProfile(userId);
        if (!user) {
            console.log('User not found');  
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('User profile:', user);  
        res.json(user);
    } catch (err) {
        console.error('Error:', err);  
        res.status(500).json({ error: err.message });
    }
};
