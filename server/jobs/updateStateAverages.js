const db = require('../config/db'); // Database connection
const { logError } = require('../controllers/errors');

const updateStateAverages = async () => {
    try {
        console.log('📊 Running state product averages update...');

        const query = `
            INSERT INTO state_product_averages (state, product_category, avg_price, recorded_at)
            SELECT 
                kl.state,
                kp.category AS product_category,
                AVG(ps.product_price) AS avg_price,
                CURRENT_DATE AS recorded_at
            FROM product_scraping ps
            JOIN kroger_locations kl ON ps.product_location_id = kl.location_id
            JOIN kroger_products kp ON ps.origin_product_id = kp.kroger_id
            WHERE kp.category IN ('Milk', 'Bread') -- Change this as needed
            AND DATE(ps.scraped_at) = CURRENT_DATE
            GROUP BY kl.state, kp.category;
        `;

        await db.query(query);
        console.log('✅ State product averages updated successfully.');
    } catch (error) {
        console.error('❌ Error updating state product averages:', error.message);
        await logError(error.message, error.stack, 'updateStateAverages');
    }
};

// Export function for external use
module.exports = { updateStateAverages };
