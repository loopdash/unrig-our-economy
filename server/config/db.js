const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: '159.89.39.181',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection()
    .then(() => console.log('✅ Connected to MySQL Database'))
    .catch(err => console.error('❌ Database connection failed:', err.message));

module.exports = db;
