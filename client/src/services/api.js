// client/src/services/api.js
import axios from 'axios';

// Set API base URL from environment variable or fallback to the Droplet's IP
const API_URL = process.env.REACT_APP_API_URL || 'http://67.205.175.21:5001/';

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
