const express = require('express');
const router = express.Router();
const VacationController = require('../controllers/vacationRequestsController');
const { authenticateToken } = require('../utils/auth');

router.post('/', authenticateToken, VacationController.createRequest);
router.get('/', authenticateToken, VacationController.getAllRequests);
router.get('/user/:id', authenticateToken, VacationController.getRequestsByUserId);
router.get('/:id', authenticateToken, VacationController.getRequestById);
router.put('/:id/approve', authenticateToken, VacationController.approveRequest);
router.put('/:id/reject', authenticateToken, VacationController.rejectRequest);

module.exports = router;
