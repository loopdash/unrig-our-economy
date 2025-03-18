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

const getFredData = async () => {
    try {
        const [results] = await db.query(`SELECT * FROM fred_data`);
        console.log('Fred Data scrape data fetched successfully:', results);
        return results;
    } catch (error) {
        console.error('⚠️ Failed to fetch Fred Data scrape data:', error.message);
        await logError(error.message, error.stack, 'getFredData');
        throw error;
    }
};

const getProductAveragesData = async () => {
    try {
        const query = `
            SELECT 
                CAST(recorded_at AS DATE) AS record_day, 
                state, 
                product_category, 
                AVG(avg_price) AS average_price
            FROM state_product_averages
            WHERE recorded_at IS NOT NULL
            GROUP BY record_day, state, product_category
            ORDER BY record_day ASC, state, product_category;
        `;

        const [results] = await db.query(query);
        console.log('✅ Product Averages Data:', results);
        return results;
    } catch (error) {
        console.error('⚠️ Failed to fetch Product Averages data:', error.message);
        await logError(error.message, error.stack, 'getProductAveragesData');
        throw error;
    }
};

// FRED API series IDs and categories

/**
 * Get the latest stored date for a given category in the database.
 */
async function getLatestDate(category) {
    try {
        const [rows] = await db.query(
            "SELECT MAX(date) AS latest_date FROM fred_data WHERE category = ?",
            [category]
        );
        return rows[0].latest_date || "2000-01-01"; // Default to an old date if no data exists
    } catch (error) {
        console.error(`❌ Error fetching latest date for ${category}:`, error.message);
        throw error;
    }
}

/**
 * Fetches price data from the FRED API for a given series and category.
 */
async function getPrices(seriesID, category) {
    try {
        const API_KEY = "08b47ceb3cb0ccb30ce164d11c0603c6";
        const BASE_URL = 'https://api.stlouisfed.org/fred/series/observations';

        const latestDate = await getLatestDate(category);
        console.log(`🔎 Last stored date for ${category}: ${latestDate}`);

        const response = await axios.get(BASE_URL, {
            params: {
                series_id: seriesID,
                api_key: API_KEY,
                file_type: "json",
            },
        });

        const observations = response.data.observations || [];

        // Filter new data only (dates after the latest stored date)
        const newEntries = observations
            .filter(obs => obs.value !== "." && obs.date > latestDate)
            .map(obs => ({
                date: obs.date,
                price: parseFloat(obs.value),
                category: category,
            }));

        console.log(`📊 New data for ${category}: ${newEntries.length} entries`);
        return newEntries;
    } catch (error) {
        console.error(`❌ Error fetching data for ${category}:`, error.message);
        return [];
    }
}

/**
 * Inserts new FRED data into the database.
 */
async function insertFredData(data) {
    if (data.length === 0) {
        console.log("⚠️ No new data to insert.");
        return;
    }

    try {
        const sql = `
            INSERT INTO fred_data (date, price, category)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE price = VALUES(price);
        `;

        const insertPromises = data.map(entry =>
            db.query(sql, [entry.date, entry.price, entry.category])
        );

        await Promise.all(insertPromises);
        console.log(`✅ Inserted ${data.length} new entries.`);
    } catch (error) {
        console.error("❌ Error inserting FRED data:", error.message);
        await logError(error.message, error.stack, 'insertFredData');
    }
}

/**
 * Main function to scrape FRED data and update the database.
 */
const scrapeFredDataMonthly = async () => {
    console.log("🔗 Starting FRED data scraping...");

    // FRED Series IDs and Categories
    const series = [
        { id: 'APU0000708111', category: 'egg' },
        { id: 'APU0000703112', category: 'beef' },
        { id: 'APU0000709112', category: 'milk' },
        { id: 'APU0000702111', category: 'bread' },
        { id: 'APU0000717311', category: 'coffee' }
    ];

    try {
        for (const { id, category } of series) {
            const newData = await getPrices(id, category);
            await insertFredData(newData);
        }
        console.log("✅ FRED Data Scrape Completed.");
    } catch (error) {
        console.error("🚨 Failed to scrape FRED data:", error.message);
    }
};

// Run script if executed directly
if (require.main === module) {
    scrapeFredDataMonthly()
        .then(() => console.log("✅ Finished executing FRED data scraper."))
        .catch(err => console.error("🚨 Scrape Failed:", err));
}
module.exports = { getProductScrapeData, getProductAveragesData, getFredData, scrapeFredDataMonthly };
