const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Get all error logs
router.get('/', async (req, res) => {
    try {
        console.log('Hitting get errors ')
        const [errors] = await db.query('SELECT * FROM error_logs ORDER BY occurred_at DESC');
        res.json(errors);  // Return only the rows, not the metadata
    } catch (error) {
        console.error('❌ Failed to fetch error logs:', error.message);
        res.status(500).json({ message: 'Failed to fetch error logs', error: error.message });
    }
});

module.exports = router;
