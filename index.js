// Unrig FRED index.js
const axios = require('axios');
const API_KEY = "08b47ceb3cb0ccb30ce164d11c0603c6";
const BASE_URL = 'https://api.stlouisfed.org/fred/series/observations';

const fs = require('fs');
const path = require('path');

async function getPrices(seriesID, fileName) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                series_id: seriesID,
                api_key: API_KEY,
                file_type: 'json', // Return data in JSON format
            },
        });

        const observations = response.data.observations;
        console.log(`${fileName} Prices Observations:`, observations);

        // Convert observations to CSV format
        const csvData = observations
            .map(obs => `${obs.date},${obs.value}`)
            .join('\n');
        const header = 'Date,Price\n';
        const fullCsv = header + csvData;

        // Save CSV to file
        const filePath = path.join(__dirname, `${fileName}.csv`);
        fs.writeFileSync(filePath, fullCsv);
        console.log(`Data saved to ${fileName}.csv`);
    } catch (error) {
        console.error(`Error fetching ${fileName} observations:`, error.message);
    }
}

// Array of series IDs and corresponding filenames
// https://fred.stlouisfed.org/series/seriesID
const series = [
  { id: 'APU0000708111', name: 'egg' },      // Eggs
  { id: 'APU0000703112', name: 'beef' },    // Beef
  { id: 'APU0000709112', name: 'milk' },     // Milk
  { id: 'APU0000702111', name: 'bread' },    // Bread
  { id: 'APU0000717311', name: 'coffee' },   // Coffee
];

// Iterate over the array and call getPrices for each
series.forEach(item => {
    getPrices(item.id, item.name);
});

