// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticateToken } = require('../utils/auth');

const userController = new UserController();

router.post('/login', async (req, res) => {
    await userController.login(req, res);
});

router.post('/logout', authenticateToken, async (req, res) => {
    await userController.logout(req, res);
});

router.post('/register', async (req, res) => {
    await userController.createUser(req, res);
});

router.get('/profile', authenticateToken, async (req, res) => {
    await userController.getProfile(req, res);
});

module.exports = router;
