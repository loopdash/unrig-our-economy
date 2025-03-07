// server/controllers/kroger.js
const axios = require('axios');
const mysql = require('mysql2/promise');
const db = require('../config/db');
const { logError } = require('./errors');

// Get a new Kroger API token
const getKrogerToken = async () => {
    try {

        const response = await axios.post(
            'https://api.kroger.com/v1/connect/oauth2/token',
            'grant_type=client_credentials&scope=product.compact',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${process.env.KROGER_BASE_CODE}`,
                },
            }
        );

        const newToken = response.data.access_token;
        process.env.KROGER_API_TOKEN = newToken;
        console.log('New Kroger API Token acquired!');
        return newToken;
    } catch (error) {
        console.error('Failed to get Kroger API Token:', error.response?.data || error.message);
        await logError(error.message, error.stack, 'getKrogerToken');
        throw error;
    }
};
let lastUsedLocations = {}; // Track last-used locations per state

// Function to get a rotated set of locations (one per state)
async function getLocationsByState(db) {
    const [states] = await db.query('SELECT DISTINCT state FROM kroger_locations');
    const locations = [];

    for (const state of states) {
        const lastUsed = lastUsedLocations[state.state] || 0;

        const [location] = await db.query(
            `SELECT location_id, name, city, state 
             FROM kroger_locations 
             WHERE state = ? AND location_id > ? 
             ORDER BY location_id ASC 
             LIMIT 1`, 
            [state.state, lastUsed]
        );

        if (location.length > 0) {
            locations.push(location[0]);
            lastUsedLocations[state.state] = location[0].location_id; // Update last-used location
        } else {
            lastUsedLocations[state.state] = 0; // Reset state rotation
        }
    }

    return locations;
}

// Fetch and save Kroger product data with state rotation
const fetchKrogerData = async () => {
    const token = await getKrogerToken(); // Ensure fresh token
    try {
        const locations = await getLocationsByState(db); // Pull rotated locations
        const [products] = await db.query('SELECT name, kroger_id FROM kroger_products');

        for (const location of locations) {
            for (const product of products) {
                const url = `https://api.kroger.com/v1/products?filter.productId=${product.kroger_id}&filter.locationId=${location.location_id}`;

                try {
                    const response = await axios.get(url, {
                        headers: {
                            Accept: 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    });

                    const item = response.data.data?.[0];

                    if (!item) {
                        console.log(`⚠️ No data found for ${product.name} at ${location.city}, ${location.state}. Skipping...`);
                        continue; // Skip to the next product
                    }
// after 500 axios reuqests, pause for a little, get a fresh token, try again
                    
                    const productName = item.description || product.name;
                    const productLink = `https://www.kroger.com${item.productPageURI}`;
                    const productPrice = item.items?.[0]?.price?.regular || 0;

                    if (productPrice > 0) {
                        await db.query(
                            `INSERT INTO product_scraping 
                             (product_name, product_link, product_location_id, origin_product_id, product_price, product_source)
                             VALUES (?, ?, ?, ?, ?, ?)`,
                            [productName, productLink, location.location_id, product.kroger_id, productPrice, 'Kroger']
                        );
    
                        console.log(`✅ Saved: ${productName} - $${productPrice} for ${location.city}, ${location.state}`);
                    } else {
                        console.log(`❌ Skipped: ${productName} - $${productPrice} for ${location.city}, ${location.state} - Price is $0`);
                    }
                } catch (error) {
                    console.error(`⚠️ Error fetching ${product.name} at ${location.name}:`, error.response?.data || error.message);
                    await logError(error.message, error.stack, 'fetchKrogerData');
                }
            }
        }
    } catch (error) {
        console.error('Failed to fetch Kroger data:', error.message);
    }
};
const fetchKrogerProductData = async () => {
    try {
        const [results] = await db.query(`SELECT * FROM kroger_products`);
        console.log('Kroger products fetched successfully:', results);
        return results;
    } catch (error) {
        console.error('Failed to fetch Kroger data:', error.message);
        await logError(error.message, error.stack, 'fetchKrogerProductData');
        throw error;
    }
};


// Export functions
module.exports = { fetchKrogerData, fetchKrogerProductData, getKrogerToken };
