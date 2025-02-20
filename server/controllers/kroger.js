// server/controllers/kroger.js
const axios = require('axios');
const mysql = require('mysql2/promise');
const db = require('../config/db');

// Get a new Kroger API token
const getKrogerToken = async () => {
    try {
        const clientId = process.env.KROGER_CLIENT_ID;
        const clientSecret = process.env.KROGER_CLIENT_SECRET;

        const base64Credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

        const response = await axios.post(
            'https://api.kroger.com/v1/connect/oauth2/token',
            'grant_type=client_credentials&scope=product.compact',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${base64Credentials}`,
                },
            }
        );

        const newToken = response.data.access_token;
        process.env.KROGER_API_TOKEN = newToken;
        console.log('✅ New Kroger API Token acquired!');
        return newToken;
    } catch (error) {
        console.error('❌ Failed to get Kroger API Token:', error.response?.data || error.message);
        throw error;
    }
};

// Fetch and save Kroger product data
const fetchKrogerData = async () => {
    const token = await getKrogerToken();  // Ensure fresh token before scraping

    try {
        const [locations] = await db.query('SELECT location_id, name, city, state FROM kroger_locations');
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

                    if (item) {
                        const productName = item.description || product.name;
                        const productLink = `https://www.kroger.com${item.productPageURI}`;
                        const productPrice = item.items?.[0]?.price?.regular || 0;

                        await db.query(
                            `INSERT INTO product_scraping 
                             (product_name, product_link, product_location_id, origin_product_id, product_price, product_source)
                             VALUES (?, ?, ?, ?, ?, ?)`,
                            [productName, productLink, location.location_id, product.kroger_id, productPrice, 'Kroger']
                        );

                        console.log(`✅ Saved: ${productName} - $${productPrice} for ${location.city}, ${location.state}`);
                    }
                } catch (err) {
                    console.error(`❌ Error fetching ${product.name} at ${location.name}:`, err.response?.data || err.message);
                }
            }
        }
    } catch (error) {
        console.error('⚠️ Failed to fetch Kroger data:', error.message);
    }
};


const fetchKrogerProductData = async () => {
    try {
        const [results] = await db.query(`SELECT * FROM kroger_products`);
        console.log('Kroger products fetched successfully:', results);
        return results;
    } catch (error) {
        console.error('⚠️ Failed to fetch Kroger data:', error.message);
        throw error;
    }
};


module.exports = { fetchKrogerData, fetchKrogerProductData, getKrogerToken };
