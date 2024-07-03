//services/userService.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
        static async register(user) {
            const { username, email, password } = user;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = { username, email, password: hashedPassword };
            return new Promise((resolve, reject) => {
                User.create(newUser, (err, result) => {
                    if (err) return reject(err);
    
                    User.findByEmail(email, (err, users) => {
                        if (err || users.length === 0) return reject('User not found after creation');
    
                        const createdUser = users[0];
                        const token = jwt.sign({ id: createdUser.id }, 'secret', { expiresIn: '1h' });
                        resolve({ message: 'User registered', token });
                    });
                });
            });
        }
        
        static async login(email, password) {
            return new Promise((resolve, reject) => {
                User.findByEmail(email, async (err, results) => {
                    if (err) {
                        console.error('Database error:', err);
                        return reject(err);
                    }
                    if (results.length === 0) {
                        console.error('User not found');
                        return reject('User not found');
                    }
                    const user = results[0];
                    console.log('User found:', user); 
                    const isMatch = await bcrypt.compare(password, user.password);
                    console.log('Password match:', isMatch); 
                    if (isMatch) {
                        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
                        resolve(token);
                    } else {
                        console.error('Invalid password');
                        reject('Invalid password');
                    }
                });
            });
        }
        

    static update(id, user) {
        const { username, email, password } = user;
        return new Promise(async (resolve, reject) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const updatedUser = { username, email, password: hashedPassword };
            User.update(id, updatedUser, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            User.delete(id, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static async getUserProfile(id) {
        return new Promise((resolve, reject) => {
            User.findById(id, (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return reject('User not found');
                console.log('User profile found:', results[0]); 
                resolve(results[0]);
            });
        });
    }
}

module.exports = UserService;