import React, { useEffect, useState } from "react";
import { getProductAverages } from "../services/api";
import ProductAveragesGraph from "../components/ProductAveragesGraph";
import HeaderCTA from "../components/HeaderCTA";
import DailyTicker from "../components/DailyTicker";
import FredDataGraph from "../components/FredDataGraph";
import Button from "../components/Button";
import CTA from "../components/CTA";

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

            <section className="flex flex-col items-center justify-center mt-5 sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 p-6">

                <div
                    className="flex flex-col items-start justify-center rounded-[38px]  w-full sm:min-w-[40vw] bg-[#f6f8ff] rounded-xl shadow-lg p-4 space-y-3 min-h-[70vh]" 
                    style={{ backgroundColor: "#E8EA58", maxWidth: "400px" }}
                >
                    <h2 className="text-lg font-bold mb-2 text-[#4D5440] font-normal">Fact</h2>
                    <p className="mb-4 font-normal text-[30px] leading-[125%] tracking-[0] pb-4">
                       Grocery prices have been rising rapidly, nationwide.
                    </p>
                    {/* <button className="px-4 py-2 bg-black text-white rounded-[100px]">
                        Main Homepage CTA goes here
                    </button> */}
                    <Button href={"/search-by-state"} text={"See State-level grocery prices"} color={"black"} bgColor={"black"}/>

                </div>
                <FredDataGraph />
            </section>
            <CTA/>
        </div>
    );
}

export default Home;
