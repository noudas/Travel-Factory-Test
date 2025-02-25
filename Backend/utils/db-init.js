// src/utils/db-init.js
const { neon } = require('@neondatabase/serverless');

async function initializeDatabase() {
    try {
        const sql = neon(process.env.DATABASE_URL);
        
        // Create users table
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                role VARCHAR(50) CHECK (role IN ('REQUESTER', 'VALIDATOR')),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        // Create vacation requests table
        await sql`
            CREATE TABLE IF NOT EXISTS vacation_requests (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                start_date DATE NOT NULL,
                end_date DATE NOT NULL,
                reason TEXT,
                status VARCHAR(50) CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
                comments TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT valid_dates CHECK (start_date < end_date),
                CONSTRAINT future_dates CHECK (start_date >= CURRENT_DATE)
            )
        `;

        console.log('Database tables created successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

module.exports = { initializeDatabase };