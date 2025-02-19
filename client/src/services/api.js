// client/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/'; // Update with your actual IP


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

export const getProductScrapings = async () => {
    try {
        const response = await axios.get(`${API_URL}api/products/scrapes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product scraping:', error);
        throw error;
    }
};

