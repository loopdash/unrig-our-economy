require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const { fetchKrogerData } = require('./controllers/kroger');
const { updateStateAverages } = require('./jobs/updateStateAverages');
const { logError } = require('./controllers/errors');
const { scrapeFredDataMonthly } = require('./controllers/products');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors({ origin: '*' }));  // Allow all origins
app.use(express.json());

// API Endpoint for manual scraping
app.use('/api/kroger', require('./routes/kroger'));
app.use('/api/products', require('./routes/products'));
app.use('/api/errors', require('./routes/errors'));

// Cron job to run daily at 2:00 AM
// cron.schedule('0 2 * * *', async () => {
//     console.log('🚀 Running daily Kroger product scrape...');
//     try {
//         await fetchKrogerData();
//         console.log('✅ Daily scrape completed.');
//     } catch (error) {
//         console.error('❌ Daily scrape failed:', error.message);
//         await logError(error.message, error.stack, 'CronJob Product Scrape');

//     }
// });

// // 🕑 **Cron job: Calculate state product averages daily at 3:00 AM**
// cron.schedule('0 3 * * *', async () => {
//     console.log('📊 Running daily state product averages calculation...');
//     try {
//         await updateStateAverages();
//         console.log('✅ State product averages updated.');
//     } catch (error) {
//         console.error('❌ State averages update failed:', error.message);
//         await logError(error.message, error.stack, 'Cron Job State Averages');

//     }
// });

// // 🕑 **Cron job: Scrape Fred Data monthly on the 14th day of the month at 3:00 AM so FRED data has published **
// cron.schedule('0 3 20 * *', async () => {
//     const logPath = path.join(__dirname, 'fred_cron.log');
//     const log = (msg) => fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${msg}\n`);
//     log('📊 Running monthly Scrape Fred Data calculation (2nd day of the month)...');


//     console.log('📊 Running monthly Scrape Fred Data calculation (2nd day of the month)...');
//     try {
//         await scrapeFredDataMonthly();

//         log('✅ Scrape Fred Data Monthly updated.');
//         console.log('✅ Scrape Fred Data Monthly updated.');
//     } catch (error) {
//         log(`❌ Fred monthly update failed: ${error.message}`);
//         console.error('❌ Fred monthly update failed:', error.message);

//         await logError(error.message, error.stack, 'Cron Job Fred Monthly');
//     }
// });
require('dotenv').config();
console.log('🔑 DB_USER:', process.env.DB_USER);


const PORT = 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});

