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


    // Group by state
    const groupedByState = productAverages.reduce((acc, product) => {
        if (!acc[product.state]) {
            acc[product.state] = [];
        }
        acc[product.state].push(product);
        return acc;
    }, {});

    return (
        <div>
            <h1>Kroger Product Avg List</h1>
            {Object.entries(groupedByState).map(([state, products]) => (
                <div key={state}>
                    <h2>{state}</h2>
                    <ul>
                        {products.map((product, index) => (
                            <li key={index}>
                                {product.product_category} - $
                                {Number(product.average_price).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};


export default Home;
