const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: '159.89.39.181',
    user: 'reactuser',   // <-- Hardcoded for testing
    password: 'ReactUser@1234',  // <-- Hardcoded for testing
    database: 'unrigDatabase',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection()
    .then(() => console.log('✅ Connected to MySQL Database'))
    .catch(err => console.error('❌ Database connection failed:', err.message));

module.exports = db;
