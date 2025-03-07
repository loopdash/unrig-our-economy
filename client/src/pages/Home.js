// client/src/Home.js
import React, { useEffect, useState } from 'react';
import { getProductAverages  } from '../services/api';

function Home() {
    // const [krogerProducts, setKrogerProducts] = useState([]);
    const [productAverages, setProductAverages] = useState([]);

    // Fetch products
    useEffect(() => {
        fetchProductAverages();
    }, []);

    const fetchProductAverages = async () => {
      try {
          const data = await getProductAverages();
          setProductAverages(data);
      } catch (error) {
          console.error('Failed to fetch products:', error);
      }
  };


    return (
        <div>
            <h1>Kroger Product Avg List</h1>
            <ul>
                {productAverages.map(product => (
                    <li key={product.id}>
                        {product.product_category} - ${product.avg_price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
