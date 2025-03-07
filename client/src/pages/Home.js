import React, { useEffect, useState } from 'react';
import { getProductAverages } from '../services/api';

function Home() {
    const [productAverages, setProductAverages] = useState([]);

    // Fetch products
    useEffect(() => {
        fetchProductAverages();
    }, []);

    const fetchProductAverages = async () => {
        try {
            const data = await getProductAverages();
            console.log(data);
            setProductAverages(data);
        } catch (error) {
            console.error('Failed to fetch product averages:', error);
        }
    };

    // Group by state and date
    const groupedByStateAndDate = productAverages.reduce((acc, product) => {
        const { record_day, state } = product;
        const key = `${record_day} - ${state}`; // Create a unique key for each day-state combo

        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(product);
        return acc;
    }, {});

    return (
        <div>
            <h2>Product Averages by Day</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>State</th>
                        <th>Category</th>
                        <th>Avg Price</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(groupedByStateAndDate).map((key, index) => (
                        groupedByStateAndDate[key].map((row, subIndex) => (
                            <tr key={`${index}-${subIndex}`}>
                                <td>{row.record_day}</td>
                                <td>{row.state}</td>
                                <td>{row.product_category}</td>
                                <td>${parseFloat(row.average_price).toFixed(2)}</td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
