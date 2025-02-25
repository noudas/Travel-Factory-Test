const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateToken, clearTokenCookie } = require('../utils/auth');

class UserController {
    async createUser(req, res) {
        try {
            const { username, password, role } = req.body;

            // Input validation
            if (!username || !password || !role) {
                return res.status(400).json({ error: 'Username, password, and role are required' });
            }

            const existingUser = await User.findByUsername(req.sql, username);
            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }

            // Hash the password before saving
            const passwordHash = await bcrypt.hash(password, 10);
            const user = await User.createUser(req.sql, username, passwordHash, role);

            return res.status(201).json({
                message: 'User created successfully',
                data: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            });
        } catch (error) {
            return res.status(500).json({
                error: 'Failed to create user',
                details: error.message
            });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: 'Username and password are required' });
            }

            const user = await User.findByUsername(req.sql, username);
            if (!user) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            const isValidPassword = await bcrypt.compare(password, user.passwordHash);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            const token = generateToken(user);
            return res.status(200).json({
                message: 'Logged in successfully',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            });
        } catch (error) {
            return res.status(500).json({
                error: 'Failed to log in',
                details: error.message
            });
        }
    }

    async logout(req, res) {
        try {
            clearTokenCookie(res);

            return res.status(200).json({
                message: 'Logged out successfully',
                data: null
            });
        } catch (error) {
            return res.status(500).json({
                error: 'Failed to log out',
                details: error.message
            });
        }
    }

    async getProfile(req, res) {
        try {
            const user = await User.findByUsername(req.sql, req.user.username);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({
                id: user.id,
                username: user.username,
                role: user.role
            });
        } catch (error) {
            res.status(500).json({
                error: 'Failed to retrieve profile',
                details: error.message
            });
        }
    }
}

module.exports = UserController;
