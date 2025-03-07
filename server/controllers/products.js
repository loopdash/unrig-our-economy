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


const getProductAveragesData = async () => {
    try {
        const query = `
            SELECT 
                state, 
                product_category, 
                AVG(avg_price) AS average_price
            FROM state_product_averages
            GROUP BY state, product_category
            ORDER BY state, product_category;
        `;

        const [results] = await db.query(query);
        console.log('✅ Product Averages Data (Grouped by State & Category):', results);
        return results;
    } catch (error) {
        console.error('⚠️ Failed to fetch Product Averages data:', error.message);
        await logError(error.message, error.stack, 'getProductAveragesData');
        throw error;
    }
};


module.exports = { getProductScrapeData, getProductAveragesData };
