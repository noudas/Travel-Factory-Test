const express = require('express');
const router = express.Router();
const VacationController = require('../controllers/VacationController');
const { authenticateToken } = require('../utils/auth');



module.exports = router;