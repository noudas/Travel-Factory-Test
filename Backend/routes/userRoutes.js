// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticateToken } = require('../utils/auth');

router.post('/login', async (req, res) => {
