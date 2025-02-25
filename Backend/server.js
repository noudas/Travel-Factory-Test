const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { initializeDatabase } = require('./utils/db-init');
const { neon } = require('@neondatabase/serverless');
const routes = require('./routes');

const app = express();

app.use(cors({ origin: '*' })); // Allow all origins
app.use(express.json());

// Attach SQL client globally to avoid reinitialization per request
app.locals.sql = neon(process.env.DATABASE_URL);

app.use((req, res, next) => {
    req.sql = app.locals.sql;
    next();
});

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