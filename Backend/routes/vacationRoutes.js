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

router.get('/', authenticateToken, async (req, res) => {
    try {
        const requests = await VacationController.getAllRequests(
            req.sql,
            req.user.id
        );
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const request = await VacationController.getRequestById(
            req.sql,
            req.params.id,
            req.user.id
        );
        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }
        res.json(request);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id/approve', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'VALIDATOR') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const request = await VacationController.approveRequest(
            req.sql,
            req.params.id
        );
        res.json(request);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id/reject', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'VALIDATOR') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const { comments } = req.body;
        const request = await VacationController.rejectRequest(
            req.sql,
            req.params.id,
            comments
        );
        res.json(request);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;