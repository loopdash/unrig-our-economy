const fs = require('fs');
const path = require('path');
const db = require('../config/db'); // Ensure this points to your database connection
const { logError } = require('../controllers/errors');

// Path to the JSON file
const filePath = path.join(__dirname, '../../response-unrig-locations.json');

const scrapeLocationData = async () => {
    try {
        console.log('📊 Extracting location data from file...');

        // Read and parse the JSON file
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const locations = JSON.parse(rawData).data;

        // Prepare the SQL insert statement
        const query = `
            INSERT INTO kroger_locations (location_id, city, state, zip_code, name)
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE city = VALUES(city), state = VALUES(state), zip_code = VALUES(zip_code), name = VALUES(name);
        `;

        for (const loc of locations) {
            // Extract values
            const locationId = loc.locationId;
            const city = loc.address.city;
            const state = loc.address.state;
            const zip = loc.address.zipCode;
            const name = `${city}, ${state}`;

            // Skip if locationId is missing
            if (!locationId) {
                console.log(`⚠️ Skipping entry due to missing locationId: ${city}, ${state}`);
                continue;
            }

            // Execute insert query
            await db.query(query, [locationId, city, state, zip, name]);
            console.log(`✅ Inserted: ${city}, ${state} (ID: ${locationId})`);
        }

        console.log('✅ Location data updated successfully.');
    } catch (error) {
        console.error('❌ Error updating location data:', error.message);
        await logError(error.message, error.stack, 'scrapeLocationData');
    }
};

// Export function for external use
module.exports = { scrapeLocationData };

// Run script if executed directly
if (require.main === module) {
    scrapeLocationData();
}
