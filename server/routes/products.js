// server/routes/products.js
const express = require('express');
const router = express.Router();
const { getProductScrapeData, getProductAveragesData, getFredData } = require('../controllers/products');

// Ensure route matches frontend request
router.get('/scrapes', async (req, res) => {
    try {
        const data = await getProductScrapeData();
        res.json(data);  // Send JSON array directly
    } catch (error) {
        console.error('Failed to fetch product scraping data:', error.message);
        res.status(500).json({ message: 'Failed to fetch product scraping data', error: error.message });
    }
});

router.get('/fred', async (req, res) => {
    try {
        const data = await getFredData();
        res.json(data);  // Send JSON array directly
        // console.log('FRED data fetched successfully:', data);
    } catch (error) {
        console.error('Failed to fetch fred data:', error.message);
        res.status(500).json({ message: 'Failed to fetch fred data', error: error.message });
    }
});

router.get('/averages', async (req, res) => {
    try {
        const data = await getProductAveragesData();
        res.json(data);  // Send JSON array directly
    } catch (error) {
        console.error('Failed to fetch product scraping data:', error.message);
        res.status(500).json({ message: 'Failed to fetch product scraping data', error: error.message });
    }
});


module.exports = router;
