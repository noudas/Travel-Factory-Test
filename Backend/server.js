// server.js
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { initializeDatabase } = require('./utils/db-init');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

// Attach SQL client to request object
app.use(async (req, res, next) => {
    req.sql = await neon(process.env.DATABASE_URL);
    next();
});

// Authentication middleware
app.use('/api/v1/*', require('./utils/auth').authenticateToken);

// Routes
app.use('/api/v1', routes);

async function startServer() {
    try {
        await initializeDatabase();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

startServer();