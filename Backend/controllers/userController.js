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

            const existingUser = await User.findByUsername(req.sql, username);
            if (existingUser) {
                return res.status(400).json({
                    error: 'Username already exists'
                });
            }

            const user = await User.createUser(req.sql, username, passwordHash, role);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async logout(req, res) {
        try {
            // Clear the JWT cookie
            clearTokenCookie(res);
            
            // Return success response
            res.status(200).json({ 
                message: 'Logged out successfully',
                data: null 
            });
        } catch (error) {
            res.status(500).json({ 
                error: 'Failed to log out',
                details: error.message 
            });
        }
    }
}

module.exports = UserController;