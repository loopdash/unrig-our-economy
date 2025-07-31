// server/routes/kroger.js
const express = require('express');
const { fetchKrogerData, fetchKrogerProductData } = require('../controllers/kroger').default;
const router = express.Router();

// GET /api/kroger/scrape → Manually trigger the scrape
router.get('/scrape', async (req, res) => {
    try {
        console.log('🚀 Running manual Kroger scrape...');
        await fetchKrogerData();
        res.json({ message: '✅ Kroger scrape completed successfully!' });
    } catch (error) {
        console.error('❌ Scrape failed:', error.message);
        res.status(500).json({ message: '❌ Scrape failed', error: error.message });
    }
});

router.get('/products', async (req, res) => {
    try {
        console.log('🚀 Getting Kroger products...');
        const data = await fetchKrogerProductData();
        res.json({ message: '✅ Kroger Product fetch completed successfully!', data: data });
    } catch (error) {
        console.error('❌ Product fetch failed:', error.message);
        res.status(500).json({ message: '❌ Product fetch failed', error: error.message });
    }
});

module.exports = router;
