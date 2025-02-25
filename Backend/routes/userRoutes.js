// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticateToken } = require('../utils/auth');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserController.login(req.sql, username, password);
        const token = generateToken(user);
        res.json({ token, user });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

router.post('/logout', authenticateToken, async (req, res) => {
    try {
        // Clear the JWT cookie
        res.clearCookie('jwt');
        
        // Return success response
        res.status(200).json({ 
            message: 'Logged out successfully',
            data: null 
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to log out',
            details: error.message 
        });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = await UserController.createUser(req.sql, username, password, role);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await UserController.getProfile(req.sql, req.user.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;