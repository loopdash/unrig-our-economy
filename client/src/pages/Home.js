import React, { useEffect, useState } from "react";
import { getProductAverages } from "../services/api";
import ProductAveragesGraph from "../components/ProductAveragesGraph";

function Home() {
    const [productAverages, setProductAverages] = useState([]);

    // Fetch products
    useEffect(() => {
        fetchProductAverages();
    }, []);

    const fetchProductAverages = async () => {
        try {
            const data = await getProductAverages();
            console.log("Fetched Data:", data);
            setProductAverages(data);
        } catch (error) {
            console.error("Failed to fetch product averages:", error);
        }
    };

    // ✅ Group by state
    const groupedByState = productAverages.reduce((acc, product) => {
        const { state, record_day, product_category, average_price } = product;

        if (!acc[state]) {
            acc[state] = [];
        }
        acc[state].push({
            record_day,
            product_category,
            average_price: parseFloat(average_price),
        });
        return acc;
    }, {});

    return (
        <div>
            <h2>Product Averages by State</h2>

            {/* Render Data Table */}
            <table border="1">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>State</th>
                        <th>Product Category</th>
                        <th>Average Price</th>
                    </tr>
                </thead>
                <tbody>
                    {productAverages.map((product, index) => (
                        <tr key={index}>
                            <td>{product.record_day}</td>
                            <td>{product.state}</td>
                            <td>{product.product_category}</td>
                            <td>${parseFloat(product.average_price).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ✅ Pass Data to Graph Component */}
            {Object.keys(groupedByState).map((state) => (
                <div key={state} style={{ marginBottom: "50px" }}>
                    <h3>{state}</h3>
                    <ProductAveragesGraph state={state} data={groupedByState[state]} />
                </div>
            ))}
        </div>
    );
}

export default Home;
