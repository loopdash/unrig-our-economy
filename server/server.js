require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const { fetchKrogerData } = require('./controllers/kroger');

const app = express();
app.use(cors({ origin: '*' }));  // Allow all origins
app.use(express.json());

// API Endpoint for manual scraping
app.use('/api/kroger', require('./routes/kroger'));
app.use('/api/products', require('./routes/products'));


// Cron job to run daily at 2:00 AM
cron.schedule('0 2 * * *', async () => {
    console.log('🚀 Running daily Kroger product scrape...');
    try {
        await fetchKrogerData();
        console.log('✅ Daily scrape completed.');
    } catch (error) {
        console.error('❌ Daily scrape failed:', error.message);
    }
});

require('dotenv').config();
console.log('🔑 DB_USER:', process.env.DB_USER);


const PORT = 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});

