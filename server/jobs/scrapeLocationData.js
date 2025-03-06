const fs = require('fs');
const path = require('path');
const { logError } = require('../controllers/errors');

// Path to the JSON file
const filePath = path.join(__dirname, '../../response-unrig-locations.json');
// Path to save the SQL file
const sqlFilePath = path.join(__dirname, '../../kroger_locations.sql');

const scrapeLocationData = async () => {
    try {
        let sqlStatements = [];
        console.log('📊 Extracting location data from file...');

        // Read and parse the JSON file
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const locations = JSON.parse(rawData).data;

        for (const loc of locations) {
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

            // Format SQL INSERT statement with alias to avoid VALUES() deprecation
            const query = `
                INSERT INTO kroger_locations (location_id, city, state, zipcode, name)
                VALUES ('${locationId}', '${city.replace(/'/g, "''")}', '${state}', '${zip}', '${name.replace(/'/g, "''")}')
                AS new
                ON DUPLICATE KEY UPDATE 
                    city = new.city, 
                    state = new.state, 
                    zipcode = new.zipcode, 
                    name = new.name;
            `;

            // Add to SQL file content
            sqlStatements.push(query);
        }

        // Write to SQL file
        fs.writeFileSync(sqlFilePath, sqlStatements.join('\n'), 'utf-8');
        console.log(`✅ SQL file saved: ${sqlFilePath}`);

    } catch (error) {
        console.error('❌ Error generating SQL file:', error.message);
        await logError(error.message, error.stack, 'scrapeLocationData');
    }
};

// Export function for external use
module.exports = { scrapeLocationData };

// Run script if executed directly
if (require.main === module) {
    scrapeLocationData();
}
