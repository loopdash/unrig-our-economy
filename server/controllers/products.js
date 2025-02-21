const axios = require('axios');
const mysql = require('mysql2/promise');
const db = require('../config/db')
const { logError } = require('./errors');

const getProductScrapeData = async () => {
    try {
        const [results] = await db.query(`SELECT * FROM product_scraping`);
        console.log('Products scrape data fetched successfully:', results);
        return results;
    } catch (error) {
        console.error('⚠️ Failed to fetch Products scrape data:', error.message);
        await logError(error.message, error.stack, 'getProductScrapeData');
        throw error;
    }
};


module.exports = { getProductScrapeData };
