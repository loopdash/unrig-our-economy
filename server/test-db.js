const db = require('./config/db');

(async () => {
    try {
        const [results] = await db.query('SELECT 1+1 AS solution');
        console.log('✅ DB Test Result:', results);
    } catch (err) {
        console.error('❌ DB Test Failed:', err.message);
    } finally {
        process.exit();
    }
})();
