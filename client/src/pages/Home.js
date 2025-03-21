import React, { useEffect, useState } from "react";
import { getProductAverages } from "../services/api";
import ProductAveragesGraph from "../components/ProductAveragesGraph";
import HeaderCTA from "../components/HeaderCTA";
import DailyTicker from "../components/DailyTicker";
import FredDataGraph from "../components/FredDataGraph";

function Home() {
    const [prices, setPrices] = useState({
        TX: null,
        CA: null,
        VA: null,
    });

    useEffect(() => {
        const fetchStatePrices = async () => {
            try {
                const data = await getProductAverages();
                // console.log("Fetched Product Data:", data);

                // ✅ Helper function to get latest price for a state
                const getLatestPrice = (stateCode) => {
                    const filteredPrices = data
                        .filter((item) => item.state === stateCode && item.product_category === "Egg 12ct")
                        .sort((a, b) => new Date(b.record_day) - new Date(a.record_day));

                    return filteredPrices.length > 0 ? parseFloat(filteredPrices[0].average_price).toFixed(2) : null;
                };

                setPrices({
                    TX: getLatestPrice("TX"),
                    CA: getLatestPrice("CA"),
                    VA: getLatestPrice("VA"),
                });
            } catch (error) {
                console.error("Failed to fetch egg prices:", error);
            }
        };

        fetchStatePrices();
    }, []);



    return (
        <div>
            {/* ✅ Dropdown for selecting a state */}
            <div className="flex justify-center mb-4">

            </div>

            {/* ✅ Pass selected state to HeaderCTA */}
            <HeaderCTA />

            <DailyTicker
                texasPrice={prices.TX}
                californiaPrice={prices.CA}
                virginiaPrice={prices.VA}
            />

            <section className="flex flex-row items-center justify-center space-x-6">
                <FredDataGraph />
                <div
                    className="flex flex-col items-start justify-center p-6 rounded-[38px]"
                    style={{ backgroundColor: "#5371FF1A", maxWidth: "400px" }}
                >
                    <h2 className="text-lg font-bold mb-2 text-[#4D5440] font-normal italic">Fact</h2>
                    <p className="mb-4">
                        Nationally, you can see the trends of grocery prices here, for every month since 1980! Thanks, FRED.
                    </p>
                    <button className="px-4 py-2 bg-black text-white rounded-[100px]">
                        Main Homepage CTA goes here
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Home;
