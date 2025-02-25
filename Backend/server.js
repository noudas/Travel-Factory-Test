// src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./utils/db-init');

const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {
    try {
        // Initialize database
        await initializeDatabase();

        // Start server
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