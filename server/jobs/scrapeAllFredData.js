const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_KEY = "08b47ceb3cb0ccb30ce164d11c0603c6";
const BASE_URL = 'https://api.stlouisfed.org/fred/series/observations';

// Path to save the SQL file
const sqlFilePath = path.join(__dirname, 'fred_sql.sql');


// Array of series IDs and corresponding filenames
// https://fred.stlouisfed.org/series/seriesID
const series = [
  { id: 'APU0000708111', name: 'egg' },      // Eggs
  { id: 'APU0000703112', name: 'beef' },    // Beef
  { id: 'APU0000709112', name: 'milk' },     // Milk
  { id: 'APU0000702111', name: 'bread' },    // Bread
  { id: 'APU0000717311', name: 'coffee' },   // Coffee
];

// Function to fetch and process FRED data
async function getPrices(seriesID, category) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                series_id: seriesID,
                api_key: API_KEY,
                file_type: 'json',
            },
        });

        const observations = response.data.observations;
        console.log(`Fetched data for ${category}:`, observations.length, 'entries');

        // Format data into SQL `INSERT` statements
        const sqlStatements = observations
            .filter(obs => obs.value !== ".") // Remove missing data
            .map(obs => {
                const date = obs.date;
                const price = parseFloat(obs.value);
                return `INSERT INTO fred_data (date, price, category) VALUES ('${date}', ${price}, '${category}');`;
            });

        return sqlStatements;
    } catch (error) {
        console.error(`Error fetching data for ${category}:`, error.message);
        return [];
    }
}

// Main function to fetch data and write to file
async function generateSQLFile() {
    console.log('📊 Fetching FRED data and generating SQL file...');

    let allSQLStatements = [];
    
    for (const item of series) {
        const sqlData = await getPrices(item.id, item.name);
        allSQLStatements.push(...sqlData);
    }

    // Save to SQL file
    fs.writeFileSync(sqlFilePath, allSQLStatements.join('\n'), 'utf-8');
    console.log(`✅ SQL file saved: ${sqlFilePath}`);
}

// Run script
generateSQLFile();
