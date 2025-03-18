import React, { useEffect, useState } from "react";
import { getProductAverages } from "../services/api";
import ProductAveragesGraph from "../components/ProductAveragesGraph";
import HeaderCTA from "../components/HeaderCTA";
import DailyTicker from "../components/DailyTicker";
import FredDataGraph from "../components/FredDataGraph";

function Home() {
    const [productAverages, setProductAverages] = useState([]);

    // Fetch products
    useEffect(() => {
        fetchProductAverages();
    }, []);

    const fetchProductAverages = async () => {
        try {
            const data = await getProductAverages();
            console.log("Fetched Kroger Data:", data);
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
            <HeaderCTA  state={"California"} percentage={7.5}/>
            <DailyTicker />
            <FredDataGraph />
            <h2>Product Averages by State</h2>

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
