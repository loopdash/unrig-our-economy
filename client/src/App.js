// client/src/App.js
import React, { useEffect, useState } from 'react';
import { getKrogerProducts, getProductScrapings  } from './services/api';

function App() {
    const [krogerProducts, setKrogerProducts] = useState([]);
    const [productScraping, setProductScrapings] = useState([]);

    // Fetch products
    useEffect(() => {
        fetchKrogerProducts();
        fetchProductScrapings();
    }, []);

    const fetchKrogerProducts = async () => {
        try {
            const response = await getKrogerProducts();
            setKrogerProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const fetchProductScrapings = async () => {
      try {
          const data = await getProductScrapings();
          setProductScrapings(data);
      } catch (error) {
          console.error('Failed to fetch products:', error);
      }
  };
    return (
        <div>
            <h1>Kroger Product List</h1>
            <ul>
                {productScraping.map(product => (
                    <li key={product.id}>
                        {product.product_name} - ${product.product_price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
