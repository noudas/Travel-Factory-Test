// src/routes/index.js
const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const vacationRoutes = require('./vacationRoutes');

router.use('/users', userRoutes);
router.use('/vacations', vacationRoutes);

module.exports = router;