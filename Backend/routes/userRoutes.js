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

router.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = await UserController.createUser(req.sql, username, password, role);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
