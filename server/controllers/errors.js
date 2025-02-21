const axios = require('axios');
const mysql = require('mysql2/promise');
const db = require('../config/db');

// Log error to the database
const logError = async (message, stack, location) => {
    try {
        await db.query(
            `INSERT INTO error_logs (error_message, error_stack, location) VALUES (?, ?, ?)`,
            [message, stack || 'N/A', location]
        );
        console.log(`📜 Logged error from ${location}`);
    } catch (logErr) {
        console.error(`🚫 Failed to log error: ${logErr.message}`);
    }
};

module.exports = { logError };