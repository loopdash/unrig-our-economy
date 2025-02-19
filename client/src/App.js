// client/src/App.js
import React, { useEffect, useState } from 'react';
import { getKrogerProducts  } from './services/api';

function App() {
    const [krogerProducts, setKrogerProducts] = useState([]);

    // Fetch products
    useEffect(() => {
        fetchKrogerProducts();
    }, []);

    const fetchKrogerProducts = async () => {
        try {
            const response = await getKrogerProducts();
            setKrogerProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

   
    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {krogerProducts.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
