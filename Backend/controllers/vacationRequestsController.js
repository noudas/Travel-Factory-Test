// src/controllers/VacationController.js
class VacationController {
    static async createRequest(req, res) {
        try {
            const { startDate, endDate, reason } = req.body;

            // Validate dates
            if (!startDate || !endDate) {
                return res.status(400).json({
                    error: 'Start date and end date are required'
                });
            }

            const request = await VacationRequest.createRequest(
                req.sql,
                req.user.id,
                startDate,
                endDate,
                reason
            );

            res.status(201).json(request);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllRequests(req, res) {
        try {
            // Filter requests based on user role
            const requests = await VacationRequest.getAllRequests(
                req.sql,
                req.user ? req.user.id : null
            );
            
            // Filter pending requests for validators
            if (req.user && req.user.role === 'VALIDATOR') {
                requests.filter(request => request.status === 'PENDING');
            }

            res.json(requests);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = VacationController;