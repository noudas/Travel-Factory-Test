const VacationRequest = require('../models/vacationRequestsModel');
const { validateDates } = require('../utils/validators');

class VacationController {
    static async createRequest(req, res) {
        try {
            const { startDate, endDate, reason } = req.body;
            validateDates(startDate, endDate);

            const request = await VacationRequest.createRequest(req.sql, req.user.id, startDate, endDate, reason);
            res.status(201).json({ message: 'Vacation request submitted successfully', data: request });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllRequests(req, res) {
        try {
            let requests = await VacationRequest.getAllRequests(req.sql);
            res.json(requests);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getRequestById(req, res) {
        try {
            const request = await VacationRequest.getRequestById(req.sql, req.params.id);
            if (!request) return res.status(404).json({ error: 'Request not found' });

            res.json(request);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async approveRequest(req, res) {
        try {
            if (req.user.role !== 'VALIDATOR') return res.status(403).json({ error: 'Forbidden' });

            const request = await VacationRequest.updateStatus(req.sql, req.params.id, 'APPROVED');
            if (!request) return res.status(404).json({ error: 'Request not found' });

            res.json({ message: 'Request approved successfully', data: request });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async rejectRequest(req, res) {
        try {
            if (req.user.role !== 'VALIDATOR') return res.status(403).json({ error: 'Forbidden' });

            const request = await VacationRequest.updateStatus(req.sql, req.params.id, 'REJECTED');
            if (!request) return res.status(404).json({ error: 'Request not found' });

            res.json({ message: 'Request rejected successfully', data: request });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = VacationController;