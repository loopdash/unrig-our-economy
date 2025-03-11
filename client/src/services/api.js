// client/src/services/api.js
import axios from 'axios';

// Set API base URL from environment variable or fallback to the Droplet's IP
// const API_URL = 'http://localhost:5001/';
let API_URL;
if (process.env.NODE_ENV === 'DEV') {
    API_URL =  'http://localhost:5001/'
} else {
    API_URL = process.env.REACT_APP_API_URL
}

console.log('API URL', API_URL)
// Get all Kroger products
export const getKrogerProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}api/kroger/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Kroger products:', error);
        throw error;
    }
};

// Get product scrapings
export const getProductScrapings = async () => {
    try {
        const response = await axios.get(`${API_URL}api/products/scrapes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product scraping:', error);
        throw error;
    }
};


// Get product Averages
export const getProductAverages = async () => {
    try {
        const response = await axios.get(`${API_URL}api/products/averages`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product averages:', error);
        throw error;
    }
};
// Get all error logs
export const getErrorLogs = async () => {
    try {
        const response = await axios.get(`${API_URL}api/errors`); // Adjust port if needed
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Failed to fetch error logs from front end:', error);
        throw error;
    }
};
