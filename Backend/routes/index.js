// src/routes/index.js
const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const vacationRoutes = require('./vacation.routes');

router.use('/users', userRoutes);
router.use('/vacations', vacationRoutes);

module.exports = router;