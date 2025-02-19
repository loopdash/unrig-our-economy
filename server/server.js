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
    await fetchKrogerData();
    console.log('✅ Daily scrape completed.');
});

require('dotenv').config();
console.log('🔑 DB_USER:', process.env.DB_USER);


app.listen(5001, () => console.log('🚀 Server running on port 5001'));
