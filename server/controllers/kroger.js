// server/controllers/kroger.js
const axios = require('axios');
const mysql = require('mysql2/promise');
const db = require('../config/db')


// Fetch and save Kroger product data
const fetchKrogerData = async () => {
    try {
        // Get locations and products from DB
        const [locations] = await db.query('SELECT location_id, name, city, state FROM kroger_locations');
        const [products] = await db.query('SELECT name, kroger_id FROM kroger_products');

        for (const location of locations) {
            for (const product of products) {
                const url = `https://api.kroger.com/v1/products?filter.productId=${product.kroger_id}&filter.locationId=${location.location_id}`;

                try {
                    const response = await axios.get(url, {
                        headers: {
                            Accept: 'application/json',
                            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ1bnJpZy1wcm9kZW52LTI0MzI2MTI0MzAzNDI0NTA3MTZlNGQ0ZTY3NmY3NzMyNDg0ZDZiNDc2ZTQzNTI3MjYyNjM3YTZkNGY0NjM3NjM3MDRjNDk0YTU1NzE0ZTc0NDc2NzM1NmY2ODRhNWE2ZjczNGM2ZTc2NzE0NjUzMmUzNjYyNTE0NzI0NjgwMDcwMDg3MTY5MjY2IiwiZXhwIjoxNzM5OTkyMDAzLCJpYXQiOjE3Mzk5OTAxOTgsImlzcyI6ImFwaS5rcm9nZXIuY29tIiwic3ViIjoiMWZmZWY1ZGYtMjE0Yy01ODViLTkxNmQtMjZkMTQyNWJlNWE3Iiwic2NvcGUiOiJwcm9kdWN0LmNvbXBhY3QiLCJhdXRoQXQiOjE3Mzk5OTAyMDM2NDU0NjU1NjcsImF6cCI6InVucmlnLXByb2RlbnYtMjQzMjYxMjQzMDM0MjQ1MDcxNmU0ZDRlNjc2Zjc3MzI0ODRkNmI0NzZlNDM1MjcyNjI2MzdhNmQ0ZjQ2Mzc2MzcwNGM0OTRhNTU3MTRlNzQ0NzY3MzU2ZjY4NGE1YTZmNzM0YzZlNzY3MTQ2NTMyZTM2NjI1MTQ3MjQ2ODAwNzAwODcxNjkyNjYifQ.VilLoWnOC3ELD-gnls-KwdM31DOlEC0iVGX8S69Ql6BDywpDnbq0N21tVwAg37E54_zR5ZsM9ycCUVownFJmR-FTVqZhIe3dpTdaXYzKeuUgymg0-Mt89lA_PWCZaXZDA0Ceapu-_AoWEplWEK_fMsJ5L8MF1i1jzWIOrfVNLXg7xEgMHojxF4CnNVNpk0L1CM11OzgishfeSTZG6DRw-rNEZY3JuvzGes3OKqZVoc2UdTnbrCNjYDltQ4D9PMv4hD83H664Ri9nxxS2NS2lYIutfU6As8Wujt6zXNZuKf0U6ckhbg27w0eRmZa_WcIsCDSA4vvoiWoDhjnJoK9wfA`
                        }
                    });

                    const item = response.data.data?.[0];

                    if (item) {
                        const productName = item.description || product.name;
                        const productLink = `https://www.kroger.com${item.productPageURI}`;
                        const productPrice = item.items?.[0]?.price?.regular || 0;

                        // Insert into product_scraping table
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


module.exports = { fetchKrogerData, fetchKrogerProductData };
