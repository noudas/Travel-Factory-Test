const express = require('express');
const router = express.Router();
const VacationController = require('../controllers/VacationController');
const { authenticateToken } = require('../utils/auth');

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { startDate, endDate, reason } = req.body;
        const request = await VacationController.createRequest(
            req.sql,
            req.user.id,
            startDate,
            endDate,
            reason
        );
        res.status(201).json(request);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;