import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { getProductAverages } from "../services/api";

function HeaderCTA() {
    const [selectedState, setSelectedState] = useState("CA"); // Default to California
    const [statePrice, setStatePrice] = useState(null);
    const [percentageChange, setPercentageChange] = useState(0);
    const [direction, setDirection] = useState("down");
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
      const fetchPercentageChange = async () => {
        try {
            const data = await getProductAverages();
            // console.log("Fetched Product Data for Percentage Change:", data);
    
            // ✅ Get today's date and 30 days ago
            const today = new Date();
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(today.getDate() - 30); // ✅ Get date 30 days ago
    
            console.log("Today:", today.toISOString().split("T")[0]);
            console.log("30 Days Ago:", thirtyDaysAgo.toISOString().split("T")[0]);
    
            // ✅ Filter egg prices for the selected state
            const stateEggPrices = data
                .filter((item) => item.state === selectedState && item.product_category === "Egg 12ct")
                .sort((a, b) => new Date(b.record_day) - new Date(a.record_day)); // Sort by latest first
    
            if (stateEggPrices.length > 0) {
                const latestPrice = parseFloat(stateEggPrices[0].average_price); // Most recent price
    
                // ✅ Find the closest price to 30 days ago
                const closestTo30Days = stateEggPrices.find(
                    (item) => new Date(item.record_day) <= thirtyDaysAgo
                );
    
                if (closestTo30Days) {
                    const previousPrice = parseFloat(closestTo30Days.average_price);
                    const change = ((latestPrice - previousPrice) / previousPrice) * 100;
    
                    console.log("Latest Price:", latestPrice);
                    console.log("Price 30 Days Ago:", previousPrice);
                    console.log("Change:", change);
    
                    setStatePrice(latestPrice.toFixed(2));
                    setPercentageChange(Math.abs(change.toFixed(2)));
                    setDirection(change >= 0 ? "up" : "down");
                } else {
                    console.warn("No price data found for 30 days ago.");
                    setPercentageChange(0);
                }
            }
        } catch (error) {
            console.error(`Failed to fetch percentage change for ${selectedState}:`, error);
        }
    };
    

        fetchPercentageChange();
    }, [selectedState]); // ✅ Re-fetch when state changes

    return (
<div className="w-full h-auto gap-4 p-6 sm:p-10 md:p-16">
    <h1 className="font-barlow font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[75px] leading-tight tracking-normal">

                The price of 🥚 eggs in 
                <span className="ml-2 ">
                    <select
                        className="border p-2 rounded bg-white text-black border-dashed border-blue-400 mt-2"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                    >
                        <option value="CA">California</option>
                        <option value="TX">Texas</option>
                        <option value="VA">Virginia</option>
                    </select>
                </span> 
                has gone {direction} <span className="px-2 bg-[#E8EA58]"> {percentageChange}%</span> over the last month.
            </h1>

            <section className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
            <p className="text-[#4D5440]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, end of first sentence.</p>
                <a 
                    href="#" 
                    className="text-blue-500 underline cursor-pointer text-[#4D5440]"
                    onClick={(e) => {
                    e.preventDefault();
                    setModalOpen(true);
                    }}
                >
                    How did we arrive at this number?
                </a>
                </section>


            {/* ✅ Render the modal if open */}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}

export default HeaderCTA;
