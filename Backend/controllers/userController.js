// src/controllers/UserController.js
class UserController {
    static async createUser(req, res) {
        try {
            const { username, passwordHash, role } = req.body;
            
            // Input validation
            if (!username || !passwordHash || !role) {
                return res.status(400).json({
                    error: 'Username, password hash, and role are required'
                });
            }

            const user = await User.createUser(req.sql, username, passwordHash, role);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;